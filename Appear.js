import React, { useState, useEffect } from "react";
import { useAppearContext, useSlideContext } from "./contexts";
import styles from "./Appear.css";

export default function Appear({ children }) {
  const slideIndex = useSlideContext();
  const appearState = useAppearContext();

  const { register } = appearState;
  const currentAppearIndex = appearState.slide[slideIndex]
    ? appearState.slide[slideIndex].current
    : -1;

  const [indexToAppearAt, setIndexToAppearAt] = useState(null);

  useEffect(() => {
    if (slideIndex !== null && indexToAppearAt === null) {
      const registeredIndex = register(slideIndex);
      console.log("registeredIndex", registeredIndex);
      setIndexToAppearAt(registeredIndex);
    }
  }, [slideIndex, register, indexToAppearAt, setIndexToAppearAt]);

  return React.Children.map(children, child => {
    const ogClassName = child.className || "";
    const className =
      currentAppearIndex > indexToAppearAt
        ? ogClassName
        : ogClassName + " " + styles.hidden;

    const updatedChild = React.cloneElement(child, {
      ...child.props,
      className
    });
    return updatedChild;
  });
}
