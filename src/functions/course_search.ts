import axios from "axios";

//require dotenv
const env = import.meta.env;

const apiSite = `${env.VITE_BACKEND_DEVICE}/`;

export async function searchCourse(Input: string) {
  const apiUrl = apiSite + "searchCourse";
  const keyword = Input.trim();
  // const delay = (n:number) => new Promise( r => setTimeout(r, n*1000));
  //await delay(1);

  return new Promise((resolve, reject) => {
    // const startTime = performance.now();
    axios
      .get(apiUrl, {
        params: {
          keyword: keyword,
        },
      })
      .then((response) => {
        // 在這裡處理回應資料
        // console.log(response.data)
        // const endTime = performance.now();
        // console.log('查詢課程請求到回應時間:', endTime - startTime, '毫秒');
        // 計算http request 時間
        // console.log('查詢課程請求到回應時間:', endTime - startTime, '毫秒');
        resolve(response.data);
      })
      .catch((error) => {
        // 在這裡處理錯誤
        console.error(error);
        reject(error);
      });
  });
}

export async function recordcourse(course: object) {
  const apiUrl = apiSite + "record/userSelectClass";
  //console.log(apiUrl)

  return new Promise((resolve, reject) => {
    axios
      .get(apiUrl, {
        params: {
          keyword: course,
        },
      })
      .then((response) => {
        // 在這裡處理回應資料
        resolve(response.data);
      })
      .catch((error) => {
        // 在這裡處理錯誤
        console.error(error);
        reject(error);
      });
  });
}

export async function searchByTeacher(Input: string) {
  const apiUrl = apiSite + "searchCourse/ByTeacher";
  const keyword = Input.trim();
  // const delay = (n:number) => new Promise( r => setTimeout(r, n*1000));
  //await delay(1);

  return new Promise((resolve, reject) => {
    const startTime = performance.now();
    axios
      .get(apiUrl, {
        params: {
          Teacher: keyword,
        },
      })
      .then((response) => {
        // 在這裡處理回應資料
        // console.log(response.data)
        const endTime = performance.now();
        console.log(
          "查詢課程請求到回應時間:",
          endTime - startTime,
          "毫秒",
        );
        // 計算http request 時間
        // console.log('查詢課程請求到回應時間:', endTime - startTime, '毫秒');
        resolve(response.data);
      })
      .catch((error) => {
        // 在這裡處理錯誤
        console.error(error);
        reject(error);
      });
  });
}

export async function searchCourseByTime(
  day: number,
  start: number,
  end: number,
) {
  const apiUrl = apiSite + "searchCourse/ByTime";

  return new Promise((resolve, reject) => {
    axios
      .get(apiUrl, {
        params: {
          day: day,
          start: start,
          end: end,
        },
      })
      .then((response) => {
        // 在這裡處理回應資料
        // console.log(response.data)
        resolve(response.data);
      })
      .catch((error) => {
        // 在這裡處理錯誤
        console.error(error);
        reject(error);
      });
  });
}

export async function getDepartment() {
  const apiUrl = apiSite + "searchCourse/getDepartment";

  return new Promise((resolve, reject) => {
    axios
      .get(apiUrl, {})
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        // 在這裡處理錯誤
        console.error(error);
        reject(error);
      });
  });
}

export async function getGradeByDepartment(Department: string) {
  const apiUrl = apiSite + "searchCourse/GetGardeByDepartment";

  return new Promise((resolve, reject) => {
    axios
      .get(apiUrl, {
        params: {
          Department: Department,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        // 在這裡處理錯誤
        console.error(error);
        reject(error);
      });
  });
}

export async function getCourseByDepartment(Department: string) {
  const apiUrl = apiSite + "searchCourse/ByDepartment";

  return new Promise((resolve, reject) => {
    axios
      .get(apiUrl, {
        params: {
          Department: Department,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        // 在這裡處理錯誤
        console.error(error);
        reject(error);
      });
  });
}

export async function searchDepartmentByOther(
  id: number,
  class_name: string,
  teacher: string,
  class_room: string,
  credit: number,
) {
  const apiUrl = apiSite + "searchCourse/searchDepartmentByOther";

  return new Promise((resolve, reject) => {
    axios
      .get(apiUrl, {
        params: {
          id: id,
          class_name: class_name,
          teacher: teacher,
          class_room: class_room,
          credit: credit,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        // 在這裡處理錯誤
        console.error(error);
        reject(error);
      });
  });
}

export async function searchGradeByOther(
  id: number,
  class_name: string,
  teacher: string,
  class_room: string,
  credit: number,
) {
  const apiUrl = apiSite + "searchCourse/searchGradeByOther";

  return new Promise((resolve, reject) => {
    axios
      .get(apiUrl, {
        params: {
          id: id,
          class_name: class_name,
          teacher: teacher,
          class_room: class_room,
          credit: credit,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        // 在這裡處理錯誤
        console.error(error);
        reject(error);
      });
  });
}
