import type { RootState } from "../../app/store";

const activateSelector = (rootState: RootState) => rootState.activate;

export default activateSelector;
