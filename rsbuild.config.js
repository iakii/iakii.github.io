import { defineConfig, rspack } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/rspack";

import { pluginLess } from "@rsbuild/plugin-less";
import { pluginBabel } from "@rsbuild/plugin-babel";

export default defineConfig({
  plugins: [pluginReact(), pluginLess(), pluginBabel()],
  source: {
    entry: {
      index: "./src/index.js",
    },
  },
  tools: {
    rspack: {
      plugins: [
        tanstackRouter({
          target: "react",
          autoCodeSplitting: true,
          generatedRouteTree: "./src/router.js",
          disableTypes: true,
          enableRouteGeneration: true,
        }),
      ],
    },
  },

  dev: {
    hmr: true,
    progressBar: true,
    lazyCompilation: {
      imports: true,
      entries: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "builtin:swc-loader",
          options: {
            jsc: {
              parser: {
                syntax: "ecmascript",
                jsx: true,
                dynamicImport: true, // 启用动态导入
              },
            },
          },
        },
      },
    ],
  },

  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        "pro-components": {
          test: /\/@ant-design\/pro-components\//,
          name: "pro-components",
        },
        antd_comp: {
          test: /\/antd\//,
          name: "antd",
        },
      },
    },
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin(),
      new rspack.LightningCssMinimizerRspackPlugin(),
    ],
  },
});
