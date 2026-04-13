import type { RootState } from "../../app/store";

const roomSelector = (rootState: RootState) => rootState.room;

export default roomSelector;
