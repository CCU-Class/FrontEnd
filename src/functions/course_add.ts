import store from "../store";
import {
  Course,
  courseToTime,
  courseToStartIndex,
  courseToEndIndex,
  WeekDayToInt,
} from "./general";
import { recordcourse } from "./course_search";
import { v4 as uuidv4 } from "uuid";
import { rowspanize } from "./rowspanizer";
import _ from "lodash";
import { toRaw } from "vue";
import { splittime } from "./tool";

const env = import.meta.env;

// a function that put the course in the database of manual input
// and return the status of the operation

export function classconflict(course: any) {
  let table: Course[][] = store.state.course.classStorage;
  let time = splittime(course.class_time);
  for (let i = 0; i < time.length; i++) {
    let weekDayIndex = WeekDayToInt[time[i][0]]; // 2 is the offset of the first two columns
    let startHour = courseToStartIndex[time[i][1]];
    let endHour = courseToEndIndex[time[i][2]];
    for (let i = startHour; i < endHour; i++) {
      if (table[i][weekDayIndex].getIsCourse()) {
        // there is a course in the same time slot
        return true;
      }
    }
  }
  return false;
}

function conflictMessage() {
  alert("新增課程失敗，請檢查是否衝堂");
}

// 自定義課程
function courseAdd(
  courseName: string,
  classRoom: string,
  weekDay: string,
  start: string,
  end: string,
) {
  // construct a course object here
  // push the course object to the local storage
  // store information in the database
  // return the status of the operation
  let table: Course[][] = _.cloneDeep(store.state.course.classStorage);
  let Uuid = uuidv4();
  let course = new Course({
    start_time: courseToTime[start],
    course_name: courseName,
    classroom: classRoom,
    is_title: false,
    is_course: true,
    color: env.VITE_CARD_DEFAULT_COLOR,
    ID: "此為自定義課程",
    Credit: 0,
    is_custom: true,
    Teacher: "此為自定義課程",
    Memo: null,
    textColor: env.VITE_CARDTEXT_DEFAULT_COLOR,
    textStyle: env.VITE_CARDTEXT_DEFAULT_STYLE,
    uuid: Uuid,
    length: 0,
    department: "此為自定義課程",
    grade: "此為自定義課程",
  });
  let weekDayIndex = WeekDayToInt[weekDay]; // 2 is the offset of the first two columns
  let startHour = courseToStartIndex[start];
  let endHour = courseToEndIndex[end];
  let startT = `${weekDay}${start}~${end}`;
  for (let i = startHour; i < endHour; i++) {
    if (table[i][weekDayIndex].getIsCourse()) {
      // there is a course in the same time slot
      return false;
    } else {
      // there is no course in the same time slot
      table[i][weekDayIndex] = _.cloneDeep(course);
    }
  }
  course.setStartTime(startT);
  store.dispatch("addCourseList", course);
  // 不要在這邊儲存localstorage，使用store
  // window.location.reload();
  rowspanize(table);
  return true;
}

function searchAdd(course_list: Course[]) {
  // construct a course object here
  // push the course object to the local storage
  // store information in the database
  // return the status of the operation
  // console.log(course_list);
  let table = _.cloneDeep(toRaw(store.state.course.classStorage));
  // put the list of courses into the table
  for (let i = 0; i < course_list.length; i++) {
    let course = course_list[i];
    // console.log(course);
    let weekDayIndex = WeekDayToInt[course.getWeekDay()]; // 2 is the offset of the first two columns
    let startHour = courseToStartIndex[course.getStartTime()];
    let endHour = courseToEndIndex[course.getEndTime()];
    // console.log(startHour, endHour);
    let startT = courseToTime[course.getStartTime()];
    for (let j = startHour; j < endHour; j++) {
      // console.log(table[j][weekDayIndex]);
      if (table[j][weekDayIndex].getIsCourse()) {
        // there is a course in the same time slot
        return false;
      } else {
        table[j][weekDayIndex] = _.cloneDeep(course);
        table[j][weekDayIndex].setStartTime(startT);
      }
    }
  }
  // 不要在這邊儲存localstorage，使用storec
  rowspanize(table);
  return true;
}

export function push_to_table(mode: Number, item: any) {
  if (mode == 1) {
    console.log(item);
    if (
      item.className == "" ||
      item.classRoom == "" ||
      item.weekDay == "星期" ||
      item.start == "始堂" ||
      item.end == "終堂"
    ) {
      alert("錯誤");
      return false;
    }
    let check = courseAdd(
      item.className,
      item.classRoom,
      item.weekDay,
      item.start,
      item.end,
    );
    if (!check) {
      conflictMessage();
      return false;
    }
  } else if (mode == 2) {
    recordcourse(item);
    let time = splittime(item.class_time);
    let data = [];
    let Uuid = uuidv4();
    for (let i = 0; i < time.length; i++) {
      data.push(
        new Course({
          start_time: time[i][1],
          end_time: time[i][2],
          week_day: time[i][0],
          course_name: item.class_name,
          classroom: item.class_room,
          is_title: false,
          is_course: true,
          color: env.VITE_CARD_DEFAULT_COLOR,
          Credit: item.credit,
          ID: item.id,
          is_custom: false,
          Teacher: item.teacher,
          Memo: null,
          textColor: env.VITE_CARDTEXT_DEFAULT_COLOR,
          textStyle: env.VITE_CARDTEXT_DEFAULT_STYLE,
          uuid: Uuid,
          length: 0,
          department: item.department,
          grade: item.grade,
        }),
      );
    }
    // 成功插入會回傳課程陣列，反之回傳false
    // 在做儲存
    let check = searchAdd(data);
    if (!check) {
      conflictMessage();
      return false;
    }
    store.dispatch(
      "addCourseList",
      new Course({
        start_time: item.class_time,
        end_time: item.class_time,
        week_day: item.class_time,
        course_name: item.class_name,
        classroom: item.class_room,
        is_title: false,
        is_course: true,
        color: env.VITE_CARD_DEFAAULT_COLOR,
        Credit: item.credit,
        ID: item.id,
        is_custom: false,
        Teacher: item.teacher,
        Memo: null,
        textColor: env.VITE_CARDTEXT_DEFAULT_COLOR,
        textStyle: env.VITE_CARDTEXT_DEFAULT_STYLE,
        uuid: Uuid,
        length: 0,
        department: item.department,
        grade: item.grade,
      }),
    );
    store.dispatch("addCredit", Number(item.credit));
  }
  return true;
}
