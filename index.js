import React from "react";
import { render } from "react-dom";
import { MDXProvider } from "@mdx-js/react";

import Deck from "./Deck";
import Slide from "./Slide";
import Appear from "./Appear";
import Code from "./Code";

import MDXContent from "./content.mdx";

render(
  <MDXProvider
    components={{
      wrapper: Deck,
      Slide,
      Appear,
      code: Code
    }}
  >
    <MDXContent />
  </MDXProvider>,
  document.querySelector("#minideck")
);
