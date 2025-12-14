// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [react({ experimentalReactChildren: true })],
  site: "https://iakii.github.io",
  base: "/render", // 保持和你的 GitHub Pages 路径一致
  // publicDir: "public", // 恢复默认，建议去掉或用 public
  // outDir: "dist", // 用默认即可
  devToolbar: {
    enabled: false,
  },
  build: {
    // 将默认的 '_astro' 修改为你想要的目录名，例如 'assets'
    assets: "assets",
  },
});
