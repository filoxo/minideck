// @ts-check
import { useRef, useEffect, useMemo, useCallback } from "react";
import useEvent from "./useEvent";

/**
 * This hook handles detecting and triggering a click event only if using a touch device.
 * 
 * @param { function } handler 
 * @param { boolean } isCurrentStep 
 */
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

/**
 * Iterates through nodes, toggling their visibility classes, until the first node that already has the same value as `bool`.
 * 
 * @param { boolean } bool - The value to toggle the visibility of the nodes.
 */
const flipAppearanceUntilFinding = (bool) => (/** @type { HTMLElement } */ node) => {
  const { appear } = node.dataset;
  node.dataset.appear = bool.toString();
  node.classList.toggle("visible", bool);
  node.classList.toggle("invisible", !bool);
  bool = appear === "true";
};

/**
 * Parse the str as an integer, radix 10, or MAX_SAFE_INTEGER.
 * 
 * @param { string } str 
 * @returns number
 */
const parseIntOrMax = (str) => {
  const parsed = parseInt(str, 10);
  return isNaN(parsed) ? Number.MAX_SAFE_INTEGER : parsed;
}

const noop = () => {};

/**
 * This hook handles Appear ([data-appear]) elements and toggles their visibility in order.
 * The sequence order can be controlled by using `data-appear-order`
 * (alternatively, reorder them in the DOM). Appear sequence steps forward on
 * ArrowDown (keyboard) and TouchClick, and steps backward on ArrowUp (keyboard).
 * 
 * @param { React.MutableRefObject<HTMLElement> } slideRef 
 * @param { boolean } isCurrentStep 
 */
const useAppearSequence = (slideRef, isCurrentStep) => {
  const appearNodes = useRef([]);

  useEffect(() => {
    appearNodes.current = Array.from(
      slideRef.current.querySelectorAll("[data-appear]")
    ).sort((a, b) => {
      let aOrder = parseIntOrMax(
        (/** @type {HTMLElement} */ (a)).dataset.appearOrder
      );
      const bOrder = parseIntOrMax(
        (/** @type {HTMLElement} */ (b)).dataset.appearOrder
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
