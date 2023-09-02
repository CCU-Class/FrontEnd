import axios from "axios";
const env = import.meta.env;
const apiSite = `https://${env.VITE_CCUPLUS_DEVICE}/`;


export async function searchCourseOnCcuplus(course_id: string) {
  const apiUrl = apiSite + course_id;
  
  return new Promise((resolve, reject) => {
      axios.get(apiUrl, {
      })
      .then((response) => {
          resolve(response.data);
      })
      .catch((error) => {
          console.error(error);
          reject(error);
      });
  });
}