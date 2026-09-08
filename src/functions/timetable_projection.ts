import {
  Course,
  courseToEndIndex,
  courseToStartIndex,
  courseToTime,
} from "./general";

export const TIMELINE_START_MINUTE = 7 * 60;
export const TIMELINE_END_MINUTE = 22 * 60;
export const TIMELINE_HOUR_HEIGHT = 64;

export interface PeriodDefinition {
  code: string;
  startMinute: number;
  endMinute: number;
}

export interface TimetableSession {
  key: string;
  weekday: number;
  startMinute: number;
  endMinute: number;
  periodLabel: string;
  courseUuid: string;
  course: Course;
  overlapIndex: number;
  overlapCount: number;
}

const weekdayMap: Record<string, number> = {
  一: 1,
  二: 2,
  三: 3,
  四: 4,
  五: 5,
  六: 6,
};

function timeToMinute(time: string): number {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

export const PERIOD_DEFINITIONS: Record<string, PeriodDefinition> =
  {};

Object.entries(courseToTime).forEach(([code, time]) => {
  const startMinute = timeToMinute(time);
  const duration = /^\d+$/.test(code) ? 50 : 75;

  PERIOD_DEFINITIONS[code] = {
    code,
    startMinute,
    endMinute: startMinute + duration,
  };
});

function expandRange(start: string, end: string): string[] {
  const codes = Object.keys(PERIOD_DEFINITIONS);
  const startIndex = codes.indexOf(start);
  const endIndex = codes.indexOf(end);
  const sameSeries =
    (/^\d+$/.test(start) && /^\d+$/.test(end)) ||
    (/^[A-J]$/.test(start) && /^[A-J]$/.test(end));

  if (!sameSeries || startIndex < 0 || endIndex < startIndex) {
    return [start];
  }
  return codes.slice(startIndex, endIndex + 1);
}

function parseCodes(value: string): string[] {
  const normalized = value.trim().toUpperCase();
  if (!normalized) return [];

  const rangeParts = normalized
    .split(/[~-]/)
    .map((part) => part.trim());
  if (rangeParts.length === 2) {
    return expandRange(rangeParts[0], rangeParts[1]);
  }

  return normalized
    .split(",")
    .map((code) => code.trim())
    .filter((code) => Boolean(PERIOD_DEFINITIONS[code]));
}

function sessionsFromCourse(course: Course): TimetableSession[] {
  const rawTime = course.getStartTime() || "";
  const segments = [
    ...rawTime.matchAll(/([一二三四五六])([^\s一二三四五六]+)/g),
  ];
  const sessions: TimetableSession[] = [];

  for (const segment of segments) {
    const weekday = weekdayMap[segment[1]];
    const codes = parseCodes(segment[2]);
    const definitions = codes
      .map((code) => PERIOD_DEFINITIONS[code])
      .filter(Boolean)
      .sort((a, b) => a.startMinute - b.startMinute);

    let group: PeriodDefinition[] = [];
    const flush = () => {
      if (!group.length) return;
      const first = group[0];
      const last = group[group.length - 1];
      const periodLabel =
        group.length === 1
          ? first.code
          : `${first.code}–${last.code}`;
      sessions.push({
        key: `${course.getUuid()}-${weekday}-${first.startMinute}`,
        weekday,
        startMinute: first.startMinute,
        endMinute: last.endMinute,
        periodLabel,
        courseUuid: course.getUuid(),
        course,
        overlapIndex: 0,
        overlapCount: 1,
      });
      group = [];
    };

    for (const definition of definitions) {
      const previous = group[group.length - 1];
      if (
        previous &&
        definition.startMinute - previous.endMinute > 15
      ) {
        flush();
      }
      group.push(definition);
    }
    flush();
  }

  return sessions;
}

function inferFallbackPeriod(
  startIndex: number,
  endIndex: number,
  startTime: string,
) {
  const candidates = Object.values(PERIOD_DEFINITIONS).filter(
    (period) => courseToStartIndex[period.code] === startIndex,
  );
  const preferred =
    candidates.find(
      (period) => formatMinute(period.startMinute) === startTime,
    ) ?? candidates[0];

  if (!preferred) {
    return {
      startMinute: TIMELINE_START_MINUTE + startIndex * 30,
      endMinute: TIMELINE_START_MINUTE + endIndex * 30,
      periodLabel: "",
    };
  }

  const sameSeries = /^\d+$/.test(preferred.code)
    ? /^\d+$/
    : /^[A-J]$/;
  const matching = Object.values(PERIOD_DEFINITIONS)
    .filter(
      (period) =>
        sameSeries.test(period.code) &&
        courseToStartIndex[period.code] >= startIndex &&
        courseToEndIndex[period.code] <= endIndex,
    )
    .sort((a, b) => a.startMinute - b.startMinute);
  const last = matching[matching.length - 1] ?? preferred;

  return {
    startMinute: preferred.startMinute,
    endMinute: last.endMinute,
    periodLabel:
      matching.length > 1
        ? `${preferred.code}–${last.code}`
        : preferred.code,
  };
}

function sessionsFromMatrix(
  matrix: Course[][],
  knownKeys: Set<string>,
) {
  const sessions: TimetableSession[] = [];
  for (let weekday = 1; weekday <= 6; weekday++) {
    const column = weekday + 2;
    let row = 0;
    while (row < matrix.length) {
      const course = matrix[row]?.[column];
      if (!course?.getIsCourse()) {
        row++;
        continue;
      }

      const uuid = course.getUuid();
      const startIndex = row;
      while (
        row < matrix.length &&
        matrix[row]?.[column]?.getIsCourse() &&
        matrix[row][column].getUuid() === uuid
      ) {
        row++;
      }
      const endIndex = row;
      const inferred = inferFallbackPeriod(
        startIndex,
        endIndex,
        course.getStartTime(),
      );
      const key = `${uuid}-${weekday}-${inferred.startMinute}`;
      if (knownKeys.has(key)) continue;
      sessions.push({
        key,
        weekday,
        ...inferred,
        courseUuid: uuid,
        course,
        overlapIndex: 0,
        overlapCount: 1,
      });
    }
  }
  return sessions;
}

function assignOverlapColumns(sessions: TimetableSession[]) {
  for (let weekday = 1; weekday <= 6; weekday++) {
    const daySessions = sessions
      .filter((session) => session.weekday === weekday)
      .sort(
        (a, b) =>
          a.startMinute - b.startMinute || a.endMinute - b.endMinute,
      );
    let cluster: TimetableSession[] = [];
    let clusterEnd = -1;

    const flush = () => {
      if (!cluster.length) return;
      const laneEnds: number[] = [];
      for (const session of cluster) {
        let lane = laneEnds.findIndex(
          (end) => end <= session.startMinute,
        );
        if (lane < 0) lane = laneEnds.length;
        laneEnds[lane] = session.endMinute;
        session.overlapIndex = lane;
      }
      for (const session of cluster)
        session.overlapCount = laneEnds.length;
      cluster = [];
    };

    for (const session of daySessions) {
      if (cluster.length && session.startMinute >= clusterEnd)
        flush();
      cluster.push(session);
      clusterEnd = Math.max(clusterEnd, session.endMinute);
    }
    flush();
  }
}

export function projectTimetableSessions(
  courseList: Course[],
  matrix: Course[][],
): TimetableSession[] {
  const projected = courseList.flatMap(sessionsFromCourse);
  const knownKeys = new Set(projected.map((session) => session.key));
  projected.push(...sessionsFromMatrix(matrix, knownKeys));

  const visible = projected.filter(
    (session) =>
      session.weekday >= 1 &&
      session.weekday <= 6 &&
      session.endMinute > TIMELINE_START_MINUTE &&
      session.startMinute < TIMELINE_END_MINUTE,
  );
  assignOverlapColumns(visible);
  return visible;
}

export function minuteToTimelineOffset(minute: number): number {
  return (
    ((minute - TIMELINE_START_MINUTE) * TIMELINE_HOUR_HEIGHT) / 60
  );
}

export function formatMinute(minute: number): string {
  return `${String(Math.floor(minute / 60)).padStart(2, "0")}:${String(minute % 60).padStart(2, "0")}`;
}
