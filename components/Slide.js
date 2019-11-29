import React, { useRef } from "react";
import styles from "./Slide.css";
import { useDeckContext } from "../contexts";
import useAppearSequence from "./useAppearSequence";

export default function Slide({ children, index, ...props }) {
  const { currentSlideIndex } = useDeckContext();
  const isCurrentStep = currentSlideIndex === index;
  const slideRef = useRef();

  useAppearSequence(slideRef, isCurrentStep);

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
