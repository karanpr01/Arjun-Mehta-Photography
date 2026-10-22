import { data } from "react-router";
import type { Route } from "./+types/project";
import { getProjectBySlug } from "~/data/projects";
import { ResponsiveImage } from "~/components/gallery/ResponsiveImage";

// The loader runs BEFORE the page shows. If the slug is unknown, we stop with a real 404.
export function loader({ params }: Route.LoaderArgs) {
  const project = getProjectBySlug(params.slug);
  if (!project) throw data("Project not found", { status: 404 });
  return { project };
}

export function meta({ loaderData }: Route.MetaArgs) {
  const title = loaderData?.project.title ?? "Project not found";
  return [{ title: `${title} | Arjun Mehta Photography` }];
}

export default function Project({ loaderData }: Route.ComponentProps) {
  const { project } = loaderData;

  return (
    <div className="px-6 py-24 md:px-16">
      <p className="label-caps text-accent">
        {project.category} · {project.location}, {project.year}
      </p>
      <h1 className="mt-4 text-5xl md:text-7xl">{project.title}</h1>
      <p className="text-muted mt-6">{project.summary}</p>
      <div className="mt-10">
        <ResponsiveImage
          id={project.image.id}
          alt={project.image.alt}
          sizes="(min-width: 1024px) 80vw, 100vw"
          priority
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}