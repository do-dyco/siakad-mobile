import { AxiosResponse } from "axios";
import axiosInstance from "@/src/config/instance";
import PATH from "@/src/config/env";

export default {
  //auth
  login: async (param: any) => {
    try {
      console.log("Mengirim request login dengan param:", PATH.API_DEV);

      const response: AxiosResponse = await axiosInstance.post(
        PATH.API_DEV + "/v2/auth/login",
        param,
      );
      console.log("Login response:", response);

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  //Home
  mySaldo: async () => {
    try {
      const response: AxiosResponse = await axiosInstance.get(
        PATH.API_DEV + "/v2/user/saldo-user/my-saldo",
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  //Tagihan
  myTagihan: async () => {
    try {
      const response: AxiosResponse = await axiosInstance.get(
        PATH.API_DEV + "/v2/user/tagihan/summary",
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Tagihan list dengan filter status (untuk tab Sedang Berlangsung)
  myTagihanList: async (params: { search?: string; limit?: number; status?: string }) => {
    try {
      const queryParams = new URLSearchParams();
      if (params.search) queryParams.append("search", params.search);
      if (params.limit) queryParams.append("limit", params.limit.toString());
      if (params.status) queryParams.append("status", params.status);

      const response: AxiosResponse = await axiosInstance.get(
        PATH.API_DEV + `/v2/user/tagihan?${queryParams.toString()}`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Invoice-tagihan list (untuk tab Dalam Proses)
  myInvoiceTagihanList: async (params: { search?: string; status?: string; limit?: number }) => {
    try {
      const queryParams = new URLSearchParams();
      if (params.search !== undefined) queryParams.append("search", params.search);
      if (params.status !== undefined) queryParams.append("status", params.status);
      if (params.limit) queryParams.append("limit", params.limit.toString());

      const response: AxiosResponse = await axiosInstance.get(
        PATH.API_DEV + `/v2/user/invoice-tagihan?${queryParams.toString()}`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  tagihanDetail: async (id: any) => {
    try {
      const response: AxiosResponse = await axiosInstance.get(
        PATH.API_DEV + `/v2/user/pembayaran-tagihan/${id}`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  myListTagihan: async (params: any) => {
    const query = new URLSearchParams(params).toString();

    try {
      const response: AxiosResponse = await axiosInstance.post(
        PATH.API_DEV + `/v2/user/tagihan/datatable`,
        params,
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  myPembayaranTagihan: async (user: any, params: any) => {
    try {
      const response: AxiosResponse = await axiosInstance.put(
        PATH.API_DEV + `/v2/user/pembayaran-tagihan/confirmation/${user}`,
        params,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  riwayatTransakasi: async (params: any) => {
    try {
      const response: AxiosResponse = await axiosInstance.post(
        PATH.API_DEV + `/v2/user/pembayaran-tagihan/datatable`,
        params,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  payment: async (params: any) => {
    try {
      const response: AxiosResponse = await axiosInstance.post(
        PATH.API_DEV + `/v2/user/pembayaran-tagihan`,
        params,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  paymentVa: async (params: any) => {
    try {
      const response: AxiosResponse = await axiosInstance.post(
        PATH.API_DEV + `/v2/user/pembayaran-tagihan`,
        params,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  confirmTransakasi: async (params: any, id: any) => {
    try {
      const response: AxiosResponse = await axiosInstance.put(
        PATH.API_DEV + `/v2/user/pembayaran-tagihan/confirmation/${id}`,
        params,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  //Invoice
  myInvoice: async (params: any) => {
    try {
      const response: AxiosResponse = await axiosInstance.post(
        PATH.API_DEV + "/v2/user/invoice-tagihan/datatable",
        params,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  myInvoiceDetail: async (noInvoice: any) => {
    try {
      console.log("=== API myInvoiceDetail ===");
      console.log("Request noInvoice:", noInvoice);
      console.log(
        "URL:",
        PATH.API_DEV + `/v2/user/invoice-tagihan/inv/${noInvoice}`,
      );

      const response: AxiosResponse = await axiosInstance.get(
        PATH.API_DEV + `/v2/user/invoice-tagihan/inv/${noInvoice}`,
      );

      console.log("Response status:", response.status);
      console.log("Response data:", response.data);

      return response.data;
    } catch (error) {
      console.error("=== API myInvoiceDetail ERROR ===");
      console.error("Error:", error);
      throw error;
    }
  },

  createInvoiceNumber: async (params: any) => {
    try {
      const response: AxiosResponse = await axiosInstance.post(
        PATH.API_DEV + `/v2/user/invoice-tagihan`,
        params,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  //rekening
  rekening: async () => {
    try {
      const response: AxiosResponse = await axiosInstance.get(
        PATH.API_DEV + "/v2/user/rekening-sekolah",
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  virtualAccount: async () => {
    try {
      const response: AxiosResponse = await axiosInstance.get(
        PATH.API_DEV + "/v2/user/pembayaran-tagihan/payment-gateway",
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
