import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, data } from "react-router";
import type { Route } from "./+types/project";
import { ProjectCard } from "~/components/gallery/ProjectCard";
import { ProjectGallery } from "~/components/gallery/ProjectGallery";
import { CtaBanner } from "~/components/sections/CtaBanner";
import { Container } from "~/components/ui/Container";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { getAdjacentProjects, getProjectBySlug, getRelatedProjects } from "~/data/projects";

// The loader runs BEFORE the page shows. If the slug is unknown, we stop with a real 404.
export function loader({ params }: Route.LoaderArgs) {
  const project = getProjectBySlug(params.slug);
  if (!project) throw data("Project not found", { status: 404 });

  return {
    project,
    ...getAdjacentProjects(project.slug),
    related: getRelatedProjects(project.slug),
  };
}

export function meta({ loaderData }: Route.MetaArgs) {
  const title = loaderData?.project.title ?? "Project not found";
  return [{ title: `${title} | Arjun Mehta Photography` }];
}

export default function Project({ loaderData }: Route.ComponentProps) {
  const { project, previous, next, related } = loaderData;

  return (
    <>
      <article aria-labelledby="project-heading">
        <Container className="pt-10 md:pt-16">
          <nav aria-label="Breadcrumb">
            <ol className="text-muted flex flex-wrap items-center gap-2 text-sm">
              <li>
                <Link to="/portfolio" className="hover:text-accent underline underline-offset-4">
                  Portfolio
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{project.title}</li>
            </ol>
          </nav>

          <p className="label-caps text-accent mt-10">{project.category}</p>
          <h1 id="project-heading" className="mt-4 text-5xl tracking-[-0.03em] md:text-7xl">
            {project.title}
          </h1>
          <p className="text-muted mt-4">
            {project.location} · {project.year}
          </p>
          <p className="mt-6 max-w-2xl text-lg">{project.summary}</p>
        </Container>

        <Container className="mt-12">
           <ProjectGallery images={[project.image, ...(project.gallery ?? [])]} />
        </Container>
      </article>

      {previous && next && previous.slug !== project.slug && (
        <nav aria-label="More projects" className="mt-20 md:mt-28">
          <Container>
            <div className="border-line grid border-t md:grid-cols-2">
              <Link
                to={`/portfolio/${previous.slug}`}
                className="group hover:text-accent flex items-center gap-4 py-8 transition-colors"
              >
                <ArrowLeft size={20} strokeWidth={1.25} aria-hidden="true" />
                <span>
                  <span className="label-caps text-muted block">Previous project</span>
                  <span className="mt-1 block font-serif text-2xl">{previous.title}</span>
                </span>
              </Link>
              <Link
                to={`/portfolio/${next.slug}`}
                className="group hover:text-accent border-line flex items-center justify-end gap-4 border-t py-8 text-right transition-colors md:border-t-0 md:border-l"
              >
                <span>
                  <span className="label-caps text-muted block">Next project</span>
                  <span className="mt-1 block font-serif text-2xl">{next.title}</span>
                </span>
                <ArrowRight size={20} strokeWidth={1.25} aria-hidden="true" />
              </Link>
            </div>
          </Container>
        </nav>
      )}

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="py-20 md:py-28">
          <Container>
            <SectionHeading id="related-heading" eyebrow="Keep exploring" title="More from the archive" />
            <div className="mt-12 grid gap-x-10 gap-y-14 md:grid-cols-2">
              {related.map((item) => (
                <ProjectCard
                  key={item.slug}
                  project={item}
                  aspect="landscape"
                  sizes="(min-width: 1440px) 636px, (min-width: 768px) 50vw, 100vw"
                />
              ))}
            </div>
          </Container>
        </section>
      )}

      <CtaBanner />
    </>
  );
}