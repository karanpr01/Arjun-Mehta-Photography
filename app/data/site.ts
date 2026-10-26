// Everything here is DEMO CONTENT for a fictional photographer, "Arjun Mehta":
// a 28-year-old freelance photographer from Mumbai who takes commissions in India and abroad.
// He, his clients, publications and awards are invented for this concept project.

export const site = {
  name: "Arjun Mehta Photography",
  shortName: "Arjun Mehta",
  tagline: "Every frame tells a story. Let's tell yours.",
  role: "Freelance photographer · Mumbai",

  // The public web address. Set VITE_SITE_URL when you deploy; until then a fake example address is used.
  url: (
    (import.meta.env.VITE_SITE_URL as string | undefined) ??
    "https://example.com"
  ).replace(/\/$/, ""),
  // The picture shown when a link is shared on social media (made by `npm run og`).
  ogImage: "/og-default.jpg",
  description:
    "Arjun Mehta is a freelance photographer based in Mumbai, shooting editorial, portrait, architecture and wedding work across India and worldwide.",

  heroIntro:
    "Editorial, portrait and travel photography from Mumbai, for independent brands, publications and couples across India and abroad.",
  heroAlt: "A single hot air balloon above fog-filled valleys at blue hour",

  aboutQuote:
    "Light is not merely illumination; it is the ink with which we carve memory into permanence.",
  aboutBody:
    "Arjun is a 28-year-old freelance photographer from Mumbai. He picked up a camera in college, took his first paid commission at 22, and now shoots for independent labels, magazines and couples in India and overseas. His style pairs cinematic composition with unforced human warmth.",
  aboutAlt:
    "Arjun Mehta smiling as he inspects a film camera at a desk by a window",

  stats: [
    { value: 6, suffix: "+", label: "Years of practice" },
    { value: 150, suffix: "+", label: "Shoots delivered" },
    { value: 9, suffix: "", label: "Countries photographed" },
  ],

  pricingNote:
    "Starting prices are guides in Indian rupees (₹) and US dollars ($) for a typical commission. A tailored estimate follows a short call. Travel and extended licensing are quoted separately.",
  replyTime: "usually within 24 to 48 hours",

  // Demo contact details. The email uses the reserved ".example" domain, so it can never reach a
  // real person. No phone number is shown, because there is no safe fictional Indian number range.
  email: "hello@arjunmehta.example",
  location: "Mumbai, India · Available worldwide",

  studios: [
    {
      id: "mumbai",
      name: "Mumbai Studio",
      area: "Bandra West, Mumbai 400050",
      note: "Shared studio space · By appointment only",
      image: {
        id: "mumbai",
        alt: "A bright studio room overlooking the Mumbai skyline",
      },
    },
    {
      id: "remote",
      name: "On location & remote",
      area: "Across India and worldwide",
      note: "Travel quoted per project · Remote editing for overseas clients",
      image: {
        id: "desk",
        alt: "A photographer's editing desk with prints, film rolls and a monitor",
      },
    },
  ],

  // Add real profile links here if you create demo accounts. While this list is empty,
  // no social links are shown anywhere on the site.
  social: [] as { label: string; href: string }[],

  // The credit that shows this is a concept project (shown in the footer and on the About page).
  builtBy: {
    label: "Concept project designed and built by Prem",
    href: "" as string,
  },
};
