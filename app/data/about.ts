// DEMO CONTENT for the fictional photographer Arjun Mehta (28, a freelance photographer in Mumbai).
// Everything here is invented for this concept project.

export type Recognition = { year: string; title: string; detail: string };

export const about = {
  headline: { lead: "Quiet truth,", emphasis: "raw grace." },

  bio: [
    "I'm Arjun, a freelance photographer based in Mumbai. I picked up my first camera in 2016, a second-hand DSLR bought with pocket money, and spent my college years photographing the city's lanes, local trains and monsoon light.",
    "My first paid commission came in 2020: a lookbook for a friend's small clothing label. Since 2022 I have worked full-time as a freelancer, shooting editorial, portraits, architecture and weddings for independent brands, magazines and couples in India and abroad.",
    "I work alone or with a small trusted team, which means you deal directly with me, from the first call to the final gallery. I travel for projects, and I edit remotely for clients overseas.",
  ],

  pillars: [
    {
      title: "The Dignity of Natural Light",
      description:
        "I use available light wherever I can and shape it gently when I can't. Honest light keeps skin, fabric and stone looking like themselves.",
    },
    {
      title: "Unrushed Intimacy",
      description:
        "People relax when they are not being hurried. I slow down, talk, and wait for the frame that feels true rather than posed.",
    },
    {
      title: "Archival Longevity",
      description:
        "Every image is colour-managed, backed up in three places and delivered in formats that will still open in twenty years.",
    },
  ],

  journey: [
    {
      year: "2016",
      title: "First camera",
      text: "A second-hand DSLR and a lot of early local-train mornings in Mumbai.",
    },
    {
      year: "2020",
      title: "First paid commission",
      text: "A lookbook for a friend's small clothing label.",
    },
    {
      year: "2022",
      title: "Going full-time",
      text: "Left a design-studio job to freelance, shooting editorials and weddings.",
    },
    {
      year: "2024",
      title: "Varanasi",
      text: "A self-funded monsoon series that became my first magazine feature.",
    },
    {
      year: "2025",
      title: "Cappadocia and Spiti",
      text: "Two solo trips, a numbered print edition and an award shortlist.",
    },
  ],

  fieldNote: {
    title: "The space between breaths",
    quote:
      "When you stand beside the Ganges at 05:30 in the morning, the city has not woken up yet. That quiet is what I try to bring back in a photograph.",
    place: "Varanasi · 25.3°N · Sony A7 IV",
  },

  kit: [
    {
      title: "Cameras",
      items: [
        "Sony A7 IV · main full-frame body",
        "Fujifilm X100VI · compact for travel and street",
        "Fujifilm X-T5 · architecture and detail work",
      ],
    },
    {
      title: "Lenses",
      items: [
        "24mm f/1.4 · wide, interiors and landscape",
        "35mm f/1.4 · documentary and travel",
        "50mm f/1.2 · portraits and details",
        "85mm f/1.4 · portraits and fashion",
      ],
    },
    {
      title: "Light, support and film",
      items: [
        "Two battery-powered strobes with modifiers",
        "Carbon-fibre travel tripod",
        "Colour-calibrated 27-inch editing monitor",
        "Ilford HP5+ and Kodak Portra 400 film for personal work",
      ],
    },
  ],

  // Honours are all invented for this concept project.
  recognition: [
    {
      year: "2025",
      title: "Northlight Emerging Award",
      detail: "Shortlist, Fine Art · for Solitude in Cappadocia",
    },
    {
      year: "2025",
      title: "Cobalt Ribbon",
      detail: "Nominee, Editorial · for Subterranean Mirage",
    },
    {
      year: "2025",
      title: "Halcyon Journal",
      detail:
        "Featured photographer, the Concrete issue · for Monolithic Shadows",
    },
    {
      year: "2024",
      title: "Northlight Awards",
      detail:
        "Honourable mention, Documentary Portraiture · for Varanasi Ghats at Dawn",
    },
  ] as Recognition[],

  availability: [
    {
      quarter: "Q1 2027",
      months: "Jan to Mar",
      status: "Limited",
      note: "Wedding season · Rajasthan and Mumbai",
    },
    {
      quarter: "Q2 2027",
      months: "Apr to Jun",
      status: "Open",
      note: "Himalayan travel series · commissions welcome",
    },
    {
      quarter: "Q3 2027",
      months: "Jul to Sep",
      status: "Limited",
      note: "Monsoon personal project · select commissions",
    },
    {
      quarter: "Q4 2027",
      months: "Oct to Dec",
      status: "Open",
      note: "Available to travel, in India and abroad",
    },
  ],

  serviceArea:
    "Based in Mumbai and available across India. I also travel abroad for commissions and weddings (travel is quoted per project), and I edit remotely for overseas clients, with everything delivered online.",
};
