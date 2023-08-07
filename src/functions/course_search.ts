import axios from 'axios';

//require dotenv
const env = import.meta.env;


const apiSite = `http://${env.VITE_BACKEND_DEVICE}:${env.VITE_BACKEND_DEVICE_PORT}/`;


export async function searchCourse(Input: string) {
    
    const apiUrl = apiSite + "searchCourse";
    //console.log(apiUrl);
    const keyword = Input.trim();

    
    return new Promise((resolve, reject) => {
        const startTime = performance.now();
        axios.get(apiUrl, {
            params: {
                keyword: keyword
            }
        })
        .then((response) => {
            // 在這裡處理回應資料
            // console.log(response.data)
            const endTime = performance.now();
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
        const startTime = performance.now();
        axios.get(apiUrl, {
            params: {
                keyword: course
            }
        })
        .then((response) => {
            // 在這裡處理回應資料
            // console.log(response.data)
            const endTime = performance.now();
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

