// Central place for brand facts. Anything marked PLACEHOLDER is NOT real:
// replace it with the photographer's real details before publishing.
export const site = {
  name: "Arjun Mehta Photography",
  shortName: "Arjun Mehta",
  tagline: "Every frame tells a story. Let's tell yours.",
  description:
    "Cinematic, editorial photography for people and brands. PLACEHOLDER description, to be rewritten on Day 5.",

  // PLACEHOLDER: example.com is a reserved fake domain, so this email can never reach a real person.
  // SAMPLE COPY from the design mock-up. Confirm or rewrite with the photographer.
  role: "Visual storyteller & director",
  heroIntro:
    "Editorial, portrait and brand photography, made with a cinematic eye for light and atmosphere.",
  // Describe what is really in the hero photograph once the final image is chosen.
  heroAlt: "Sample hero photograph. Describe the real image here.",
  email: "hello@example.com",
  // PLACEHOLDER
  location: "[PLACEHOLDER: city / service area]",

  // PLACEHOLDER: these point at the networks' home pages, not at real profiles.
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Behance", href: "https://www.behance.net/" },
  ],
} as const;
