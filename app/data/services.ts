// SAMPLE CONTENT: the four service names come from the design mock-up.
// Do not advertise anything the photographer does not really offer.
// Every PLACEHOLDER below must be replaced with confirmed details before publishing.

export type Service = {
  id: string;
  title: string;
  summary: string;
  audience: string;
  includes: string[];
  deliverables: string[];
  startingFrom: string;
};

export const services: Service[] = [
  {
    id: "editorial-fashion",
    title: "Editorial & Fashion Campaigns",
    summary: "[PLACEHOLDER: what this service is.]",
    audience: "[PLACEHOLDER: who it is for.]",
    includes: ["[PLACEHOLDER: what is included]"],
    deliverables: ["[PLACEHOLDER: typical deliverables]"],
    startingFrom: "[PLACEHOLDER: starting price, or 'On request']",
  },
  {
    id: "portraiture-branding",
    title: "Bespoke Portraiture & Personal Branding",
    summary: "[PLACEHOLDER: what this service is.]",
    audience: "[PLACEHOLDER: who it is for.]",
    includes: ["[PLACEHOLDER: what is included]"],
    deliverables: ["[PLACEHOLDER: typical deliverables]"],
    startingFrom: "[PLACEHOLDER: starting price, or 'On request']",
  },
  {
    id: "architecture-spaces",
    title: "Architecture & Spatial Storytelling",
    summary: "[PLACEHOLDER: what this service is.]",
    audience: "[PLACEHOLDER: who it is for.]",
    includes: ["[PLACEHOLDER: what is included]"],
    deliverables: ["[PLACEHOLDER: typical deliverables]"],
    startingFrom: "[PLACEHOLDER: starting price, or 'On request']",
  },
  {
    id: "weddings-celebrations",
    title: "Fine Art Weddings & Intimate Celebrations",
    summary: "[PLACEHOLDER: what this service is.]",
    audience: "[PLACEHOLDER: who it is for.]",
    includes: ["[PLACEHOLDER: what is included]"],
    deliverables: ["[PLACEHOLDER: typical deliverables]"],
    startingFrom: "[PLACEHOLDER: starting price, or 'On request']",
  },
];