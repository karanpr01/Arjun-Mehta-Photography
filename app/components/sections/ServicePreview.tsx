import { Reveal } from "~/components/motion/Reveal";
import { ButtonLink } from "~/components/ui/ButtonLink";
import { Container } from "~/components/ui/Container";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { services } from "~/data/services";

export function ServicePreview() {
    return (
        <section aria-labelledby="services-heading" className="py-24 md:py-32">
            <Container>
                <SectionHeading id="services-heading" eyebrow="Commissions" title="Curated Capabilities">
                    <ButtonLink to="/services" variant="outline">
                        Services &amp; pricing
                    </ButtonLink>
                </SectionHeading>

                <Reveal as="ol" stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {services.map((service, index) => (
                        <li key={service.id} className="bg-surface border-line flex flex-col border p-6">
                            <p className="label-caps text-accent">{String(index + 1).padStart(2, "0")}</p>
                            <h3 className="mt-6 text-2xl leading-snug">{service.title}</h3>
                            <p className="text-muted mt-4 text-sm">{service.summary}</p>
                        </li>
                    ))}
                </Reveal>
            </Container>
        </section>
    );
}