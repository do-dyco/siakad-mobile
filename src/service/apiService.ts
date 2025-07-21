import { AxiosResponse } from "axios";
import axiosInstance from "@/src/config/instance";
import PATH from "@/src/config/env";

export default {
  //auth
  login: async (param: any) => {
    try {
      const response: AxiosResponse = await axiosInstance.post(
        PATH.API_DEV + "/v2/auth/login",
        param
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  //Home
  mySaldo: async () => {
    try {
      const response: AxiosResponse = await axiosInstance.get(
        PATH.API_DEV + "/v2/user/saldo-user/my-saldo"
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  //Tagihan
  myTagihan: async (id: number) => {
    try {
      const response: AxiosResponse = await axiosInstance.get(
        PATH.API_DEV + "/v2/user/tagihan?id=" + id
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
