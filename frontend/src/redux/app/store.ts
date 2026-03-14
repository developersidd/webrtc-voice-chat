import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../api/apiSlice";
import authReducer from "../features/auth/authSlice";
const store = configureStore({
  reducer: {
    api: apiSlice.reducer,
    authSlice: authReducer,
  },
  middleware: (gDM) => gDM().concat(apiSlice.middleware),
  devTools: import.meta.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
