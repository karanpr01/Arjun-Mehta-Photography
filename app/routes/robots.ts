import { site } from "~/data/site";

// Becomes /robots.txt. It tells search engines they may visit everything, and where the sitemap is.
export function loader() {
  const text = `User-agent: *
Allow: /

Sitemap: ${site.url}/sitemap.xml
`;

  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
