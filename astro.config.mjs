import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://datacowgirl.sh",
  markdown: {
    shikiConfig: {
      theme: "catppuccin-frappe",
      wrap: true,
    },
  },
  integrations: [mdx(), sitemap()],
});
