// This page must describe what the site REALLY does. If the site changes (for example,
// analytics or a different form service is added), update this file in the same change.

import { site } from "~/data/site";

export type PrivacySection = {
  id: string;
  title: string;
  paragraphs: string[];
  list?: string[];
  link?: { label: string; href: string };
  table?: { head: string[]; rows: string[][] };
};

export const lastReviewed = "25 October 2026";

// A short, checkable summary shown beside the full policy.
export const privacySummary = [
  "This site sets no cookies.",
  "There is no analytics, advertising or tracking.",
  "Fonts and images are served from the site itself.",
  "Enquiries go to Formspree and reach one person.",
];

export const privacySections: PrivacySection[] = [
  {
    id: "who-we-are",
    title: "Who runs this site",
    paragraphs: [
      `This website is a concept project. ${site.shortName} is a fictional photographer, invented to show what a professional photography website can look like.`,
      `The site was designed and built by ${site.builtBy.name}, who also receives any message sent through the enquiry form.`,
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
      "Your phone number or WhatsApp (optional)",
      "Your brand, label or publication (optional)",
      "The type of project, your preferred timeframe and a budget range",
      "The city or venue of the shoot (optional)",
      "A message describing your project",
      "A link to a moodboard or reference images (optional)",
      "Where you found this site (optional)",
    ],
  },
  {
    id: "how-enquiries-are-handled",
    title: "How enquiries are handled",
    paragraphs: [
      "When you send the form, your details are passed to Formspree, a form service that emails them to the site's developer. They are used only to reply to your message.",
      "Formspree is a separate company with its own privacy policy and its own rules for how long it keeps submissions.",
      "Messages are kept only as long as needed to reply, and are deleted on request.",
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
      "Links to other websites take you away from this site. Those sites have their own privacy practices.",
    ],
  },
  {
    id: "hosting",
    title: "Hosting",
    paragraphs: [
      "This site is hosted by Vercel. Like most web hosts, the provider may keep standard server logs, such as IP addresses and request times, for security and operations.",
    ],
  },
  {
    id: "services-used",
    title: "Services this site relies on",
    paragraphs: [
      "Only two outside services touch this site, and only for the jobs listed here.",
    ],
    table: {
      head: ["Provider", "What it does here", "What it receives"],
      rows: [
        [
          "Formspree",
          "Delivers the enquiry form to the developer's inbox",
          "The details typed into the form",
        ],
        [
          "Vercel",
          "Hosts and delivers the website's files",
          "Standard request logs, such as IP address and time",
        ],
      ],
    },
  },
  {
    id: "your-rights",
    title: "Your rights",
    paragraphs: [
      `You can ask to see, correct or delete any personal information you sent through the enquiry form. Email ${site.email} and the request will be handled as soon as possible.`,
    ],
  },
  {
    id: "changes",
    title: "Changes to this page",
    paragraphs: [
      "If the way this site works changes, this page will be updated.",
      `Last reviewed: ${lastReviewed}.`,
    ],
  },
  {
    id: "contact",
    title: "Contact",
    paragraphs: [`Questions about privacy can be sent to ${site.email}.`],
  },
];
