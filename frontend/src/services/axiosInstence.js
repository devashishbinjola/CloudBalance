import axios from "axios";
import { store } from "../redux/store";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // .env se URL
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      localStorage.removeItem("token");
      store.dispatch({ type: "LOGOUT" });
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
)
export default API;
