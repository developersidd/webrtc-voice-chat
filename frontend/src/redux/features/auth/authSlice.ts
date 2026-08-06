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
    hash: import.meta.env.VITE_HASH,
    email: import.meta.env.VITE_EMAIL,
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
