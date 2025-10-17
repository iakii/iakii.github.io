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
        // 将 `src/routes/` 下的每个路由文件拆分为单独的 chunk
        // 生成的 chunk 名称基于文件相对路径（例如: routes-react-index -> src-routes-react-index）
        routes: {
          test: /src[\\/]routes[\\/].*\\.(js|jsx|mjs)$/,
          name(module, chunks, cacheGroupKey) {
            const resource = module.resource || "";
            const match = resource.match(/src[\\/](.*)\\.(js|jsx|mjs)$/);
            if (match && match[1]) {
              // 将路径中的斜杠替换为短横线，避免生成嵌套文件名
              return match[1].replace(/[\\/\\\\]+/g, "-");
            }
            return cacheGroupKey;
          },
          priority: 10,
          enforce: true,
          reuseExistingChunk: false,
        },
      },
    },
    // 仅在生产环境使用压缩/最小化，加快 dev
    minimizer: isDev ? [] : [
      new rspack.SwcJsMinimizerRspackPlugin(),
      new rspack.LightningCssMinimizerRspackPlugin(),
    ],
  },
  lazyCompilation: !isDev
});
