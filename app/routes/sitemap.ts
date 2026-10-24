import { site } from "~/data/site";
import { allPaths } from "~/lib/paths";

// A route with no page: it answers with a file. This one becomes /sitemap.xml.
export function loader() {
  const urls = allPaths()
    .map((path) => `  <url><loc>${site.url}${path}</loc></url>`)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
