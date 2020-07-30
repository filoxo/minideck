import React from "react";
import { Link } from "wouter";
import cls from "classnames";

export default function A(props) {
  const isLocalLink = props.href.startsWith("/");
  const A = isLocalLink ? Link : "a";
  return <A {...props} className={cls("underline", props.className)} />;
}
