import React from "react";
import styles from "./Appear.css";

export default function Appear({ children }) {
  return (
    <span className={styles.Appear} data-appear="false">
      {children}
    </span>
  );
}
