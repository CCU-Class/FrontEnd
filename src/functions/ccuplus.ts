import axios from "axios";
const env = import.meta.env;
const apiSite = `https://${env.VITE_CCUPLUS_DEVICE}`;

export async function searchCourseOnCcuplus(course_id: string) {
    const apiUrl = apiSite + course_id;
    console.log(apiUrl)
    return new Promise((resolve, reject) => {
        axios.get(apiUrl)
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
    return new Promise((resolve, reject) => {
        axios.get(apiUrl)
        .then((response) => {
            console.log(typeof response.data);
            resolve(response.data);
        })
        .catch((error) => {
            // console.error(error);
            resolve(false);
        });
    });
}