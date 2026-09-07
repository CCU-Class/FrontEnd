<template>
  <section class="w-full max-w-full select-none">
    <div
      v-if="canSelectTime"
      class="sticky top-0 z-30 mx-auto mb-2 flex w-full min-w-0 flex-wrap items-center justify-between gap-2 rounded-lg bg-purple-50 px-3 py-2 shadow-md md:w-[calc(100%-2rem)] md:max-w-[960px]">
      <div>
        <p class="font-semibold text-purple-900">
          拖曳選取要搜尋的時段
        </p>
        <p class="text-xs text-purple-700">
          {{ selectedRangeLabel || "請在同一天內選取連續時段" }}
        </p>
      </div>
      <div class="flex gap-2">
        <button
          type="button"
          class="rounded-lg bg-white px-3 py-1 text-sm text-gray-700 shadow disabled:opacity-40"
          :disabled="!hasSelection"
          @click="clearTimeSelection">
          清除
        </button>
        <button
          type="button"
          class="rounded-lg bg-purple-600 px-3 py-1 text-sm text-white shadow disabled:cursor-not-allowed disabled:opacity-40"
          :disabled="!hasSelection"
          @click="submitTimeSelection">
          搜尋此時段
        </button>
      </div>
    </div>

    <div
      id="WholeTable"
      class="mx-auto my-3 w-full min-w-0 overflow-hidden rounded-lg bg-orange-50 px-1 py-2 md:w-[calc(100%-2rem)] md:max-w-[960px] md:px-2">
      <p class="px-2 pb-2 text-right text-sm" v-show="showCredit">
        目前學分：{{ activeCourseData?.credit ?? 0 }}
      </p>

      <div class="timeline-header" aria-hidden="true">
        <div class="timeline-corner">時間</div>
        <div
          v-for="day in weekdays"
          :key="day.value"
          class="timeline-day-heading">
          <span class="hidden sm:inline">星期</span>{{ day.label }}
        </div>
      </div>

      <div class="timeline-body">
        <aside class="timeline-axis" aria-label="時間軸">
          <span
            v-for="hour in timelineHours"
            :key="hour"
            class="timeline-hour-label"
            :class="{ 'timeline-hour-label--last': hour === 22 }"
            :style="{ top: `${hourOffset(hour)}px` }">
            {{ String(hour).padStart(2, "0") }}:00
          </span>

          <div
            v-if="canSelectTime && hasSelection"
            class="timeline-selection-guide"
            :style="selectionGuideStyle"></div>
        </aside>

        <div
          ref="timelineDays"
          class="timeline-days"
          :class="{ 'timeline-days--selecting': canSelectTime }"
          @pointerdown="startTimeSelection"
          @pointermove="moveTimeSelection"
          @pointerup="finishTimeSelection"
          @pointercancel="finishTimeSelection">
          <div
            v-for="day in weekdays"
            :key="day.value"
            class="timeline-day-lane">
            <button
              v-for="session in sessionsByDay[day.value]"
              :key="session.key"
              type="button"
              class="timeline-course-card"
              :class="{
                'timeline-course-card--conflict':
                  session.overlapCount > 1,
              }"
              :style="sessionStyle(session)"
              :aria-label="courseAriaLabel(session)"
              @click.stop="openCourseDetails(session)">
              <span
                class="timeline-course-content"
                :class="{
                  'timeline-course-content--compact':
                    isCompactSession(session),
                }">
                <span class="timeline-course-time-range">
                  <span class="timeline-course-time-start">
                    {{ formatMinute(session.startMinute) }} –
                  </span>
                  <span class="timeline-course-time-end">
                    {{ formatMinute(session.endMinute) }}
                  </span>
                </span>
                <span class="timeline-course-name">
                  {{ session.course.getCourseName() }}
                </span>
                <span class="timeline-course-room">
                  {{ session.course.getClassroom() }}
                </span>
              </span>
            </button>
          </div>

          <div
            v-if="canSelectTime"
            class="timeline-selection-layer"
            aria-label="選取課程搜尋時間">
            <div
              v-if="hasSelection"
              class="timeline-selection-highlight"
              :style="selectionStyle"></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <Teleport to="body">
    <div
      v-if="selectedSession"
      class="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-3 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="course-detail-title"
      @click.self="closeCourseDetails">
      <div
        class="max-h-[85dvh] w-full max-w-md overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <header
          class="flex items-start justify-between border-b border-orange-100 px-5 py-4">
          <div>
            <p class="text-sm font-semibold text-orange-600">
              {{ selectedSession.periodLabel }} · 星期{{
                weekdays[selectedSession.weekday - 1].label
              }}
            </p>
            <h2
              id="course-detail-title"
              class="mt-1 text-xl font-bold text-gray-900">
              {{ selectedCourse.getCourseName() }}
            </h2>
          </div>
          <button
            type="button"
            class="rounded-full px-3 py-1 text-xl text-gray-500 hover:bg-gray-100"
            aria-label="關閉課程資訊"
            @click="closeCourseDetails">
            ×
          </button>
        </header>

        <dl
          class="grid grid-cols-[5rem_1fr] gap-x-3 gap-y-2 px-5 py-4 text-sm">
          <dt class="text-gray-500">課程時間</dt>
          <dd>{{ selectedTimeLabel }}</dd>
          <dt class="text-gray-500">教室</dt>
          <dd>{{ selectedCourse.getClassroom() || "未提供" }}</dd>
          <dt class="text-gray-500">教師</dt>
          <dd>{{ selectedCourse.getTeacher() || "未提供" }}</dd>
          <dt class="text-gray-500">學分</dt>
          <dd>{{ selectedCourse.getCredit() ?? "未提供" }}</dd>
          <dt class="text-gray-500">系所</dt>
          <dd>{{ selectedCourse.getDepartment() || "未提供" }}</dd>
          <dt class="text-gray-500">年級</dt>
          <dd>{{ selectedCourse.getGrade() || "未提供" }}</dd>
        </dl>

        <footer
          class="grid grid-cols-2 gap-2 border-t border-gray-100 bg-gray-50 p-4 sm:grid-cols-4">
          <button
            type="button"
            class="timeline-detail-action"
            @click="editCourseColor(1)">
            修改顏色
          </button>
          <button
            type="button"
            class="timeline-detail-action"
            @click="editCourseColor(2)">
            文字樣式
          </button>
          <button
            type="button"
            class="timeline-detail-action"
            @click="openCourseComment">
            查看評價
          </button>
          <button
            type="button"
            class="timeline-detail-action text-red-700 hover:bg-red-50"
            @click="deleteSelectedCourse">
            刪除課程
          </button>
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import {
  computed,
  nextTick,
  onUnmounted,
  reactive,
  ref,
  watch,
} from "vue";
import { useStore } from "vuex";
import {
  TIMELINE_END_MINUTE,
  TIMELINE_HOUR_HEIGHT,
  TIMELINE_START_MINUTE,
  formatMinute,
  minuteToTimelineOffset,
  projectTimetableSessions,
} from "@functions/timetable_projection";
import {
  courseDelete,
  decreaseCredit,
} from "@functions/course_delete.ts";
import { show_comment } from "@functions/ccuplus";

const store = useStore();
store.dispatch("initAll");

const env = import.meta.env;
const defaultCourseColor =
  env.VITE_CARD_DEFAULT_COLOR || "rgb(192 215 193 / 1)";
const defaultCourseTextColor =
  env.VITE_CARDTEXT_DEFAULT_COLOR || "rgb(0 0 0 / 1)";

const weekdays = [
  { value: 1, label: "一" },
  { value: 2, label: "二" },
  { value: 3, label: "三" },
  { value: 4, label: "四" },
  { value: 5, label: "五" },
  { value: 6, label: "六" },
];
const timelineHours = Array.from(
  { length: 16 },
  (_, index) => index + 7,
);

const activeIndex = computed(() => store.state.course.activeIndex);
const activeCourseData = computed(
  () => store.state.course.TotalCourseData[activeIndex.value],
);
const showCredit = computed(() => store.state.course.show_credit);
const TimeMode = computed(() => store.state.course.timeSearchMode);
const isTimeSearchOpen = computed(
  () => store.state.course.searchTime_status,
);
const canSelectTime = computed(
  () => TimeMode.value && !isTimeSearchOpen.value,
);
const sessions = computed(() => {
  const data = activeCourseData.value;
  if (!data) return [];
  return projectTimetableSessions(
    data.classListStorage,
    data.classStorage,
  );
});
const sessionsByDay = computed(() => {
  const result = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
  for (const session of sessions.value)
    result[session.weekday].push(session);
  return result;
});

const timelineDays = ref(null);
const selectedSession = ref(null);
let previousBodyOverflow = "";
const selectedCourse = computed(() => selectedSession.value?.course);
const selectedTimeLabel = computed(() => {
  if (!selectedSession.value) return "";
  return `${formatMinute(selectedSession.value.startMinute)}–${formatMinute(selectedSession.value.endMinute)}`;
});

const timeSelection = reactive({
  weekday: 0,
  startIndex: -1,
  endIndex: -1,
  dragging: false,
});
const hasSelection = computed(
  () => timeSelection.weekday > 0 && timeSelection.startIndex >= 0,
);
const selectedRangeLabel = computed(() => {
  if (!hasSelection.value) return "";
  const start = Math.min(
    timeSelection.startIndex,
    timeSelection.endIndex,
  );
  const end =
    Math.max(timeSelection.startIndex, timeSelection.endIndex) + 1;
  return `星期${weekdays[timeSelection.weekday - 1].label} ${formatMinute(TIMELINE_START_MINUTE + start * 30)}–${formatMinute(TIMELINE_START_MINUTE + end * 30)}`;
});
const selectionStyle = computed(() => {
  const start = Math.min(
    timeSelection.startIndex,
    timeSelection.endIndex,
  );
  const end = Math.max(
    timeSelection.startIndex,
    timeSelection.endIndex,
  );
  return {
    left: `${((timeSelection.weekday - 1) / 6) * 100}%`,
    width: `${100 / 6}%`,
    top: `${start * (TIMELINE_HOUR_HEIGHT / 2)}px`,
    height: `${(end - start + 1) * (TIMELINE_HOUR_HEIGHT / 2)}px`,
  };
});

// 用於左側輔助顯示條
const selectionGuideStyle = computed(() => {
  const start = Math.min(
    timeSelection.startIndex,
    timeSelection.endIndex,
  );

  const end = Math.max(
    timeSelection.startIndex,
    timeSelection.endIndex,
  );

  return {
    top: `${start * (TIMELINE_HOUR_HEIGHT / 2)}px`,
    height: `${(end - start + 1) * (TIMELINE_HOUR_HEIGHT / 2)}px`,
  };
});

function hourOffset(hour) {
  return minuteToTimelineOffset(hour * 60);
}

function isCompactSession(session) {
  return session.endMinute - session.startMinute < 90;
}

function sessionStyle(session) {
  const top = minuteToTimelineOffset(
    Math.max(session.startMinute, TIMELINE_START_MINUTE),
  );
  const bottom = minuteToTimelineOffset(
    Math.min(session.endMinute, TIMELINE_END_MINUTE),
  );
  return {
    top: `${top}px`,
    height: `${Math.max(bottom - top, 28)}px`,
    left: `${(session.overlapIndex / session.overlapCount) * 100}%`,
    width: `${100 / session.overlapCount}%`,
    backgroundColor: session.course.getColor() || defaultCourseColor,
    color: session.course.getTextColor() || defaultCourseTextColor,
  };
}

function courseAriaLabel(session) {
  return `${session.course.getCourseName()}，星期${weekdays[session.weekday - 1].label}，${formatMinute(session.startMinute)}到${formatMinute(session.endMinute)}，${session.course.getClassroom()}`;
}

function openCourseDetails(session) {
  if (TimeMode.value) return;
  selectedSession.value = session;
}

function closeCourseDetails() {
  selectedSession.value = null;
}

function restoreBodyOverflow() {
  document.body.style.overflow = previousBodyOverflow;
}

async function editCourseColor(mode) {
  const course = selectedCourse.value;
  if (!course) return;
  closeCourseDetails();
  await nextTick();
  store.dispatch(
    "setDefaultColor",
    mode === 1 ? course.getColor() : course.getTextColor(),
  );
  store.dispatch("setCardMode", mode);
  store.dispatch("setChooseCard", course);
  store.dispatch("changeShowColorPick", true);
}

function openCourseComment() {
  const course = selectedCourse.value;
  if (!course) return;
  show_comment(course.getId());
  closeCourseDetails();
}

async function deleteSelectedCourse() {
  const course = selectedCourse.value;
  if (!course) return;
  if (course.getCredit() != null) decreaseCredit(course.getCredit());
  await courseDelete(course);
  await store.dispatch("setrunConflictState", 1);
  await store.dispatch("setrunConflictState", 2);
  closeCourseDetails();
}

function pointerToSelection(event) {
  const element = timelineDays.value;
  if (!element) return null;
  const rect = element.getBoundingClientRect();
  const weekday = Math.min(
    6,
    Math.max(
      1,
      Math.floor(((event.clientX - rect.left) / rect.width) * 6) + 1,
    ),
  );
  const slot = Math.min(
    29,
    Math.max(
      0,
      Math.floor(((event.clientY - rect.top) / rect.height) * 30),
    ),
  );
  return { weekday, slot };
}

function startTimeSelection(event) {
  if (!canSelectTime.value) return;
  event.preventDefault();
  const point = pointerToSelection(event);
  if (!point) return;
  event.currentTarget.setPointerCapture?.(event.pointerId);
  timeSelection.weekday = point.weekday;
  timeSelection.startIndex = point.slot;
  timeSelection.endIndex = point.slot;
  timeSelection.dragging = true;
}

function moveTimeSelection(event) {
  if (!canSelectTime.value || !timeSelection.dragging) return;
  event.preventDefault();
  const point = pointerToSelection(event);
  if (point) timeSelection.endIndex = point.slot;
}

function finishTimeSelection(event) {
  if (!timeSelection.dragging) return;
  event.preventDefault();
  timeSelection.dragging = false;
  event.currentTarget.releasePointerCapture?.(event.pointerId);
}

function clearTimeSelection() {
  timeSelection.weekday = 0;
  timeSelection.startIndex = -1;
  timeSelection.endIndex = -1;
  timeSelection.dragging = false;
}

function submitTimeSelection() {
  if (!hasSelection.value) return;
  const start = Math.min(
    timeSelection.startIndex,
    timeSelection.endIndex,
  );
  const end = Math.max(
    timeSelection.startIndex,
    timeSelection.endIndex,
  );
  store.dispatch("settimeSearchArgument", [
    timeSelection.weekday,
    start,
    end,
  ]);
  store.dispatch("setSearchTimeTable", true);
}

watch(TimeMode, (enabled) => {
  if (!enabled) clearTimeSelection();
});

watch(isTimeSearchOpen, (open) => {
  if (open) clearTimeSelection();
});

watch(selectedSession, (session, previousSession) => {
  if (session && !previousSession) {
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  } else if (!session && previousSession) {
    restoreBodyOverflow();
  }
});

onUnmounted(() => {
  if (selectedSession.value) restoreBodyOverflow();
});
</script>
