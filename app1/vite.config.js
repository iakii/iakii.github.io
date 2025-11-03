import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        format: "umd",
        name: "reactApp", // 与 qiankun name 保持一致
      },
    },
  },
});
