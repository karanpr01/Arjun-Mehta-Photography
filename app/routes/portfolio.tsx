import type { Route } from "./+types/portfolio";
import { ProjectCard } from "~/components/gallery/ProjectCard";
import { Container } from "~/components/ui/Container";
import { projects } from "~/data/projects";

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
  return (
    <>
      <section aria-labelledby="portfolio-heading" className="pt-16 pb-12 md:pt-24">
        <Container>
          <p className="label-caps text-accent">Archive</p>
          <h1 id="portfolio-heading" className="mt-4 text-5xl tracking-[-0.03em] md:text-7xl">
            Selected Works
          </h1>
          <p className="text-muted mt-6 max-w-xl">
            A selection of recent projects. {projects.length} in total.
          </p>
        </Container>
      </section>

      <section aria-label="Projects" className="pb-24 md:pb-32">
        <Container>
          <div className="grid items-start gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-12">
            {projects.map((project, index) => {
              const slot = rhythm[index % rhythm.length];
              return (
                <div key={project.slug} className={slot.cell}>
                  <ProjectCard project={project} aspect={slot.aspect} sizes={slot.sizes} />
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}