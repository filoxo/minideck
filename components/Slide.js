/*
- Finds all `Appear` children and controls when they appear based on if the slide is active
- The animation between slides is defined and controlled here
*/
import React, { useRef } from "react";
import cls from "classnames";
import useAppearSequence from "./useAppearSequence";

export default function Slide({ children, isActive, ...props }) {
  const slideRef = useRef();

  useAppearSequence(slideRef, isActive);

  return (
    <section
      ref={slideRef}
      className={cls(
        "slide p-2 w-screen h-screen absolute flex items-center justify-center transition-opacity duration-300 transform",
        {
          "opacity-100 translate-y-0": isActive,
          "opacity-0 translate-y-full invisible": !isActive,
        }
      )}
      aria-current={isActive ? "step" : null}
      {...props}
    >
      <div>{children}</div>
    </section>
  );
}
