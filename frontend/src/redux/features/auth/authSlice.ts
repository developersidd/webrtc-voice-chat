import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "../../../types";

const initialState: AuthState = {
  isAuthenticated: false,
  user: {
    email: "",
    refreshToken: "",
    activated: false,
    avatar: "",
    createdAt: "",
    username: "",
    bio: "",
    fullName: "",
    id: "",
  },
  otp: {
    //email: "absidd.prgmr@gmail.com",
    hash: "9d021de7b89cbea46458efc00bf4ac1e5de6cf207313c4383146e2a9dfa8c139.1788202874087",
    email: "siddik.prgmr@gmail.com",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { user } = action.payload || {};
      state.user = user;
      state.isAuthenticated = user === null ? false : true;
    },

    setOtp: (state, action) => {
      state.otp = action.payload;
    },
  },
});

export const { setAuth, setOtp } = authSlice.actions;
export default authSlice;
