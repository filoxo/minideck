/*
Many times, the Markdown `blockquote` ie. `>` is abused when in reality an `aside` element is more appropriate.
This component should be used in those instances, which is almost always.
*/
import React from "react";
import cls from "classnames";

export default function Aside({ children, info, warning }) {
  return (
    <aside
      className={cls("p-2 mt-2 border-l-4 rounded", {
        "text-gray-800 bg-gray-100 border-gray-400": !info && !warning,
        "text-blue-800 bg-blue-100 border-blue-400": info,
        "text-red-800 bg-red-100 border-red-400": warning,
      })}
    >
      {children}
    </aside>
  );
}
