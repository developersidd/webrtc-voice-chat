import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  avatar: "",
};

const activateSlice = createSlice({
  name: "activate",
  initialState,
  reducers: {
    setFullName: (state, action) => {
      state.fullName = action.payload;
    },

    setAvatar: (state, action) => {
      state.avatar = action.payload;
    },
  },
});

export default activateSlice;
export const { setFullName, setAvatar } = activateSlice.actions;
