import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../axios/axiosBaseQuery";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
  tagTypes: [],
});

export default apiSlice;
