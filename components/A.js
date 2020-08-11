import React from "react";
import { Link } from "wouter";
import cls from "classnames";

/*
Anchors are rendered using normal Markdown syntax.
If the url is a "local link", it renders a wouter Link. Otherwise, uses a normal anchor tag.
*/
export default function A(props) {
  const isLocalLink = props.href.startsWith("/");
  const A = isLocalLink ? Link : "a";
  return <A {...props} className={cls("underline", props.className)} />;
}
