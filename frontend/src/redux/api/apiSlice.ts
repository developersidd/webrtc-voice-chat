import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../axios/axiosBaseQuery";

const apiSlice = createApi({
  reducerPath: "api",
  /* 
  fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: "include",
  }),
  */
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
  tagTypes: [],
});

export default apiSlice;
