import { useCallback, useRef } from "react";
import useEvent from "./useEvent";

/*
Bind a touch swipe event hander to window.
*/
const useSwipeEvent = ({ left, right, up, down }) => {
  const startX = useRef(0);
  const startY = useRef(0);

  const handleTouchStart = useCallback((e) => {
    if (e) {
      startX.current = e.changedTouches[0].screenX;
      startY.current = e.changedTouches[0].screenY;
    }
  }, []);

  const handleTouchEnd = useCallback(
    (e) => {
      const { screenX, screenY } = e.changedTouches[0];
      const diffX = screenX - startX.current;
      const diffY = screenY - startY.current;
      const ratioX = Math.abs(diffX / diffY);
      const ratioY = Math.abs(diffY / diffX);
      const absDiff = Math.abs(ratioX > ratioY ? diffX : diffY);

      if (absDiff < 30) return; // Ignore small movements.
      if (ratioX > ratioY) {
        if (diffX >= 0) right && right();
        else left && left();
      } else {
        if (diffY >= 0) down && down();
        else up && up();
      }
    },
    [left, right, up, down]
  );

  useEvent("touchstart", handleTouchStart);
  useEvent("touchend", handleTouchEnd);
};

export default useSwipeEvent;
