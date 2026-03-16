import type { RootState } from "../../app/store";

export const authSelector = (rootState: RootState) => rootState.auth;
