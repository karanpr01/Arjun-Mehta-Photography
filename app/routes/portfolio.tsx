import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import type { Route } from "./+types/portfolio";
import { ArchiveIndex } from "~/components/gallery/ArchiveIndex";
import { FilterBar } from "~/components/gallery/FilterBar";
import { LayoutSwitch, layoutFromParam, type Layout } from "~/components/gallery/LayoutSwitch";
import { ProjectCard } from "~/components/gallery/ProjectCard";
import { ResponsiveImage } from "~/components/gallery/ResponsiveImage";
import { CtaBanner } from "~/components/sections/CtaBanner";
import { Container } from "~/components/ui/Container";
import { archive } from "~/data/archive";
import {
  categories,
  categoryFromSlug,
  categorySlug,
  filterProjects,
  projects,
  type Category,
  type Project,
} from "~/data/projects";
import { useHydrated } from "~/hooks/useHydrated";
import { pageMeta } from "~/lib/seo";

export function meta({ }: Route.MetaArgs) {
  return pageMeta({
    title: "Portfolio",
    description:
      "Selected photography projects by Arjun Mehta, filterable by category and layout, with an archive of earlier work.",
    path: "/portfolio",
  });
}

// The editorial rhythm: a wide card, then tall cards. The pattern repeats for longer lists.
// (Full class names are written out so Tailwind can find them.)
const tall = "(min-width: 1440px) 416px, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw";
const rhythm = [
  {
    cell: "md:col-span-2 lg:col-span-8",
    aspect: "landscape",
    sizes: "(min-width: 1440px) 864px, (min-width: 1024px) 66vw, 100vw",
  },
  { cell: "lg:col-span-4", aspect: "portrait", sizes: tall },
  { cell: "lg:col-span-4", aspect: "portrait", sizes: tall },
  { cell: "lg:col-span-4", aspect: "portrait", sizes: tall },
  { cell: "lg:col-span-4", aspect: "portrait", sizes: tall },
] as const;

// One small tile of the "contact sheet" layout: black and white until you point at it.
function SheetTile({ project }: { project: Project }) {
  return (
    <li>
      <Link to={`/portfolio/${project.slug}`} className="group block">
        <div className="bg-surface aspect-3/2 overflow-hidden">
          <ResponsiveImage
            id={project.image.id}
            alt={project.image.alt}
            sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
            className="h-full w-full object-cover grayscale motion-safe:transition-[filter] motion-safe:duration-500 group-hover:grayscale-0 group-focus-visible:grayscale-0"
          />
        </div>
        <p className="label-caps text-muted mt-2">
          {project.plate ? `${project.plate} · ` : ""}
          {project.title}
        </p>
      </Link>
    </li>
  );
}

export default function Portfolio() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [archiveOpen, setArchiveOpen] = useState(false);

  // The server builds this page without knowing the visitor's URL query, so we only
  // apply the filter and layout once the page is live in the browser. That keeps both versions identical.
  const hydrated = useHydrated();
  const active = hydrated ? categoryFromSlug(searchParams.get("category")) : null;
  const layout: Layout = hydrated ? layoutFromParam(searchParams.get("layout")) : "asym";

  const filtered = filterProjects(projects, active);
  const banner = filtered.find((project) => project.banner);
  const plates = filtered.filter((project) => !project.banner);
  const counts = Object.fromEntries(
    categories.map((category) => [category, filterProjects(projects, category).length]),
  );

  const catalogTotal = projects.length + archive.length;
  const shown = archiveOpen ? catalogTotal : projects.length;

  function update(changes: { category?: Category | null; layout?: Layout }) {
    const params = new URLSearchParams(searchParams);
    if ("category" in changes) {
      if (changes.category) params.set("category", categorySlug(changes.category));
      else params.delete("category");
    }
    if (changes.layout) {
      if (changes.layout === "asym") params.delete("layout");
      else params.set("layout", changes.layout);
    }
    setSearchParams(params, { replace: true, preventScrollReset: true });
  }

  return (
    <>
      <section aria-labelledby="portfolio-heading" className="pt-16 pb-10 md:pt-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-3xl">
              <p className="label-caps">
                <span className="text-accent">Archive volume IV</span>{" "}
                <span className="text-muted">— Selected commissions</span>
              </p>
              <h1 id="portfolio-heading" className="mt-4 text-5xl tracking-[-0.03em] md:text-7xl">
                Selected Works <em className="text-accent">(2020–2025)</em>
              </h1>
              <p className="text-muted mt-6 max-w-xl">
                A curated archive of editorial campaigns, intimate portraits, architectural studies
                and documentary series, made in Mumbai and on the road between 2020 and 2025.
              </p>
            </div>

            <div className="bg-surface border-line min-w-52 border p-6 text-center">
              <p className="label-caps text-muted">Curated catalog</p>
              <p className="mt-2 font-serif text-5xl">{catalogTotal}</p>
              <p className="label-caps text-muted mt-2">Projects · Sony · Fujifilm</p>
            </div>
          </div>
        </Container>
      </section>

      <section aria-label="Projects" className="pb-16 md:pb-24">
        <Container>
          <div className="border-line flex flex-wrap items-center justify-between gap-5 border-t pt-8">
            <FilterBar
              categories={categories}
              active={active}
              counts={counts}
              total={projects.length}
              onChange={(category) => update({ category })}
            />
            <LayoutSwitch active={layout} onChange={(next) => update({ layout: next })} />
          </div>

          {/* role="status" makes screen readers announce the new count after each change. */}
          <p role="status" className="text-muted mt-6 mb-10 text-sm">
            {active
              ? `Showing ${filtered.length} of ${projects.length} projects in ${active}.`
              : `Showing all ${projects.length} projects.`}
          </p>

          {filtered.length === 0 ? (
            <div className="border-line border p-10 text-center">
              <p className="font-serif text-3xl">No projects here yet.</p>
              <button
                type="button"
                onClick={() => update({ category: null })}
                className="label-caps hover:text-accent mt-6 underline underline-offset-8"
              >
                Show all works
              </button>
            </div>
          ) : layout === "asym" ? (
            <div className="grid items-start gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-12">
              {plates.map((project, index) => {
                const slot = rhythm[index % rhythm.length];
                return (
                  <div key={project.slug} className={slot.cell}>
                    <ProjectCard project={project} aspect={slot.aspect} sizes={slot.sizes} />
                  </div>
                );
              })}
            </div>
          ) : layout === "cols" ? (
            <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {plates.map((project) => (
                <ProjectCard key={project.slug} project={project} aspect="portrait" sizes={tall} />
              ))}
            </div>
          ) : (
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {filtered.map((project) => (
                <SheetTile key={project.slug} project={project} />
              ))}
            </ul>
          )}
        </Container>
      </section>

      {banner && layout !== "sheet" && (
        <section aria-label="Special commission" className="pb-16 md:pb-24">
          <Container>
            <Link
              to={`/portfolio/${banner.slug}`}
              className="group relative block aspect-21/9 min-h-80 overflow-hidden"
            >
              <ResponsiveImage
                id={banner.image.id}
                alt={banner.image.alt}
                sizes="(min-width: 1440px) 1312px, 100vw"
                className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-[1.03]"
              />
              <span className="text-on-image absolute inset-x-0 bottom-0 grid gap-2 bg-[linear-gradient(0deg,rgb(5_5_5/0.9),transparent)] p-6 md:p-12">
                <span className="label-caps text-on-image-accent">
                  Special project · {banner.location}, {banner.year}
                </span>
                <span className="font-serif text-4xl md:text-5xl">{banner.title}</span>
                <span className="text-on-image/85 max-w-xl font-light">{banner.summary}</span>
              </span>
            </Link>
          </Container>
        </section>
      )}

      <section aria-labelledby="archive-heading" className="pb-24 md:pb-32">
        <Container>
          <h2 id="archive-heading" className="sr-only">
            Archive of earlier work
          </h2>
          <div className="bg-surface border-line flex flex-wrap items-center gap-8 border p-6 md:p-8">
            <div className="min-w-60 flex-1">
              <p className="label-caps text-muted">Curated exhibition progress</p>
              <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span className="text-muted text-sm">
                  Earlier work, from 2021 onwards, sits in the archive index.
                </span>
                <b className="label-caps text-accent">
                  Displaying {shown} of {catalogTotal} projects
                </b>
              </div>
              <div
                role="progressbar"
                aria-label="Projects shown"
                aria-valuemin={0}
                aria-valuemax={catalogTotal}
                aria-valuenow={shown}
                className="bg-line mt-4 h-0.5 w-full"
              >
                <div
                  className="bg-accent h-full transition-[width] duration-700 motion-reduce:transition-none"
                  style={{ width: `${(shown / catalogTotal) * 100}%` }}
                />
              </div>
            </div>
            <button
              type="button"
              aria-expanded={archiveOpen}
              aria-controls="archive-index"
              onClick={() => setArchiveOpen((open) => !open)}
              className="bg-btn text-btn-fg hover:bg-btn-hover label-caps px-8 py-4 transition-colors"
            >
              {archiveOpen ? "Hide archive" : "Load archive"}
            </button>
          </div>

          <div id="archive-index" hidden={!archiveOpen} className="mt-12">
            <ArchiveIndex />
          </div>
        </Container>
      </section>

      <CtaBanner
        eyebrow="Commissioning"
        title="Want to see something unlisted?"
        text="Private commissions and unreleased series are shared by appointment."
        buttonLabel="Request a private viewing"
      />
    </>
  );
}