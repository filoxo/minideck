import React from "react";
import useEvent from "./useEvent";
import { AppearContext } from "./contexts";

export default function AppearMaster(props) {
  const handleAppear = useCallback(
    e => {
      switch (e.key) {
        case "ArrowUp":
          dispatch({
            type: PREV_APPEAR,
            payload: { slide: currentIndex }
          });
          break;
        case "ArrowDown":
          dispatch({
            type: NEXT_APPEAR,
            payload: { slide: currentIndex }
          });
          break;
      }
    },
    [dispatch, currentIndex]
  );

  useEvent("keydown", handleAppear);

  return (
    <AppearContext.Provider
      value={{
        slide: state,
        register: slide => {}
      }}
    >
      {props.children}
    </AppearContext.Provider>
  );
}
