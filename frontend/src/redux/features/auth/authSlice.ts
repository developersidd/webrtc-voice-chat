import { createSlice } from "@reduxjs/toolkit";
import type { AuthStateType } from "../../../types";

const initialState: AuthStateType = {
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
    _id: "",
  },
  otp: {
    email: "absidd.prgmr@gmail.com",
    hash: "d38eefdb730a8c5156a64a18bfac6b613a0f286907fc0ab837344fd1fa0295e8.1777274409703",
    //email: "siddik.prgmr@gmail.com",
    //hash: "520a312b0c8fbd225da85eb26b8341c222124783eef00230c66fb683a412fc98.1776070302815",
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
