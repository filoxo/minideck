import React, { useRef } from "react";
import styles from "./Slide.css";
import useAppearSequence from "./useAppearSequence";

export default function Slide({ children, isActive, ...props }) {
  const slideRef = useRef();

  useAppearSequence(slideRef, isActive);

  return (
    <section
      ref={slideRef}
      className={styles.Slide}
      aria-current={isActive ? "step" : null}
      {...props}
    >
      <div className={styles.SlideContent}>{children}</div>
    </section>
  );
}
