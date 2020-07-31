/*
Wraps the rendered element in hidden styling.
The useAppearSequence hook modifies the visibility of this component directly.
*/
import React from "react";

export default function Appear({ children }) {
  return (
    <span className="invisible" data-appear="false">
      {children}
    </span>
  );
}
