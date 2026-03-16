import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../api/apiSlice";
import activateSlice from "../features/activate/activateSlice";
import authSlice from "../features/auth/authSlice";
const store = configureStore({
  reducer: {
    api: apiSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [activateSlice.name]: activateSlice.reducer,
  },
  middleware: (gDM) => gDM().concat(apiSlice.middleware),
  devTools: import.meta.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
