import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "@/src/config/instance";
import { LoginPayload } from "@/src/types/UserTypes";
import ENV from "@/src/config/env";

const getLogin = async ({ email, password }: LoginPayload) => {
  // console.log('Axios Instance Configuration:', axiosInstance.defaults);
  try {
    const response = await axiosInstance.post(ENV.API_DEV + "", {
      email: email,
      password: password,
    });
    await AsyncStorage.setItem("token", response?.data?.data?.token);
    return response.data;
  } catch (error) {
    console.log(error);
    return { message: "error login" };
  }
};

export { getLogin };
