import axios from 'axios';

//require dotenv
const env = import.meta.env;


const apiSite = `http://${env.VITE_BACKEND_DEVICE}:${env.VITE_BACKEND_DEVICE_PORT}/`;


export async function searchCourse(Input: string) {
    
    const apiUrl = apiSite + "searchCourse";
    //console.log(apiUrl);
    const keyword = Input.trim();

    
    return new Promise((resolve, reject) => {
        axios.get(apiUrl, {
            params: {
                keyword: keyword
            }
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