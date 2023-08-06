import axios from 'axios';

const apiSite = "http://137.184.18.28:3000/";

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