// DEMO CONTENT for the fictional photographer Arjun Mehta (a freelance photographer in Mumbai).
// The services, scope and prices are invented for this concept project.

import type { ProjectImage } from "~/data/projects";

export type Service = {
  id: string;
  title: string;
  tier: string; // "Tier 01 · Commercial focus"
  reach: string; // "India & abroad"
  summary: string;
  scope: string[]; // what a commission includes
  price: string; // "₹45,000 / $550"
  cta: string; // button label
  image: ProjectImage;
};

export const services: Service[] = [
  {
    id: "editorial-fashion",
    title: "Editorial & Fashion Campaigns",
    tier: "Tier 01 · Commercial focus",
    reach: "India & abroad",
    summary:
      "Visual stories for independent labels, lookbooks, seasonal launches and magazines that want a cinematic, editorial look.",
    scope: [
      "Creative brief, moodboard and lighting plan before the shoot",
      "One full shoot day, in studio or on location (extra days on request)",
      "25 retouched, high-resolution images in the final selection",
      "One-year commercial licence for web, social media, print and lookbooks",
    ],
    price: "₹45,000 / $550",
    cta: "Commission campaign",
    image: {
      id: "lookbook",
      alt: "Woman in a satin dress seated in a dark interior",
    },
  },
  {
    id: "portraiture-branding",
    title: "Portraits & Personal Branding",
    tier: "Tier 02 · Portraits",
    reach: "Studio or location",
    summary:
      "Honest, well-lit portraits with character for founders, artists, authors and professionals who want to be remembered.",
    scope: [
      "A short call before the shoot to agree styling and tone",
      "Two-hour session, in studio or on location in Mumbai",
      "10 retouched digital images plus a colour-graded set of selects",
      "Personal and professional use, including press and your website",
    ],
    price: "₹9,000 / $110",
    cta: "Book a session",
    image: {
      id: "portrait2",
      alt: "Black and white portrait of a person in a dark blazer resting a hand on their chin",
    },
  },
  {
    id: "architecture-spaces",
    title: "Architecture & Interiors",
    tier: "Tier 03 · Spaces",
    reach: "Interiors & exteriors",
    summary:
      "Clean, geometric photographs that show off light, volume and materials for architects, designers, hotels and developers.",
    scope: [
      "Golden-hour exterior and interior coverage",
      "Careful perspective control so verticals stay straight",
      "Half-day on-site shoot with detail shots",
      "18 retouched images with a portfolio and marketing licence",
    ],
    price: "₹25,000 / $300",
    cta: "Enquire about spaces",
    image: {
      id: "arch",
      alt: "A sunlit modern interior with large steel-framed windows",
    },
  },
  {
    id: "weddings-celebrations",
    title: "Weddings & Intimate Celebrations",
    tier: "Tier 04 · Documentary",
    reach: "Candid & documentary",
    summary:
      "Unposed, natural storytelling for couples who want to remember how the day felt, not just how it looked.",
    scope: [
      "Up to eight hours of documentary coverage by Arjun",
      "A second photographer available on request",
      "Private online gallery delivered within 7 days",
      "300+ edited photographs and an optional printed album",
    ],
    price: "₹1,20,000 / $1,450",
    cta: "Reserve a date",
    image: {
      id: "wedding",
      alt: "A couple in traditional wear walking along a lantern-lit lane at dusk",
    },
  },
];
