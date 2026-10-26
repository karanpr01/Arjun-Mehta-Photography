// DEMO CONTENT for the Home page. Publications, awards and quotes are invented for this concept project.

export const heroSlides = [
  {
    image: {
      id: "balloons",
      alt: "Hot air balloons rising over the valleys of Cappadocia at sunrise",
    },
    caption: "Solitude in Cappadocia · Türkiye, 2025",
    href: "/portfolio/solitude-in-cappadocia",
  },
  {
    image: {
      id: "spiti",
      alt: "A small mountain settlement in snowy Spiti Valley at blue hour",
    },
    caption: "Spiti Solace · Himachal Pradesh, 2025",
    href: "/portfolio/spiti-solace",
  },
  {
    image: {
      id: "velvet",
      alt: "Portrait of a woman seated in a dim lounge with warm lamp light",
    },
    caption: "Velvet Nocturne · Mumbai, 2025",
    href: "/portfolio/velvet-nocturne",
  },
  {
    image: {
      id: "hero",
      alt: "A single hot air balloon above fog-filled valleys at blue hour",
    },
    caption: "Ascent into the Thermal Abyss · Cappadocia, 2025",
    href: "/portfolio/solitude-in-cappadocia",
  },
] as const;

export const ticker = [
  "Now booking · December 2026 to March 2027",
  "Based in Mumbai · Available worldwide",
  "Shortlisted · Northlight Emerging Award",
  "Featured in Atlas & Ember",
] as const;

export const press = [
  { name: "Atlas & Ember", kind: "Independent travel magazine" },
  { name: "Meridian Quarterly", kind: "Travel and culture quarterly" },
  { name: "Halcyon Journal", kind: "Design and architecture journal" },
  { name: "Verre", kind: "Online fashion zine" },
  { name: "Northlight Review", kind: "Photography criticism" },
  { name: "Cobalt Editions", kind: "Independent photobook press" },
] as const;

export const testimonial = {
  quote:
    "Arjun didn't just photograph our first collection; he gave the label a visual identity. His calm way with natural light made every piece look like it belonged in a museum.",
  name: "Neha Kulkarni",
  role: "Founder, Sarvani Atelier, Jaipur",
} as const;
