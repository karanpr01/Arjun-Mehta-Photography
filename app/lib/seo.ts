import { site } from "~/data/site";

type PageSeo = {
  title: string; // the page's own name, e.g. "Services & Pricing"
  description: string; // one or two honest sentences, ideally 120 to 160 characters
  path: string; // the page's address without the domain, e.g. "/services"
  image?: string; // a path like "/images/hero-1200.jpg"; defaults to the site-wide share picture
  noindex?: boolean; // true = ask search engines to leave this page out
  jsonLd?: Record<string, unknown>[]; // structured data blocks (see structuredData.ts)
};

// Builds every title / description / share tag for one page.
// Each route's meta() function returns the result.
export function pageMeta({
  title,
  description,
  path,
  image = site.ogImage,
  noindex = false,
  jsonLd = [],
}: PageSeo) {
  const fullTitle = title === site.name ? title : `${title} | ${site.name}`;
  const url = `${site.url}${path}`;
  const imageUrl = image.startsWith("http") ? image : `${site.url}${image}`;

  return [
    { title: fullTitle },
    { name: "description", content: description },
    // Pages kept out of search results do not need a canonical address.
    ...(noindex ? [] : [{ tagName: "link", rel: "canonical", href: url }]),

    // Open Graph: used by Facebook, LinkedIn, WhatsApp, Slack and others.
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: site.name },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: imageUrl },

    // Twitter / X card.
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },

    ...(noindex ? [{ name: "robots", content: "noindex" }] : []),

    // Structured data for search engines.
    ... jsonLd.map((block) => ({ "script:ld+json": block })),
  ];
}
