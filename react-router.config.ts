import type { Config } from "@react-router/dev/config";
import { allPaths } from "./app/lib/paths";

export default {
  // No server: the site is built as plain files that any static host can serve.
  ssr: false,
  // Build a real HTML file for each of these addresses.
  async prerender() {
    return [...allPaths(), "/404", "/sitemap.xml", "/robots.txt"];
  },
} satisfies Config;
