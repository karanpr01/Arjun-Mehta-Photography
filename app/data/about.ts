// SAMPLE CONTENT: the three pillar names come from the design mock-up.
// Every PLACEHOLDER must be replaced with confirmed information from the photographer.

export type Recognition = { year: string; title: string; detail: string };

export const about = {
  bio: [
    "[PLACEHOLDER: a short biography. Where the photographer is from, how they started and what they focus on.]",
    "[PLACEHOLDER: the photographer's creative approach, in two or three sentences.]",
  ],

  pillars: [
    {
      title: "The Dignity of Natural Light",
      description: "[PLACEHOLDER: describe this part of the working style.]",
    },
    {
      title: "Unrushed Intimacy",
      description: "[PLACEHOLDER: describe this part of the working style.]",
    },
    {
      title: "Archival Longevity",
      description: "[PLACEHOLDER: describe this part of the working style.]",
    },
  ],

  // Leave this list EMPTY until the photographer provides VERIFIED awards, exhibitions or
  // publications. While it is empty, the section is not shown on the page at all.
    recognition: [
     { year: "2000", title: "Test entry", detail: "Temporary test, remove me." },
   ] as Recognition[],

  serviceArea:
    "[PLACEHOLDER: where the photographer works and travels. Only include what is accurate.]",
};
