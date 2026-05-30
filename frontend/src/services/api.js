import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://careerconnect-potal-production.up.railway.app/api";

const API = axios.create({
  baseURL: API_BASE_URL,
});

API.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;