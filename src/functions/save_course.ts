import axios from "axios";

const env = import.meta.env;
const apiSite = `${env.VITE_BACKEND_DEVICE}/`;

export async function recordsharecourse(data: any) {
  const apiUrl = apiSite + "record/saveCourseRecord";
  const json_data = JSON.stringify(data);
  return new Promise((resolve, reject) => {
    axios
      .post(apiUrl, { json_data })
      .then((response) => {
        // 在這裡處理回應資料
        let link =
          apiSite +
          "record/redirectCourseRecord?record_id=" +
          response.data;
        resolve(link);
      })
      .catch((error) => {
        // 在這裡處理錯誤
        console.error(error);
        reject(error);
      });
  });
}

export async function getsharecourse(record_id: string) {
  const apiUrl = apiSite + "record/getCourseRecord";
  //console.log(apiUrl)
  // console.log(data)
  return new Promise((resolve, reject) => {
    axios
      .get(apiUrl, {
        params: {
          record_id: record_id,
        },
      })
      .then((response) => {
        // 在這裡處理回應資料
        let link = response.data;
        // console.log(link)
        resolve(link);
      })
      .catch((error) => {
        // 在這裡處理錯誤
        console.error(error);
        reject(error);
      });
  });
}
