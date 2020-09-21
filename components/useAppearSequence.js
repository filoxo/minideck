import { useRef, useEffect, useMemo, useCallback } from "react";
import useEvent from "./useEvent";
import useSwipeEvent from "./useSwipeEvent";

const noop = () => {};

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
    [...appearNodes.current]
      .reverse()
      .forEach(flipAppearanceUntilFinding(false));
  }, []);

  const backward = useCallback(() => {
    appearNodes.current.forEach(flipAppearanceUntilFinding(true));
  }, []);

  const handleAppearSequence = useMemo(() => {
    return isCurrentStep
      ? (e) => {
          if (isCurrentStep) {
            switch (e.key) {
              case "ArrowUp": {
                forward();
                break;
              }
              case "ArrowDown": {
                backward();
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

  const appearSwipeEvents = useMemo(
    () =>
      isCurrentStep
        ? {
            up: forward,
            down: backward,
          }
        : {},
    [isCurrentStep]
  );

  useSwipeEvent(appearSwipeEvents);
};

export default useAppearSequence;
