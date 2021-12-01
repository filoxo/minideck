import { useCallback, useRef } from "react";
import useEvent from "./useEvent";

/**
 * Bind a touch swipe event hander to window.
 *
 * @param { object } props
 * @param { function } [props.left] - Callback on left swipe.
 * @param { function } [props.right] - Callback on right swipe.
 * @param { function } [props.up] - Callback on up swipe.
 * @param { function } [props.down] - Callback on down swipe.
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
        if (diffX >= 0) right?.();
        else left?.();
      } else {
        if (diffY >= 0) down?.();
        else up?.();
      }
    },
    [left, right, up, down]
  );

  useEvent("touchstart", handleTouchStart);
  useEvent("touchend", handleTouchEnd);
};

export default useSwipeEvent;
