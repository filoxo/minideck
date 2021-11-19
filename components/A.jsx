import React from "react";
import cls from "classnames";
import { navigate } from './useHashLocation'; 

const Link = (props) => {
  const onClick = (e) => {
    e.preventDefault();
    navigate(props.href)
  }
  return <a {...props} onClick={onClick} />
}

/*
Anchors are rendered using normal Markdown syntax, eg. `[my link](https://www.my.link/somewhere)`
If the url is a "local link", it renders a client-side routing Link. Otherwise, uses a normal anchor tag.
*/
export default function A(props) {
  const isLocalLink = props.href.startsWith("/");
  const A = isLocalLink ? Link : "a";
  return <A {...props} className={cls("underline", props.className)} />;
}
