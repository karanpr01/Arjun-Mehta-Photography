// SAMPLE CONTENT: titles, places and years come from the design mock-up.
// Replace every project with the photographer's real work before publishing.
// Images are referenced by `id`: the file assets/images-src/<id>.jpg (added in Step 2.4).

export const categories = [
  "Editorial & Fashion",
  "Portraiture & Branding",
  "Documentary & Fine Art",
] as const;

export type Category = (typeof categories)[number];
export type ProjectImage = { id: string; alt: string };

export type Project = {
  slug: string;
  title: string;
  category: Category;
  location: string;
  year: string;
  summary: string;
  image: ProjectImage; // the main photo
  gallery?: ProjectImage[]; // optional extra photos for the story page
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "solitude-in-cappadocia",
    title: "Solitude in Cappadocia",
    category: "Documentary & Fine Art",
    location: "Türkiye",
    year: "2024",
    summary: "[PLACEHOLDER: one or two sentences about this project.]",
    image: {
      id: "solitude-in-cappadocia",
      alt: "Sample photograph for Solitude in Cappadocia",
    },
    featured: true,
    gallery: [
      { id: "hero", alt: "Sample gallery photograph" },
      { id: "about-portrait", alt: "Sample gallery photograph" },
    ],
  },
  {
    slug: "aura-of-silk-and-stone",
    title: "Aura of Silk & Stone",
    category: "Editorial & Fashion",
    location: "Rajasthan",
    year: "2024",
    summary: "[PLACEHOLDER: one or two sentences about this project.]",
    image: {
      id: "aura-of-silk-and-stone",
      alt: "Sample photograph for Aura of Silk & Stone",
    },
    featured: true,
  },
  {
    slug: "echoes-of-the-monsoon",
    title: "Echoes of the Monsoon",
    category: "Documentary & Fine Art",
    location: "Varanasi",
    year: "2023–2024",
    summary: "[PLACEHOLDER: one or two sentences about this project.]",
    image: {
      id: "echoes-of-the-monsoon",
      alt: "Sample photograph for Echoes of the Monsoon",
    },
    featured: true,
  },
  {
    slug: "varanasi-ghats-at-dawn",
    title: "Varanasi Ghats at Dawn",
    category: "Portraiture & Branding",
    location: "India",
    year: "2023",
    summary: "[PLACEHOLDER: one or two sentences about this project.]",
    image: {
      id: "varanasi-ghats-at-dawn",
      alt: "Sample photograph for Varanasi Ghats at Dawn",
    },
  },
  {
    slug: "velvet-nocturne",
    title: "Velvet Nocturne",
    category: "Portraiture & Branding",
    location: "New York / London",
    year: "2024",
    summary: "[PLACEHOLDER: one or two sentences about this project.]",
    image: {
      id: "velvet-nocturne",
      alt: "Sample photograph for Velvet Nocturne",
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

// "Editorial & Fashion" -> "editorial-fashion". Used in the URL: /portfolio?category=editorial-fashion
export function categorySlug(category: Category): string {
  return category.toLowerCase().replace(/&/g, "").replace(/\s+/g, "-");
}

// Turns a URL value back into a real category, or null if it is missing or unknown.
export function categoryFromSlug(slug: string | null): Category | null {
  return categories.find((category) => categorySlug(category) === slug) ?? null;
}

export function filterProjects(
  list: Project[],
  category: Category | null,
): Project[] {
  return category
    ? list.filter((project) => project.category === category)
    : list;
}

// The projects either side of this one, in list order. They wrap around: after the last comes the first.
export function getAdjacentProjects(slug: string): {
  previous?: Project;
  next?: Project;
} {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return {};
  return {
    previous: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  };
}

// Projects in the same category first, then the rest, never including this one.
export function getRelatedProjects(slug: string, limit = 2): Project[] {
  const current = getProjectBySlug(slug);
  if (!current) return [];
  const others = projects.filter((project) => project.slug !== slug);
  const sameCategory = others.filter(
    (project) => project.category === current.category,
  );
  const rest = others.filter(
    (project) => project.category !== current.category,
  );
  return [...sameCategory, ...rest].slice(0, limit);
}
