import React from "react";

export default function Appear({ children }) {
  return (
    <span className="invisible" data-appear="false">
      {children}
    </span>
  );
}
