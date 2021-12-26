import postcssConfig from "./postcss.config.js";
import reactRefresh from "@vitejs/plugin-react-refresh";
import remarkAttr from "remark-attr";

const mdxOptions = {
  remarkPlugins: [remarkAttr],
};

export default {
  css: {
    postcss: postcssConfig,
  },
  plugins: [reactRefresh(), mdx(mdxOptions)],
};
