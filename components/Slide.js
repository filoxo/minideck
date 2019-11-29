import React, { useRef, useEffect, useState } from "react";
import styles from "./Slide.css";
import { useDeckContext } from "../contexts";

const useAppearNodes = (slideRef, isCurrentStep) => {
  const [currentAppearStep, setCurrentAppearStep] = useState(-1);
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
                const prevAppearStep = Math.max(-1, currentAppearStep - 1);
                setCurrentAppearStep(prevAppearStep);
                break;
              }
              case "ArrowDown": {
                const nextAppearIndex = Math.min(
                  appearNodes.current.length,
                  currentAppearStep + 1
                );
                setCurrentAppearStep(nextAppearIndex);
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
  }, [isCurrentStep, currentAppearStep]);

  useEffect(() => {
    appearNodes.current.forEach((node, index) => {
      node.dataset.appear = `${index <= currentAppearStep}`;
    });
  }, [currentAppearStep]);
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
