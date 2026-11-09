// Searches the portfolio and the archive of earlier work. Used by the 404 page.
// (Relative imports on purpose, so this file can be tested without the app's "~/" shortcut.)
import { archive } from "../data/archive";
import { projects } from "../data/projects";

export type SearchHit = { title: string; meta: string; href?: string };

// Every word you type must appear somewhere in the title, place, year, category or client.
export function searchWork(query: string, limit = 6): SearchHit[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];

  const matches = (text: string) =>
    words.every((word) => text.toLowerCase().includes(word));

  const fromProjects: SearchHit[] = projects
    .filter((project) =>
      matches(
        [
          project.title,
          project.location,
          project.year,
          project.category,
          project.descriptor,
        ].join(" "),
      ),
    )
    .map((project) => ({
      title: project.title,
      meta: `${project.category} · ${project.location}, ${project.year}`,
      href: `/portfolio/${project.slug}`,
    }));

  const fromArchive: SearchHit[] = archive
    .filter((entry) =>
      matches(
        [entry.title, entry.category, entry.client, entry.year].join(" "),
      ),
    )
    .map((entry) => ({
      title: entry.title,
      meta: `Archive · ${entry.category} · ${entry.client}, ${entry.year}`,
    }));

  return [...fromProjects, ...fromArchive].slice(0, limit);
}
