import { Course } from "./general.ts";
import store from "../store";
import _ from "lodash";

export function courseChangeColor(course: Course, color: string) {
  let temp = _.cloneDeep(store.state.course.classStorage);
  for (let i = 0; i < temp.length; i++) {
    for (let j = 0; j < temp[i].length; j++) {
      if (course.getUuid() == temp[i][j].getUuid()) {
        temp[i][j].setColor(color);
      }
    }
  }
  store.dispatch("addCourse", temp);
}

export function courseTextChangeColor(course: Course, color: string) {
  let temp = _.cloneDeep(store.state.course.classStorage);
  for (let i = 0; i < temp.length; i++) {
    for (let j = 0; j < temp[i].length; j++) {
      if (course.getUuid() == temp[i][j].getUuid()) {
        temp[i][j].setTextColor(color);
      }
    }
  }
  store.dispatch("addCourse", temp);
}
