import axios from 'axios';

//require dotenv
const env = import.meta.env;
const apiSite = `${env.VITE_BACKEND_DEVICE}/`;
export async function visitWeb(web_name:string|null){
    const apiUrl = apiSite + "record/visistWebsite";
    console.log(web_name)
    return new Promise((resolve, reject) => {
        axios.get(apiUrl, {
            params: {
                web_name: web_name
            }
        }).then((response) => {
            resolve(response.data);
        }).catch((error) => {
            console.error(error);
            reject(error);
        });
    });
}
export async function getVisitCount(web_name:string|null) {
    const apiUrl = apiSite + "statistic/getVisitCount";
    return new Promise((resolve, reject) => {
        axios.get(apiUrl, {
            params: {
                web_name: web_name
            }
        }).then((response) => {
            
            resolve(Number(response.data.value));
        }).catch((error) => {
            console.error(error);
            reject(error);
        });
    });
}