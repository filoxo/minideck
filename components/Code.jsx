/*
- Renders code blocks, defaults to `javascript` as the language
- By default, it uses the Github theme
*/
import React from "react";
import cls from "classnames";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/github";

export default ({ children, className = "javascript" }) => {
  const language = className.replace(/language-/, "");
  return (
    <Highlight
      {...defaultProps}
      code={children}
      language={language}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={cls(className, "p-4 rounded")} style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};
