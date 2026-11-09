import { Link } from "react-router";
import { ResponsiveImage } from "~/components/gallery/ResponsiveImage";
import type { Project } from "~/data/projects";

type Props = {
    project: Project;
    aspect?: "landscape" | "portrait";
    sizes: string;
};

const aspects = {
    landscape: "aspect-[16/9]",
    portrait: "aspect-[4/5]",
} as const;

export function ProjectCard({ project, aspect = "landscape", sizes }: Props) {
    return (
        <article className="group has-focus-visible:outline-accent relative has-focus-visible:outline-2 has-focus-visible:outline-offset-8">
            <div className={`bg-surface overflow-hidden ${aspects[aspect]}`}>
                <ResponsiveImage
                    id={project.image.id}
                    alt={project.image.alt}
                    sizes={sizes}
                    className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-[1.03]"
                />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                <p className="label-caps text-muted">
                    {project.plate ? `Plate ${project.plate} · ` : ""}
                    {project.location}, {project.year}
                </p>
                {project.badge && (
                    <p className="label-caps text-accent border-line border px-2 py-1">{project.badge}</p>
                )}
            </div>

            <h3 className="mt-2 text-2xl leading-snug md:text-3xl">
                {/* The ::after stretches this link over the whole card, so the entire card is clickable
            but screen readers still hear just one link. */}
                <Link
                    to={`/portfolio/${project.slug}`}
                    className="outline-none after:absolute after:inset-0 after:content-['']"
                >
                    {project.title}
                </Link>
            </h3>
            <p className="text-muted mt-1 text-sm">{project.descriptor}</p>
        </article>
    );
}