import type { Response, User } from "../../../types";
import apiSlice from "../../api/apiSlice";
import { setAuth } from "./authSlice";

const AUTH = (path: string) => `/auth/${path}`;

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      sendOTP: builder.mutation({
        query: (data) => ({
          url: AUTH("send-otp"),
          body: data,
          method: "POST",
        }),
      }),

      verifyOTP: builder.mutation({
        query: (data) => {
          //console.log("🚀 ~ data:", data);
          return {
            url: AUTH("verify-otp"),
            body: data,
            method: "POST",
          };
        },
      }),

      logout: builder.mutation<Response<{ user: null; isAuth: false }>, void>({
        query: () => ({
          url: AUTH("logout"),
          method: "POST",
        }),
      }),

      refreshAccessToken: builder.query<Response<{ user: User }>, void>({
        query: () => ({
          url: AUTH("refresh"),
          method: "GET",
        }),
        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
          try {
            const { data } = await queryFulfilled;
            dispatch(setAuth(data?.data));
          } catch (error) {
            console.log("Error while refreshing Access Token!", error);
          }
        },
      }),
    };
  },
});

export const {
  useSendOTPMutation,
  useVerifyOTPMutation,
  useLogoutMutation,
  useRefreshAccessTokenQuery,
} = authApi;
