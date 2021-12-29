import postcssConfig from "./postcss.config.js";
import reactRefresh from "@vitejs/plugin-react-refresh";
import mdx from "vite-plugin-mdx";
import remarkAttr from "remark-attr";
import { visit } from "unist-util-visit";
import { highlightHast, Language } from "tree-sitter-highlight";

function syntaxHighlightingPlugin() {
  function getLang(lang) {
    const langStr = lang.split("-")[1]; // "language-js" => "js"
    if (!langStr) {
      throw new Error(`Unable to get language from class "${langStr}"`);
    }
    const langMapping = {
      js: Language.JS,
      jsx: Language.JSX,
      ts: Language.TS,
      tsx: Language.TSX,
      css: Language.CSS,
    };
    const lang = langMapping[langStr];

    if (!lang) {
      throw new Error(
        `Unsupported language: ${lang}. See https://github.com/devongovett/tree-sitter-highlight/issues/2 for information about additional grammar support.`
      );
    }

    return lang;
  }

  return (tree, file) => {
    visit(tree, { tagName: "code" }, (node, i, parent) => {
      const langClass = node.properties.className.find((c) =>
        c.startsWith("language-")
      );
      const lang = getLang(langClass);
      const highlightedCode = node.children.map((child) => {
        const code = highlightHast(child.value, lang);
        code.tagName = "code"; // Sematic markup? Rather than a span this is now a code element
        return code;
      });
      // Remove an extra wrapper element by replacing the node rather than appending to it
      parent.children = highlightedCode;
    });
  };
}

const mdxOptions = {
  remarkPlugins: [remarkAttr],
  rehypePlugins: [syntaxHighlightingPlugin],
};

export default {
  css: {
    postcss: postcssConfig,
  },
  plugins: [reactRefresh(), mdx.default(mdxOptions)],
};
