import axios from 'axios';

const apiSite = "http://localhost:3000/";

export async function searchCourse(Input: string) {
    
    const apiUrl = apiSite + "searchCourse";
    const keyword = Input.trim();

    
    return new Promise((resolve, reject) => {
        axios.get(apiUrl, {
            params: {
                keyword: keyword
            }
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