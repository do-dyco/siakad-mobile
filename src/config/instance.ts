import axios, { AxiosRequestConfig } from "axios";
import ENV from "./env";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

// Interceptor to set the Authorization header with the token
axiosInstance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    // console.log('Outgoing Request:', {
    //   url: config.url,
    //   method: config.method,
    //   headers: config.headers,
    //   data: config.data,
    // });
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        // console.log('Authorization header:', config.headers.Authorization);
      }
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Another Axios instance for uploads
const uploadAxiosInstance = axios.create({
  baseURL: ENV.API_DEV,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Interceptor to set the Authorization header with the token
uploadAxiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("tokenLogin");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
export { uploadAxiosInstance };
