// DEMO CONTENT for the fictional photographer Arjun Mehta.
// Clients, publications, awards and places in the credits are invented for this concept project.
// Images are referenced by `id`: the file assets/images-src/<id>.jpg (see `npm run images`).

export const categories = [
  "Editorial & Fashion",
  "Portraiture & Branding",
  "Documentary & Fine Art",
  "Architecture",
] as const;

export type Category = (typeof categories)[number];

export type ProjectImage = {
  id: string;
  alt: string;
  plate?: string; // "02"
  title?: string; // "Macro geological strata"
  time?: string; // "06:28 AM · Golden Hour Edge"
  note?: string; // a sentence about this photograph
  kit?: string; // camera and settings
};

export type ProjectStory = {
  titleLead: string; // "Solitude in Cappadocia:"
  titleEmphasis: string; // "The Geometry of Wind & Tuff"
  badge: string;
  intro: {
    title: string;
    emphasis: string;
    kicker: string;
    paragraphs: string[];
  };
  pullQuote: { text: string; by: string };
  fieldNotes: {
    label: string;
    title: string;
    text: string;
    footnote: string;
  }[];
  testimonial: { text: string; by: string };
  edition: { title: string; text: string; total: number; claimed: number };
};

export type Project = {
  slug: string;
  title: string;
  category: Category;
  location: string;
  year: string;
  plate?: string; // plate number in the portfolio, "01"
  descriptor: string; // one line under the title
  summary: string;
  badge?: string; // award or nomination shown on the card
  facts: { label: string; value: string }[];
  image: ProjectImage; // the main photo
  gallery?: ProjectImage[]; // extra photos for the story page
  story?: ProjectStory; // the long-form essay (only some projects have one)
  featured?: boolean; // shown on the Home page
};

export const projects: Project[] = [
  {
    slug: "solitude-in-cappadocia",
    title: "Solitude in Cappadocia",
    category: "Documentary & Fine Art",
    location: "Göreme, Türkiye",
    year: "2024",
    plate: "01",
    descriptor: "Self-initiated travel series · Numbered print edition",
    summary:
      "A self-funded solo trip to Cappadocia, photographed across eleven dawns and released as a numbered edition of fine-art prints.",
    badge: "Northlight Emerging Award · Shortlist",
    facts: [
      {
        label: "Client",
        value: "Self-initiated · Sold as a numbered print edition",
      },
      {
        label: "Period & light",
        value: "Late autumn 2024 · Pre-dawn blue hour",
      },
      { label: "Coordinates", value: "Göreme–Love Valley, Anatolia (38.64°N)" },
      { label: "Instrumentation", value: "Sony A7 IV · Fujifilm X100VI" },
    ],
    image: {
      id: "solitude",
      alt: "A lone figure walking a road through the rock formations of Cappadocia at dusk",
    },
    gallery: [
      {
        id: "hero",
        alt: "A single hot air balloon above fog-filled valleys at blue hour",
        plate: "01",
        title: "Ascent into the Thermal Abyss",
        time: "03:12 AM",
        note: "A single balloon lifts out of the fog before the first burners ignite.",
        kit: "Sony A7 IV · 24mm f/1.4 · ISO 100 · f/5.6 · 1/125s",
      },
      {
        id: "rock",
        alt: "Black and white macro of layered volcanic rock strata",
        plate: "02",
        title: "Macro geological strata",
        time: "Shot on Ilford HP5+, pushed one stop",
        note: "Tectonic striations in the ignimbrite mantle of Devrent Valley. The layers record prehistoric pyroclastic flows.",
        kit: "Sony A7 IV · 50mm f/1.2 · f/8 · 1/60s · Handheld",
      },
      {
        id: "horse",
        alt: "A horse galloping through dust in golden light among rock towers",
        plate: "03",
        title: "Yılkı in flight",
        time: "06:28 AM · Golden hour edge",
        note: "Untamed Yılkı horses descend toward the aquifers of the southern escarpment, backlit pumice hanging in the wake of the herd.",
        kit: "Sony A7 IV · 85mm f/1.4 · f/2.8 · 1/3200s · ISO 200",
      },
      {
        id: "oldman",
        alt: "Portrait of an elderly man in a woollen cap inside a cave dwelling",
        plate: "04",
        title: "Guardian of Ortahisar",
        time: "Cave citadel archive",
        note: "Malik's family has kept the carved cellars beneath Ortahisar for four recorded generations. Photographed using only the light from the courtyard facade.",
        kit: "Fujifilm X100VI · 23mm f/2 · ISO 100 · 1/90s",
      },
      {
        id: "valley",
        alt: "Pink dawn light over the eroded valleys of Love Valley",
        plate: "05",
        title: "Rose hue horizon",
        time: "Alpenglow window",
        note: "Ten minutes after sunrise the sun filters through the air into a mineral rose, while the valley below stays in deep ultramarine shadow.",
        kit: "Sony A7 IV · 85mm f/1.4 · ISO 100 · f/8 · 1/350s",
      },
    ],
    story: {
      titleLead: "Solitude in Cappadocia:",
      titleEmphasis: "The Geometry of Wind & Tuff",
      badge: "Dual field study",
      intro: {
        title: "Excavating Silence from",
        emphasis: "Calcified Strata",
        kicker: "Recorded across 11 dawns · 1,200 m elevation",
        paragraphs: [
          "Cappadocia lives in the public imagination as a tapestry of crowded balloons and staged sunsets. I went on my own money and my own time to look at something different: the volcanic tuff spires as geological monuments, carved by two million years of wind.",
          "I was out by 04:30 every morning, when the air hovered around −2°C. In the freezing blue hour before the burners ignited, the old cave dwellings held a tomb-like stillness.",
          "Light in Anatolia has an unsparing chalkiness. Rather than lean on post-production warmth, I let the tension come from quiet chiaroscuro: stone and shadow against the fleeting light of dawn.",
        ],
      },
      pullQuote: {
        text: "Arjun's eye avoids postcard symmetry, preferring the uneven grain of volcanic tuff against the brief light of dawn.",
        by: "Meera Iyer, critic, Northlight Review",
      },
      fieldNotes: [
        {
          label: "01 // Mechanical",
          title: "Abrasive Pumice Dust",
          text: "The high Anatolian wind pushes fine tuff grains into every crevice. Changing lenses meant crouching inside a rain poncho to keep the sensor clean.",
          footnote: "Factor: −2°C at 05:00 · Relative dust index 88",
        },
        {
          label: "02 // Colour science",
          title: "Zero Artificial Saturation",
          text: "Travel media paints the region in synthetic orange gradients. My rule was neutrality: honest tone, no artificial saturation.",
          footnote: "Profile: custom linear curve · D65 calibrated monitor",
        },
        {
          label: "03 // Compositional rhythm",
          title: "The 50mm Constraint",
          text: "More than 70% of the series was shot on a single 50mm prime. Restraint gives honest spatial compression.",
          footnote: "Optic: 50mm f/1.2 prime",
        },
      ],
      testimonial: {
        text: "Arjun brought Cappadocia back not as a postcard but as something ancient and alive. The first print edition sold out within a week of release.",
        by: "Ira Kapoor · Editor, Atlas & Ember",
      },
      edition: {
        title: "Limited Monograph Prints",
        text: "An edition of 10 fine-art pigment prints, hand-signed and numbered, shipped framed or unframed across India and worldwide.",
        total: 10,
        claimed: 7,
      },
    },
    featured: true,
  },
  {
    slug: "midnight-at-the-fort",
    title: "Midnight at the Fort",
    category: "Editorial & Fashion",
    location: "Fort, Mumbai",
    year: "2024",
    plate: "02",
    descriptor: "Independent label editorial · Verlaine Studio",
    summary:
      "A midnight editorial for an independent label, staged in the stone colonnades of South Mumbai's heritage Fort district, lit by street lamps and a single handheld light.",
    facts: [
      { label: "Client", value: "Verlaine Studio (independent label)" },
      { label: "Period & light", value: "February 2024 · After midnight" },
      { label: "Location", value: "Fort district, South Mumbai" },
      { label: "Instrumentation", value: "Sony A7 IV · 50mm f/1.2" },
    ],
    image: {
      id: "fort",
      alt: "Model in a sculptural grey ruffled gown in a stone colonnade at night",
    },
  },
  {
    slug: "varanasi-ghats-at-dawn",
    title: "Varanasi Ghats at Dawn",
    category: "Portraiture & Branding",
    location: "Varanasi, India",
    year: "2023",
    plate: "03",
    descriptor: "Humanist portrait series · Published in Atlas & Ember",
    summary:
      "Portraits of the boatmen and priests who start their day on the ghats before sunrise, made in monsoon rain with only the light the river allows.",
    badge: "Northlight Award · Honourable mention",
    facts: [
      { label: "Client", value: "Atlas & Ember (independent travel magazine)" },
      {
        label: "Period & light",
        value: "Monsoon 2023 · Pre-dawn and overcast",
      },
      { label: "Location", value: "Assi to Dashashwamedh Ghat, Varanasi" },
      { label: "Instrumentation", value: "Sony A7 IV · 35mm f/1.4" },
    ],
    image: {
      id: "ghats",
      alt: "Weathered boatman gripping oars on the ghats of Varanasi in monsoon rain",
    },
  },
  {
    slug: "monolithic-shadows",
    title: "Monolithic Shadows",
    category: "Architecture",
    location: "Chandigarh, India",
    year: "2024",
    plate: "04",
    descriptor: "Brutalist form study · Self-initiated",
    summary:
      "A study of concrete as sculpture in Chandigarh: repeating forms, hard shadow and flat monsoon-season light across the city's modernist buildings.",
    facts: [
      {
        label: "Client",
        value: "Self-initiated · Featured by Halcyon Journal",
      },
      { label: "Period & light", value: "August 2024 · Flat monsoon overcast" },
      { label: "Location", value: "Chandigarh, India" },
      { label: "Instrumentation", value: "Fujifilm X-T5 · 16mm f/1.4" },
    ],
    image: {
      id: "monolith",
      alt: "Brutalist concrete architecture under an overcast sky",
    },
  },
  {
    slug: "the-ceramicists-hands",
    title: "The Ceramicist's Hands",
    category: "Portraiture & Branding",
    location: "Jaipur, India",
    year: "2023",
    plate: "05",
    descriptor: "Artisan brand campaign · Neel Pottery Studio",
    summary:
      "A brand campaign built around hands, clay and window light for a family-run blue pottery studio that has worked the same wheel for four generations.",
    facts: [
      { label: "Client", value: "Neel Pottery Studio, Jaipur" },
      { label: "Period & light", value: "October 2023 · North window light" },
      { label: "Location", value: "Jaipur, India" },
      { label: "Instrumentation", value: "Sony A7 IV · 50mm f/1.2" },
    ],
    image: {
      id: "ceramic",
      alt: "A potter shaping clay on a wheel in warm window light",
    },
  },
  {
    slug: "subterranean-mirage",
    title: "Subterranean Mirage",
    category: "Editorial & Fashion",
    location: "Mumbai",
    year: "2024",
    plate: "06",
    descriptor: "Experimental lighting editorial · Verre online zine",
    summary:
      "An editorial made in a disused underpass in Mumbai, lit with a single moving coloured light so the garment changes material as the model walks.",
    badge: "Cobalt Ribbon · Nominee",
    facts: [
      { label: "Client", value: "Verre (online fashion zine)" },
      {
        label: "Period & light",
        value: "May 2024 · Practical and gelled light only",
      },
      { label: "Location", value: "Disused underpass, Mumbai" },
      { label: "Instrumentation", value: "Sony A7 IV · 35mm f/1.4" },
    ],
    image: {
      id: "subterr",
      alt: "Model in an iridescent coat inside a blue-lit tunnel",
    },
  },
  {
    slug: "spiti-solace",
    title: "Spiti Solace",
    category: "Documentary & Fine Art",
    location: "Spiti Valley, India",
    year: "2024",
    plate: "07",
    descriptor: "Winter journey · Published in Meridian Quarterly",
    summary:
      "A winter journey through Spiti Valley, looking for the quiet between weather: small settlements, dark rock and mountains that appear and vanish in minutes.",
    facts: [
      {
        label: "Client",
        value: "Meridian Quarterly (independent travel magazine)",
      },
      {
        label: "Period & light",
        value: "February 2024 · Blue hour, long exposures",
      },
      { label: "Location", value: "Spiti Valley, Himachal Pradesh" },
      { label: "Instrumentation", value: "Sony A7 IV · 24-70mm f/2.8" },
    ],
    image: {
      id: "spiti",
      alt: "A small mountain settlement in snowy Spiti Valley at blue hour",
    },
  },
  {
    slug: "aura-of-silk-and-stone",
    title: "Aura of Silk & Stone",
    category: "Editorial & Fashion",
    location: "Rajasthan, India",
    year: "2024",
    descriptor: "Collection campaign · Sarvani Atelier",
    summary:
      "Handwoven silk and gold embroidery photographed in carved sandstone halls, for a small Jaipur label celebrating its first collection.",
    facts: [
      { label: "Client", value: "Sarvani Atelier, Jaipur" },
      {
        label: "Period & light",
        value: "Winter 2024 · Late-afternoon window light",
      },
      { label: "Location", value: "Sandstone palace halls, Rajasthan" },
      { label: "Instrumentation", value: "Sony A7 IV · 85mm f/1.4" },
    ],
    image: {
      id: "aura",
      alt: "Woman in a gold embroidered saree standing in a carved stone hall",
    },
    featured: true,
  },
  {
    slug: "echoes-of-the-monsoon",
    title: "Echoes of the Monsoon",
    category: "Documentary & Fine Art",
    location: "Varanasi, India",
    year: "2023–2024",
    descriptor: "Personal monograph",
    summary:
      "A two-year personal project along the Ganges, following daily rituals through two monsoon seasons.",
    facts: [
      { label: "Client", value: "Personal work" },
      { label: "Period & light", value: "Two monsoon seasons, 2023 and 2024" },
      { label: "Location", value: "Varanasi, India" },
      { label: "Instrumentation", value: "Sony A7 IV · 35mm f/1.4" },
    ],
    image: {
      id: "ghats",
      alt: "Weathered boatman gripping oars on the ghats of Varanasi in monsoon rain",
    },
    featured: true,
  },
  {
    slug: "velvet-nocturne",
    title: "Velvet Nocturne",
    category: "Portraiture & Branding",
    location: "Mumbai",
    year: "2024",
    descriptor: "Portrait series · Cobalt Editions",
    summary:
      "An intimate portrait series about solitude and quiet confidence, made late at night in a Mumbai hotel lounge with a single warm lamp for light.",
    facts: [
      {
        label: "Client",
        value: "Cobalt Editions (independent photobook press)",
      },
      { label: "Period & light", value: "Autumn 2024 · Practical lamp light" },
      { label: "Location", value: "Hotel lounge, South Mumbai" },
      { label: "Instrumentation", value: "Sony A7 IV · 85mm f/1.4" },
    ],
    image: {
      id: "velvet",
      alt: "Portrait of a woman seated in a dim lounge with warm lamp light",
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
