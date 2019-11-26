import { useState, useRef, useCallback } from "react";
import useEvent from "./useEvent";

export default function useAppearNavigation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const appearCount = useRef(0);

  const register = useCallback(() => {
    return appearCount.current++;
  }, [appearCount.current]);

  const handleNavigation = useCallback(
    e => {
      if (e.key === "ArrowDown") {
        const nextAppearOrLimit = Math.min(
          currentIndex + 1,
          appearCount.current
        );
        setCurrentIndex(nextAppearOrLimit);
      }
      if (e.key === "ArrowUp") {
        const prevAppearOrLimit = Math.max(currentIndex - 1, 0);
        setCurrentIndex(prevAppearOrLimit);
      }
      if (e.key === "Enter") {
        setCurrentIndex(appearCount.current);
      }
    },
    [currentIndex, setCurrentIndex, appearCount.current]
  );

  useEvent("keydown", handleNavigation);

  return {
    current: currentIndex,
    register
  };
}
