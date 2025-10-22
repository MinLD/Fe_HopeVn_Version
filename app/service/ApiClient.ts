import axios from "axios";

export const baseUrl = "http://localhost:8080/api";
export const FeUrl = "http://localhost:3000";
export const WEBSOCKET_URL = "http://localhost:8080/ws";
export const axiosClient = axios.create({
  baseURL: baseUrl,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor cho request
// axiosClient.interceptors.request.use(
//   async (config) => {
//     const sessionToken = await Cookies.get("authToken");
//     if (sessionToken) {
//       config.headers.Authorization = `Bearer ${sessionToken}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// Interceptor cho response

export default axiosClient;
