import axios from "axios";
import Cookies from "js-cookie";

export const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api/",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});
export const fetchClient = "http://localhost:8080/api/";

// Interceptor cho request
axiosClient.interceptors.request.use(
  async (config) => {
    const sessionToken = await Cookies.get("authToken");
    if (sessionToken) {
      config.headers.Authorization = `Bearer ${sessionToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor cho response

export default axiosClient;
