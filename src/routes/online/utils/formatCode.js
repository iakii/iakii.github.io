import prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";

/**
 * 使用 prettier 格式化 JS/JSX/React 代码
 * @param {string} code
 * @returns {string}
 */
export function formatCode(code) {
  //   return prettier.format(code, {
  //     parser: "babel",
  //     plugins: [parserBabel],
  //     semi: true,
  //     singleQuote: true,
  //     jsxSingleQuote: false,
  //     trailingComma: "all",
  //     printWidth: 100,
  //     tabWidth: 2,
  //   });

  return code;
}
