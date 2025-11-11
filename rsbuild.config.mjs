import { defineConfig, rspack } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/rspack";
import { pluginLess } from "@rsbuild/plugin-less";
import { pluginBabel } from "@rsbuild/plugin-babel";
const isDev = process.env.NODE_ENV !== "production";
/** @type {import('@rspack/cli').Configuration} */
export default defineConfig({
  plugins: [pluginReact(), pluginLess(), pluginBabel()],
  html: {
    favicon: "favicon.svg",
    title: "小小工具箱",
  },
  source: {
    entry: {
      index: "./src/index.js",
    },
  },
  tools: {
    rspack: {
      devtool: isDev ? "eval-cheap-module-source-map" : "source-map",
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
    server: {
      // http://localhost:8001/api/
      '/proxy': {
        "/metabase": {
          target: "http://58.20.184.66:6005/metabase",
          changeOrigin: true,
          pathRewrite: { "^/metabase": "" },
        },
      },
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
    minimize: true,
    realContentHash: true,
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
    removeAvailableModules: true,
    splitChunks: {
      chunks: "all",
      maxSize: 100 * 1024,
      maxAsyncSize: 100 * 1024,
      minSizeReduction: 100 * 1000,
      minSize: 0,
      chunks: "all",
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
          name: "vendors",
          chunks: "all",
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        // 提取 node_modules 中的依赖到独立的 vendor chunk，优先级高
        // vendor: {
        //   test: /[\\/]node_modules[\\/]/,
        //   name: "vendor",
        //   priority: 20,
        //   enforce: true,
        //   reuseExistingChunk: true,
        // },
        "pro-components": {
          test: /\/@ant-design\/pro-components\//,
          name: "pro-components",
          priority: 30,
          enforce: true,
          reuseExistingChunk: true,
        },
        "monaco-editor": {
          test: /\/@monaco-editor\/react\//,
          name: "monaco-editor",
          priority: 30,
          enforce: true,
          reuseExistingChunk: true,
        },
        antd_comp: {
          test: /\/antd\//,
          name: "antd",
          priority: 30,
          enforce: true,
          reuseExistingChunk: true,
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
    minimizer: isDev
      ? []
      : [
          new rspack.SwcJsMinimizerRspackPlugin(),
          new rspack.LightningCssMinimizerRspackPlugin(),
        ],
  },
  lazyCompilation: { imports: true, entries: false },
});
