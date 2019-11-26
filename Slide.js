import React from "react";
import styles from "./Slide.css";
import { SlideContext } from "./contexts";

export default function Slide({ children, index, ...props }) {
  return (
    <SlideContext.Provider value={index}>
      <section className={styles.slide} {...props}>
        {children}
      </section>
    </SlideContext.Provider>
  );
}
