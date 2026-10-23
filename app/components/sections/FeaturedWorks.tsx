import { ProjectCard } from "~/components/gallery/ProjectCard";
import { ButtonLink } from "~/components/ui/ButtonLink";
import { Container } from "~/components/ui/Container";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { getFeaturedProjects } from "~/data/projects";

export function FeaturedWorks() {
    const [lead, ...others] = getFeaturedProjects();

    return (
        <section aria-labelledby="featured-heading" className="py-24 md:py-32">
            <Container>
                <SectionHeading id="featured-heading" eyebrow="Selected work" title="Curated Selected Works">
                    <ButtonLink to="/portfolio" variant="outline">
                        View all work
                    </ButtonLink>
                </SectionHeading>

                <div className="mt-12 grid gap-x-10 gap-y-14 md:grid-cols-2">
                    {lead && (
                        <div className="md:col-span-2">
                            <ProjectCard project={lead} aspect="landscape" sizes="(min-width: 1440px) 1312px, 100vw" />
                        </div>
                    )}
                    {others.map((project) => (
                        <ProjectCard
                            key={project.slug}
                            project={project}
                            aspect="portrait"
                            sizes="(min-width: 1440px) 636px, (min-width: 768px) 50vw, 100vw"
                        />
                    ))}
                </div>
            </Container>
        </section>
    );
}