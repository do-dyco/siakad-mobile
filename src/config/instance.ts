import axios, { AxiosRequestConfig, AxiosError } from "axios";
import ENV from "./env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useUserStore } from "../store/userStore";

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
  async (config: AxiosRequestConfig) => {
    const token = useUserStore.getState().accessToken;
    
    if (token) {
      config.headers = {
        ...(config.headers || {}),
        Authorization: `Bearer ${token}`,
      };
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
      // try {
      //   useUserStore.getState().clearAuth?.();
      //   await AsyncStorage.removeItem("auth-storage");
      //   setTimeout(() => {
      //     // router.replace("/(auth)/login");
      //     isRedirecting = false;
      //   }, 0);
      // } catch {
      //   isRedirecting = false;
      // }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
