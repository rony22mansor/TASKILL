import axios from "axios";

const baseURL = "http://localhost:8000/api/v1/";
const lang = localStorage.getItem('i18nextLng')


const privateAxios = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Access-Control-Allow-Origin": "*",
    "Accept-Language" : lang
  },
});

const Axios = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Access-Control-Allow-Origin": "*",
    "Accept-Language" : lang

  },
});

// Add a request interceptor to privateAxios
privateAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      // Set authorization header if token exists
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { privateAxios, Axios };
