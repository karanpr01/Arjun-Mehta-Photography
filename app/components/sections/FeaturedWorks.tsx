import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { ResponsiveImage } from "~/components/gallery/ResponsiveImage";
import { Reveal } from "~/components/motion/Reveal";
import { ButtonLink } from "~/components/ui/ButtonLink";
import { Container } from "~/components/ui/Container";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { getFeaturedProjects, type Project } from "~/data/projects";
import { site } from "~/data/site";

const zoom =
    "h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-[1.03]";

function fact(project: Project, label: string) {
    return project.facts.find((item) => item.label === label)?.value;
}

// A smaller featured project: tall photo, a line of details, title and a short summary.
function FeaturedCard({ project, className = "" }: { project: Project; className?: string }) {
    return (
        <article
            className={`group has-focus-visible:outline-accent relative has-focus-visible:outline-2 has-focus-visible:outline-offset-8 ${className}`}
        >
            <div className="bg-surface aspect-4/5 overflow-hidden">
                <ResponsiveImage
                    id={project.image.id}
                    alt={project.image.alt}
                    sizes="(min-width: 1440px) 636px, (min-width: 768px) 50vw, 100vw"
                    className={zoom}
                />
            </div>
            <div className="label-caps text-muted mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                <span className="text-accent">{project.descriptor}</span>
                <span>
                    {project.location}, {project.year}
                </span>
            </div>
            <h3 className="mt-2 text-3xl leading-snug">
                {/* The ::after stretches this link over the whole card. */}
                <Link
                    to={`/portfolio/${project.slug}`}
                    className="outline-none after:absolute after:inset-0 after:content-['']"
                >
                    {project.title}
                </Link>
            </h3>
            <p className="text-muted mt-2 max-w-md text-sm">{project.summary}</p>
            <span className="label-caps mt-4 inline-flex items-center gap-2" aria-hidden="true">
                Inspect project
                <ArrowRight size={14} strokeWidth={1.5} />
            </span>
        </article>
    );
}

export function FeaturedWorks() {
    const [lead, ...others] = getFeaturedProjects();
    const archiveCount = `${site.stats[1].value}${site.stats[1].suffix}`;

    return (
        <section aria-labelledby="featured-heading" className="py-24 md:py-32">
            <Container>
                <Reveal className="flex flex-wrap items-end justify-between gap-8">
                    <SectionHeading
                        id="featured-heading"
                        eyebrow="Selected work"
                        title="Curated Selected Works"
                    />
                    <p className="text-muted max-w-sm text-sm">
                        Every project begins with a simple question: what does this place, person or object feel
                        like at its quietest? The photographs below are the answers.
                    </p>
                </Reveal>

                {lead && (
                    <Reveal className="mt-14">
                        <article className="group grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
                            <Link
                                to={`/portfolio/${lead.slug}`}
                                tabIndex={-1}
                                aria-hidden="true"
                                className="bg-surface block aspect-16/10 overflow-hidden lg:col-span-7"
                            >
                                <ResponsiveImage
                                    id={lead.image.id}
                                    alt={lead.image.alt}
                                    sizes="(min-width: 1440px) 740px, (min-width: 1024px) 58vw, 100vw"
                                    className={zoom}
                                />
                            </Link>

                            <div className="flex flex-col gap-5 lg:col-span-5">
                                <p className="label-caps text-accent">
                                    Plate {lead.plate} · {lead.category}
                                </p>
                                <h3 className="text-[clamp(2rem,3.4vw,2.75rem)] leading-tight">{lead.title}</h3>
                                <p className="text-muted">{lead.summary}</p>

                                <dl className="bg-surface border-line grid gap-5 border p-5 sm:grid-cols-2">
                                    <div>
                                        <dt className="label-caps text-muted">Camera system</dt>
                                        <dd className="mt-2 text-sm">{fact(lead, "Instrumentation")}</dd>
                                    </div>
                                    <div>
                                        <dt className="label-caps text-muted">Accolades</dt>
                                        <dd className="mt-2 text-sm">{lead.badge ?? "Self-initiated project"}</dd>
                                    </div>
                                </dl>

                                <Link
                                    to={`/portfolio/${lead.slug}`}
                                    className="label-caps hover:text-accent inline-flex items-center gap-2 self-start underline underline-offset-8 transition-colors"
                                >
                                    View photographic series
                                    <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
                                </Link>
                            </div>
                        </article>
                    </Reveal>
                )}

                <Reveal stagger className="mt-20 grid gap-14 md:mt-28 md:grid-cols-12 md:gap-x-10">
                    {others.slice(0, 2).map((project, index) => (
                        <FeaturedCard
                            key={project.slug}
                            project={project}
                            className={
                                index === 0
                                    ? "md:col-span-5"
                                    : "md:col-span-6 md:col-start-7 md:mt-[clamp(0px,9vw,140px)]"
                            }
                        />
                    ))}
                </Reveal>

                <Reveal className="bg-surface border-line mt-20 flex flex-wrap items-center justify-between gap-6 border p-6 md:mt-28 md:p-8">
                    <div>
                        <h3 className="text-2xl">Looking for a specific kind of work?</h3>
                        <p className="text-muted mt-1 text-sm">
                            Browse the complete archive, {archiveCount} commissions and personal projects, by
                            category.
                        </p>
                    </div>
                    <ButtonLink to="/portfolio" variant="outline">
                        Browse the complete archive
                    </ButtonLink>
                </Reveal>
            </Container>
        </section>
    );
}