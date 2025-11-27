// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [react({ experimentalReactChildren: true })],
  // outDir: "../../public/render",
  site: "https://iakii.github.io",
  base: "/render",
  publicDir: "static",
  devToolbar: {
    enabled: false,
  },
});
