/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState } from "react";

const useStateWithCallback = (initialState: any) => {
  const [state, setState] = useState<any>(initialState);
  const cbRef = useRef<(state: any) => void | null>(null);

  const setStateWithCallback = useCallback(
    (newState: any, callback: (state: any) => void) => {
      cbRef.current = callback;
      setState((prevState: any) => {
        return typeof newState === "function" ? newState(prevState) : newState;
      });
    },
    [state],
  );

  // call the callback after state has been updated
  useEffect(() => {
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = null;
    }
  }, [state]);

  return [state, setStateWithCallback] as const;
};

export default useStateWithCallback;
