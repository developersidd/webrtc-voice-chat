import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: {
    email: "",
    refreshToken: "",
    activated: false,
    createdAt: "",
    _id: "",
  },
  otp: {
    email: "siddik.prgmr@gmail.com",
    hash: "520a312b0c8fbd225da85eb26b8341c222124783eef00230c66fb683a412fc98.1776070302815",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setOtp: (state, action) => {
      state.otp = action.payload;
    },
  },
});

export const { setAuth, setOtp } = authSlice.actions;
export default authSlice;
