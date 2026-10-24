// This page must describe what the site REALLY does. If the site changes (for example,
// analytics or a different form service is added), update this file in the same change.
// It is a DRAFT: have it reviewed before the site is used for a real business.

import { site } from "~/data/site";

export type PrivacySection = {
  id: string;
  title: string;
  paragraphs: string[];
  list?: string[];
  link?: { label: string; href: string };
};

export const privacySections: PrivacySection[] = [
  {
    id: "who-we-are",
    title: "Who runs this site",
    paragraphs: [
      "[PLACEHOLDER: the photographer's or business's legal name, address and contact email.]",
    ],
  },
  {
    id: "what-we-collect",
    title: "What this site collects",
    paragraphs: [
      "The only personal information this site collects is what you choose to type into the enquiry form on the Contact page. The form asks for:",
    ],
    list: [
      "Your name",
      "Your email address",
      "Your phone number (optional)",
      "The type of project and your preferred timeframe",
      "A message describing your project",
      "Where you found this site (optional)",
    ],
  },
  {
    id: "how-enquiries-are-handled",
    title: "How enquiries are handled",
    paragraphs: [
      "When you send the form, your details are passed to Formspree, a form service that emails them to us. We use them only to reply to your enquiry.",
      "Formspree is a separate company with its own privacy policy and its own rules for how long it keeps submissions.",
      "[PLACEHOLDER: how long enquiries are kept by us, and how to ask for them to be deleted.]",
    ],
    link: {
      label: "Read Formspree's privacy policy",
      href: "https://formspree.io/legal/privacy-policy",
    },
  },
  {
    id: "cookies",
    title: "Cookies and local storage",
    paragraphs: [
      "This site does not set cookies, and it does not use analytics, advertising or tracking tools.",
      'It saves one small item in your browser\'s local storage, called "theme", to remember whether you chose the light or dark theme. It stays on your device and is never sent to us.',
    ],
  },
  {
    id: "fonts-images-links",
    title: "Fonts, images and links",
    paragraphs: [
      "The fonts and images on this site are served from the site itself, so your browser does not contact font or image services when you visit.",
      "Links to social networks and other websites take you away from this site. Those sites have their own privacy practices.",
    ],
  },
  {
    id: "hosting",
    title: "Hosting",
    paragraphs: [
      "This site is hosted by [PLACEHOLDER: hosting provider]. Like most web hosts, the provider may keep standard server logs, such as IP addresses and request times, for security and operations.",
    ],
  },
  {
    id: "your-rights",
    title: "Your rights",
    paragraphs: [
      "[PLACEHOLDER: the rights that apply to visitors, such as asking to see, correct or delete their information, and how to make a request. This depends on where the photographer and the visitors are based, and needs professional review.]",
    ],
  },
  {
    id: "changes",
    title: "Changes to this page",
    paragraphs: [
      "If the way this site works changes, this page will be updated.",
      "Last reviewed: [PLACEHOLDER: date].",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    paragraphs: [`Questions about privacy can be sent to ${site.email}.`],
  },
];
