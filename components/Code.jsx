/*
- Renders code blocks, defaults to `javascript` as the language
- By default, it uses the Github theme
*/
import React from "react";
import cls from "classnames";
import "./code-theme.css";

export default function Code({ children, className }) {
  return <code className={cls(className, "p-4 rounded")}>{children}</code>;
}
