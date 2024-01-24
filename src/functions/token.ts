import axios from "axios";
const env = import.meta.env;
const apiSite = `${env.VITE_BACKEND_DEVICE}/`;

const Token = {
  saveToken(token: string) {
    localStorage.setItem("token", token);
  },
  loadToken() {
    return localStorage.getItem("token");
  },
  async varifyToken(token: string | null) {
    if (token === null) return false;
    const apiUrl = apiSite + "verifyToken";
    return new Promise((resolve, reject) => {
      axios
        .post(apiUrl, { token })
        .then((response) => {
          resolve(response.data.status);
        })
        .catch((error) => {
          console.error(error);
          reject(false);
        });
    });
  },
};

export default Token;
