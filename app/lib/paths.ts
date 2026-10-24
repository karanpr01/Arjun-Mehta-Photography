// Every public page address, in one place. The sitemap and the pre-render list both use it,
// so a new page only has to be added here once.
// (Relative import on purpose: react-router.config.ts also reads this file.)
import { projects } from "../data/projects";

export const staticPaths = [
  "/",
  "/portfolio",
  "/services",
  "/about",
  "/contact",
  "/privacy",
];

export function allPaths(): string[] {
  return [
    ...staticPaths,
    ...projects.map((project) => `/portfolio/${project.slug}`),
  ];
}
