import axios from 'axios';

const apiSite = "http://localhost:3000/";

export async function searchCourse(Input: string) {
    
    const apiUrl = apiSite + "searchCourse";
    const keyword = Input.trim();

    
    await axios.get(apiUrl, {
      params: {
        keyword: keyword
      }
    })
    .then((response) => {
      // Handle the response data here
      return response.data;
    })
    .catch((error) => {
      // Handle errors here
      console.error(error);
    });
}