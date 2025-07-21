import axios, { AxiosRequestConfig } from "axios";
import ENV from "./env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserStore } from "../store/userStore";

// Set up a global Axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: ENV.API_DEV,
  timeout: 5000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const token = useUserStore.getState().accessToken;

    console.log("Token used in axios interceptor:", token);

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
