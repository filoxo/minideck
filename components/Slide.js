import React, { useRef, useEffect } from "react";
import styles from "./Slide.css";
import { useDeckContext } from "../contexts";

const flipAppearanceUntilFinding = bool => node => {
  const { appear } = node.dataset;
  node.dataset.appear = bool;
  bool = appear === "true";
};

const useAppearNodes = (slideRef, isCurrentStep) => {
  const appearNodes = useRef();

  useEffect(() => {
    appearNodes.current = Array.from(
      slideRef.current.querySelectorAll("[data-appear]")
    );
  }, []);

  useEffect(() => {
    const handleAppearSequence = isCurrentStep
      ? e => {
          if (isCurrentStep) {
            switch (e.key) {
              case "ArrowUp": {
                [...appearNodes.current]
                  .reverse()
                  .forEach(flipAppearanceUntilFinding(false));
                break;
              }
              case "ArrowDown": {
                appearNodes.current.forEach(flipAppearanceUntilFinding(true));
                break;
              }
              default:
                break;
            }
          }
        }
      : () => {};

    window.addEventListener("keydown", handleAppearSequence);
    return () => {
      window.removeEventListener("keydown", handleAppearSequence);
    };
  }, [isCurrentStep]);
};

export default function Slide({ children, index, ...props }) {
  const { currentSlideIndex } = useDeckContext();
  const isCurrentStep = currentSlideIndex === index;
  const slideRef = useRef();

  useAppearNodes(slideRef, isCurrentStep);

  return (
    <section
      ref={slideRef}
      className={styles.Slide}
      aria-current={isCurrentStep ? "step" : null}
      {...props}
    >
      <div className={styles.SlideContent}>{children}</div>
    </section>
  );
}
