import axios, { InternalAxiosRequestConfig, AxiosError } from "axios";
import ENV from "./env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useAuthStore } from "../store/authStore";

const axiosInstance = axios.create({
  baseURL: ENV.API_DEV, // ✅ tetap pakai ENV.API_DEV
  timeout: 15000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ----- Request: sisipkan Bearer token dari store -----
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().accessToken;
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ----- Response: handle 401 global -----
let isRedirecting = false;

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const status = error?.response?.status;

    if (status === 401 && !isRedirecting) {
      isRedirecting = true;
      try {
        useAuthStore.getState().logout();
        // The _layout.tsx should handle the redirection based on isLoggedIn state
      } finally {
        isRedirecting = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
