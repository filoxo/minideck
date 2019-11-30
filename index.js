import React from "react";
import { render } from "react-dom";
import { MDXProvider } from "@mdx-js/react";

import Deck from "./components/Deck";
import Slide from "./components/Slide";
import Appear from "./components/Appear";
import Code from "./components/Code";
import Table from "./components/Table";

import MDXContent from "./content.mdx";

render(
  <MDXProvider
    components={{
      wrapper: Deck,
      Slide,
      Appear,
      code: Code,
      table: Table
    }}
  >
    <MDXContent />
  </MDXProvider>,
  document.querySelector("#minideck")
);
