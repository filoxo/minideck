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
        "p-2 w-screen h-screen absolute flex items-center justify-center transition-opacity duration-300 transform",
        {
          "opacity-100 translate-y-0": isActive,
          "opacity-0 translate-y-full": !isActive,
        }
      )}
      aria-current={isActive ? "step" : null}
      {...props}
    >
      <div>{children}</div>
    </section>
  );
}
