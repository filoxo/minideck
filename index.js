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
      table: Table,
      h1: (props) => <h1 className="text-3xl" {...props} />,
      h2: (props) => <h2 className="text-2xl" {...props} />,
      h3: (props) => <h3 className="text-xl" {...props} />,
    }}
  >
    <MDXContent />
  </MDXProvider>,
  document.querySelector("#minideck")
);
