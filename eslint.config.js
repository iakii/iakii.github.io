import parser from "@babel/eslint-parser";
import react from "eslint-plugin-react";

export default [
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        requireConfigFile: false
      },
    },
    plugins: { react },
    rules: {
      "no-unused-vars": "warn",
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "warn"
    },
  },
];
