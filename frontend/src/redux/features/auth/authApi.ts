import apiSlice from "../../api/apiSlice";

const AUTH = (path: string) => `/auth/${path}`;

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendOTP: builder.mutation({
      query: (data) => ({
        url: AUTH("sent-otp"),
        body: data,
        method: "POST",
      }),
    }),

    verifyOTP: builder.mutation({
      query: (data) => ({
        url: AUTH("verify-otp"),
        body: data,
        method: "POST",
      }),
    }),
  }),
});

export const { useSendOTPMutation } = authApi;
