import { Course } from "./general.ts";
import store from "../store";

export function courseChangeColor(course: Course, color: string) {
  store.dispatch("updateCourseAppearance", {
    uuid: course.getUuid(),
    color,
  });
}

export function courseTextChangeColor(course: Course, color: string) {
  store.dispatch("updateCourseAppearance", {
    uuid: course.getUuid(),
    textColor: color,
  });
}
