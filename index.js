import React from "react";
import { render } from "react-dom";
import cls from "classnames";
import { MDXProvider } from "@mdx-js/react";

import Deck from "./components/Deck";
import Slide from "./components/Slide";
import Appear from "./components/Appear";
import Code from "./components/Code";
import Aside from "./components/Aside";
import A from "./components/A";

import MDXContent from "./content.mdx";

const Base = (C, classnames) => (props) => (
  <C {...props} className={cls(classnames, props.className)} />
);

render(
  <MDXProvider
    components={{
      wrapper: Deck,
      Slide,
      Appear,
      Aside,
      code: Code,
      inlineCode: Base("code", "bg-gray-200 px-1 rounded"),
      a: A,
      h1: Base("h1", "text-center text-4xl"),
      h2: Base("h2", "text-center text-3xl"),
      h3: Base("h3", "text-center text-2xl"),
      ul: Base("ul", "ml-4 list-inside list-disc"),
      ol: Base("ol", "ml-4 list-inside list-decimal"),
      table: Base("table", "table-auto mx-auto"),
      td: Base("td", "px-4 py-2 border"),
      th: Base("th", "px-4 py-2 border bg-gray-200"),
    }}
  >
    <MDXContent />
  </MDXProvider>,
  document.querySelector("#minideck")
);
