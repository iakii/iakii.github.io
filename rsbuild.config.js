import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  plugins: [
    pluginReact(),
  ],
  source: {
    entry: {
      index: "./src/main.js",
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "builtin:swc-loader",
          options: {
            jsc: {
              parser: {
                syntax: "ecmascript",
                jsx: true,
              },
            },
          },
        },
      },
    ],
  },
});
