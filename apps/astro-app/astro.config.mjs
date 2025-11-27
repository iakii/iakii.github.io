// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [react({ experimentalReactChildren: true })],
  outDir: "../../public/astro",
  base: "/astro/",
  devToolbar: {
    enabled: false,
  },
});
