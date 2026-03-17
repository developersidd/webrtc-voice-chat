import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import { AxiosError } from "axios";
import axiosInstance from ".";
const axiosBaseQuery =
  (): BaseQueryFn<any, unknown, unknown> =>
  async ({ url, method, body, params, headers }) => {
    console.log("🚀 ~ url, method, data, params:", url, method, body, params);
    try {
      const result = await axiosInstance({
        url,
        method,
        data: body,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const error = axiosError as AxiosError;
      return {
        error: {
          status: error?.status,
          data: error.response?.data || error.message,
        },
      };
    }
  };

export default axiosBaseQuery;
