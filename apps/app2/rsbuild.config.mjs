import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

/** @type {import('@rspack/cli').Configuration} */
export default defineConfig({
  plugins: [pluginReact()],
  source: {
    entry: {
      index: './src/index.js',
    },
  },
  output: {
    distPath: '../../public/app2',
  },
  server: {
    base: '/app2',
  },
  dev: {
    hmr: true,
    progressBar: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'ecmascript',
                jsx: true,
                dynamicImport: true, // 启用动态导入
              },
            },
          },
        },
      },
    ],
  },
});
