import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

export default defineConfig({
  server: {
    port: 3008, // 子应用端口（与主应用不同）
    origin: "//localhost:3008", // 确保资源路径正确
    headers: {
      // 允许主应用跨域访问（开发环境）
      "Access-Control-Allow-Origin": "*",
    },
  },

  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
      generatedRouteTree: "./src/router.js",
      disableTypes: true,
      enableRouteGeneration: true,
    }),
    react({
      // 支持 .js 文件写 JSX
      include: ["**/*.jsx", "**/*.js"],
    }),
  ],
  build: {
    lib: {
      entry: "src/entry.js",
      name: "app1",
      formats: ["umd"],
      fileName: "app1",
    },
    outDir: "../../public/app1",
    rollupOptions: {
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },

  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.js?$/,
    exclude: [],
  },
});
