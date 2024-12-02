import axios from "axios";

const canvasApi = axios.create({
  baseURL: "http://localhost:3000",
  validateStatus: function (status) {
    return status < 500;
  },
  headers: {
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  },
});

canvasApi.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  (error) => {

    console.error("Response Error:", error);
    return Promise.reject(error);
  }
);


export default canvasApi;
