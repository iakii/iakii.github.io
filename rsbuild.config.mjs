import { defineConfig, rspack } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/rspack";
import { pluginLess } from "@rsbuild/plugin-less";
import { pluginBabel } from "@rsbuild/plugin-babel";
/** @type {import('@rspack/cli').Configuration} */

const isDev = process.env.NODE_ENV !== 'production';

export default defineConfig({
  plugins: [pluginReact(), pluginLess(), pluginBabel()],
  html: {
    favicon: "favicon.png",
    title: "小小工具箱",
  },
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
          // 在开发模式下禁用路由自动代码生成，减少启动时间
          enableRouteGeneration: true,
        }),
      ],
    },
  },
  dev: {
    hmr: true,
    progressBar: true,
    // 开发环境限制 lazyCompilation 减少 CPU 消耗
    lazyCompilation: isDev ? { imports: true, entries: false } : { imports: true, entries: true },
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
    // 仅在生产环境使用压缩/最小化，加快 dev
    minimizer: isDev ? [] : [
      new rspack.SwcJsMinimizerRspackPlugin(),
      new rspack.LightningCssMinimizerRspackPlugin(),
    ],
  },
  // overall lazyCompilation 开关，开发环境关闭以避免额外扫描
  lazyCompilation: !isDev
});
