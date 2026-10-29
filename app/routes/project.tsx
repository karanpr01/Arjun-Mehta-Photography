import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, data } from "react-router";
import type { Route } from "./+types/project";
import { ProjectCard } from "~/components/gallery/ProjectCard";
import { ProjectGallery } from "~/components/gallery/ProjectGallery";
import { CtaBanner } from "~/components/sections/CtaBanner";
import { Container } from "~/components/ui/Container";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { getAdjacentProjects, getProjectBySlug, getRelatedProjects } from "~/data/projects";
import { jpgPath } from "~/lib/images";
import { pageMeta } from "~/lib/seo";
import { breadcrumbSchema, projectSchema } from "~/lib/structuredData";
import { StoryBody } from "~/components/sections/StoryBody";

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
  const project = loaderData?.project;
  if (!project)
    return pageMeta({
      title: "Project not found",
      description: "This project could not be found.",
      path: "/404",
      noindex: true,
    });

  const image = jpgPath(project.image.id, 1200);

  return pageMeta({
    title: project.title,
    description: `${project.title}: ${project.category} project by Arjun Mehta, ${project.location}, ${project.year}.`,
    path: `/portfolio/${project.slug}`,
    image,
    jsonLd: [
      projectSchema(project, image),
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Portfolio", path: "/portfolio" },
        { name: project.title, path: `/portfolio/${project.slug}` },
      ]),
    ],
  });
}

export default function Project({ loaderData }: Route.ComponentProps) {
  const { project, previous, next, related } = loaderData;
  const story = project.story;

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
              <li>{project.category}</li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{project.title}</li>
            </ol>
          </nav>

          <div className="mt-10 flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-4xl">
              <p className="label-caps text-accent">
                {project.plate ? `Plate ${project.plate} · ` : ""}
                {project.descriptor}
              </p>
              <h1 id="project-heading" className="mt-4 text-5xl tracking-[-0.03em] md:text-7xl">
                {story ? (
                  <>
                    {story.titleLead} <em className="text-accent">{story.titleEmphasis}</em>
                  </>
                ) : (
                  project.title
                )}
              </h1>
              {!story && <p className="mt-6 max-w-2xl text-lg">{project.summary}</p>}
            </div>

            {story && (
              <div className="bg-surface border-line border p-5">
                <p className="label-caps text-muted">Commission type</p>
                <p className="mt-2 font-serif text-xl">{story.badge}</p>
              </div>
            )}
          </div>

          <dl className="border-line bg-line mt-12 grid gap-px border sm:grid-cols-2 lg:grid-cols-4">
            {project.facts.map((fact) => (
              <div key={fact.label} className="bg-bg p-5">
                <dt className="label-caps text-muted">{fact.label}</dt>
                <dd className="mt-2 text-sm">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Container>

        {story ? (
          <StoryBody project={project} />
        ) : (
          <Container className="mt-12">
            <ProjectGallery images={[project.image, ...(project.gallery ?? [])]} />
          </Container>
        )}
      </article>

      {/* ...the previous/next navigation, related section and CtaBanner stay exactly as they were... */}


      {
        previous && next && previous.slug !== project.slug && (
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
        )
      }

      {
        related.length > 0 && (
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
        )
      }

      <CtaBanner />
    </>
  );
}