import type { Project } from "~/data/projects";
import { site } from "~/data/site";

// Structured data ("JSON-LD") is a short machine-readable summary of a page, for search engines.
// Only include facts that are really on the page and really true.

const context = "https://schema.org";

export function websiteSchema() {
  return {
    "@context": context,
    "@type": "WebSite",
    name: site.name,
    url: site.url,
  };
}

export function personSchema() {
  return {
    "@context": context,
    "@type": "Person",
    name: site.shortName,
    jobTitle: "Photographer",
    url: site.url,
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": context,
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

export function projectSchema(project: Project, imagePath?: string) {
  return {
    "@context": context,
    "@type": "CreativeWork",
    name: project.title,
    url: `${site.url}/portfolio/${project.slug}`,
    genre: project.category,
    locationCreated: { "@type": "Place", name: project.location },
    creator: { "@type": "Person", name: site.shortName },
    ...(imagePath ? { image: `${site.url}${imagePath}` } : {}),
  };
}
