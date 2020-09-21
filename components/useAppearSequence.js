import { useRef, useEffect, useMemo, useCallback } from "react";
import useEvent from "./useEvent";

const noop = () => {};

const useTouchClickEvent = (handler, isCurrentStep) => {
  const wasPreceededByTouch = useRef(false);
  const setWasPreceededByTouch = useCallback(() => {
    wasPreceededByTouch.current = isCurrentStep && true;
  }, [isCurrentStep]);
  const handleClickAndReset = useCallback(
    (e) => {
      if (isCurrentStep && wasPreceededByTouch.current && handler) handler(e);
      wasPreceededByTouch.current = false;
    },
    [isCurrentStep, handler]
  );
  useEvent("touchstart", setWasPreceededByTouch);
  useEvent("click", handleClickAndReset);
};

const flipAppearanceUntilFinding = (bool) => (node) => {
  const { appear } = node.dataset;
  node.dataset.appear = bool;
  node.classList.toggle("visible", bool);
  node.classList.toggle("invisible", !bool);
  bool = appear === "true";
};

const useAppearSequence = (slideRef, isCurrentStep) => {
  const appearNodes = useRef();

  useEffect(() => {
    appearNodes.current = Array.from(
      slideRef.current.querySelectorAll("[data-appear]")
    ).sort((a, b) => {
      const aOrder = parseInt(
        a.dataset.appearOrder || Number.MAX_SAFE_INTEGER,
        10
      );
      const bOrder = parseInt(
        b.dataset.appearOrder || Number.MAX_SAFE_INTEGER,
        10
      );
      return aOrder - bOrder;
    });
  }, []);

  const forward = useCallback(() => {
    appearNodes.current.forEach(flipAppearanceUntilFinding(true));
  }, []);

  const backward = useCallback(() => {
    [...appearNodes.current]
      .reverse()
      .forEach(flipAppearanceUntilFinding(false));
  }, []);

  const handleAppearSequence = useMemo(() => {
    return isCurrentStep
      ? (e) => {
          if (isCurrentStep) {
            switch (e.key) {
              case "ArrowUp": {
                backward();
                break;
              }
              case "ArrowDown": {
                forward();
                break;
              }
              default:
                break;
            }
          }
        }
      : noop;
  }, [isCurrentStep]);

  useEvent("keydown", handleAppearSequence);

  useTouchClickEvent(forward, isCurrentStep);
};

export default useAppearSequence;
