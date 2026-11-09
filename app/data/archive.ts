// DEMO CONTENT: earlier work from the archive index on the Portfolio page.
// These entries have no pages of their own. Clients and titles are invented for this concept project.
// `image` is one of the photos already used elsewhere on the site, shown as a hover preview.

export type ArchiveEntry = {
  no: string;
  title: string;
  category: string;
  client: string;
  year: string;
  image: string;
};

export const archive: ArchiveEntry[] = [
  {
    no: "10",
    title: "Salt Flats at Blue Hour",
    category: "Documentary & Fine Art",
    client: "Self-initiated",
    year: "2024",
    image: "spiti",
  },
  {
    no: "11",
    title: "The Lantern Procession",
    category: "Editorial & Fashion",
    client: "Verlaine Studio",
    year: "2024",
    image: "fort",
  },
  {
    no: "12",
    title: "Mineral Silence",
    category: "Documentary & Fine Art",
    client: "Private collection",
    year: "2023",
    image: "rock",
  },
  {
    no: "13",
    title: "Atelier Light, Vol. II",
    category: "Portraiture & Branding",
    client: "Neel Pottery Studio",
    year: "2023",
    image: "ceramic",
  },
  {
    no: "14",
    title: "Concrete Hymn",
    category: "Architecture",
    client: "Halcyon Journal",
    year: "2023",
    image: "monolith",
  },
  {
    no: "15",
    title: "Sandstone Dynasty",
    category: "Editorial & Fashion",
    client: "Sarvani Atelier",
    year: "2022",
    image: "aura",
  },
  {
    no: "16",
    title: "The Quiet Fleet",
    category: "Documentary & Fine Art",
    client: "Atlas & Ember",
    year: "2022",
    image: "ghats",
  },
  {
    no: "17",
    title: "Garden of Glass",
    category: "Architecture",
    client: "Independent architecture studio, Mumbai",
    year: "2021",
    image: "arch",
  },
];
