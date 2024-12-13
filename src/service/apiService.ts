import { AxiosResponse } from "axios";
import axiosInstance from "@/src/config/instance";
import PATH from "@/src/config/env";

export default {
  //user
  getUser: async () => {
    try {
      const response: AxiosResponse = await axiosInstance.get(
        PATH.API_DEV + "/api/user"
      );
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },
};
