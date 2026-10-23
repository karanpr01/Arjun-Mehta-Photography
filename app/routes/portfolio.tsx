import { useSearchParams } from "react-router";
import type { Route } from "./+types/portfolio";
import { FilterBar } from "~/components/gallery/FilterBar";
import { ProjectCard } from "~/components/gallery/ProjectCard";
import { Container } from "~/components/ui/Container";
import {
  categories,
  categoryFromSlug,
  categorySlug,
  filterProjects,
  projects,
  type Category,
} from "~/data/projects";
import { useHydrated } from "~/hooks/useHydrated";

export function meta({ }: Route.MetaArgs) {
  return [{ title: "Portfolio | Arjun Mehta Photography" }];
}

// The editorial rhythm: a wide card, then tall cards. The pattern repeats for longer lists.
// (Full class names are written out so Tailwind can find them.)
const rhythm = [
  {
    cell: "md:col-span-2 lg:col-span-8",
    aspect: "landscape",
    sizes: "(min-width: 1440px) 864px, (min-width: 1024px) 66vw, 100vw",
  },
  {
    cell: "lg:col-span-4",
    aspect: "portrait",
    sizes: "(min-width: 1440px) 416px, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
  },
  {
    cell: "lg:col-span-4",
    aspect: "portrait",
    sizes: "(min-width: 1440px) 416px, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
  },
  {
    cell: "lg:col-span-4",
    aspect: "portrait",
    sizes: "(min-width: 1440px) 416px, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
  },
  {
    cell: "lg:col-span-4",
    aspect: "portrait",
    sizes: "(min-width: 1440px) 416px, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
  },
] as const;

export default function Portfolio() {
  const [searchParams, setSearchParams] = useSearchParams();

  // The server builds this page without knowing the visitor's URL query, so we only
  // apply the filter once the page is live in the browser. That keeps both versions identical.
  const hydrated = useHydrated();
  const active = hydrated ? categoryFromSlug(searchParams.get("category")) : null;

  const visible = filterProjects(projects, active);
  const counts = Object.fromEntries(
    categories.map((category) => [category, filterProjects(projects, category).length]),
  );

  function choose(category: Category | null) {
    setSearchParams(category ? { category: categorySlug(category) } : {}, {
      replace: true,
      preventScrollReset: true,
    });
  }

  return (
    <>
      <section aria-labelledby="portfolio-heading" className="pt-16 pb-10 md:pt-24">
        <Container>
          <p className="label-caps text-accent">Archive</p>
          <h1 id="portfolio-heading" className="mt-4 text-5xl tracking-[-0.03em] md:text-7xl">
            Selected Works
          </h1>
          <p className="text-muted mt-6 max-w-xl">A selection of recent projects.</p>
        </Container>
      </section>

      <section aria-label="Projects" className="pb-24 md:pb-32">
        <Container>
          <FilterBar
            categories={categories}
            active={active}
            counts={counts}
            total={projects.length}
            onChange={choose}
          />

          {/* role="status" makes screen readers announce the new count after each filter change. */}
          <p role="status" className="text-muted mt-6 mb-10 text-sm">
            {active
              ? `Showing ${visible.length} of ${projects.length} projects in ${active}.`
              : `Showing all ${projects.length} projects.`}
          </p>

          {visible.length === 0 ? (
            <div className="border-line border p-10 text-center">
              <p className="font-serif text-3xl">No projects here yet.</p>
              <button
                type="button"
                onClick={() => choose(null)}
                className="label-caps hover:text-accent mt-6 underline underline-offset-8"
              >
                Show all works
              </button>
            </div>
          ) : (
            <div className="grid items-start gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-12">
              {visible.map((project, index) => {
                const slot = rhythm[index % rhythm.length];
                return (
                  <div key={project.slug} className={slot.cell}>
                    <ProjectCard project={project} aspect={slot.aspect} sizes={slot.sizes} />
                  </div>
                );
              })}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}