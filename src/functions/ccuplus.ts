import axios from "axios";
import store from "../store";

const env = import.meta.env;
const apiSite = `${env.VITE_CCUPLUS_DEVICE}`;

export async function show_comment(course_id: string) {
  window.scrollTo(0, 0);
  store.dispatch("pass_course_id", course_id);
  store.dispatch("display");
}

export async function searchCourseOnCcuplus(course_id: string) {
  const apiUrl = apiSite + course_id;
  console.log(apiUrl);
  return new Promise((resolve, reject) => {
    axios
      .get(apiUrl)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}

export async function searchCommentsOnCcuplus(course_id: string) {
  const apiUrl = apiSite + course_id + "/comments";
  return new Promise((resolve) => {
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(typeof response.data);
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error);
        resolve(false);
      });
  });
}
