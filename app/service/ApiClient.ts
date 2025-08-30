import axios from "axios";

export const baseUrl = process.env.BACKEND_URL;
export const FeUrl = process.env.SITE_URL;

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
