import axios from 'axios';
import {ref, watch } from 'vue';
//require dotenv
const env = import.meta.env;
const apiSite = `https://${env.VITE_BACKEND_DEVICE}/`;
export async function visitWeb(){
    const apiUrl = apiSite + "record/visistWebsite";
    return new Promise((resolve, reject) => {
        axios.get(apiUrl).then((response) => {
            resolve(response.data);
        }).catch((error) => {
            console.error(error);
            reject(error);
        });
    });
}
export async function getVisitCount() {
    const apiUrl = apiSite + "statistic/getVisitCount";
    return new Promise((resolve, reject) => {
        axios.get(apiUrl).then((response) => {
            
            resolve(Number(response.data.value));
        }).catch((error) => {
            console.error(error);
            reject(error);
        });
    });
}