import {
    ArrowRight,
    Building2,
    Camera,
    Heart,
    Shirt,
    UserRound,
    type LucideIcon,
} from "lucide-react";
import { Link } from "react-router";
import { Reveal } from "~/components/motion/Reveal";
import { Container } from "~/components/ui/Container";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { services } from "~/data/services";

// A small icon and a one-word label for each service.
const looks: Record<string, { icon: LucideIcon; kind: string }> = {
    "editorial-fashion": { icon: Shirt, kind: "Campaign" },
    "portraiture-branding": { icon: UserRound, kind: "Portrait" },
    "architecture-spaces": { icon: Building2, kind: "Spaces" },
    "weddings-celebrations": { icon: Heart, kind: "Weddings" },
};

export function ServicePreview() {
    return (
        <section aria-labelledby="services-heading" className="py-24 md:py-32">
            <Container>
                <Reveal className="flex flex-wrap items-end justify-between gap-6">
                    <SectionHeading
                        id="services-heading"
                        eyebrow="Commissions"
                        title="Curated Capabilities"
                    />
                    <Link
                        to="/services"
                        className="label-caps hover:text-accent inline-flex items-center gap-2 underline underline-offset-8 transition-colors"
                    >
                        View rates and deliverables
                        <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
                    </Link>
                </Reveal>

                <Reveal as="ol" stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {services.map((service, index) => {
                        const look = looks[service.id] ?? { icon: Camera, kind: "Commission" };
                        const Icon = look.icon;

                        return (
                            <li
                                key={service.id}
                                className="bg-surface border-line hover:border-accent has-focus-visible:outline-accent relative flex flex-col border p-6 transition-colors has-focus-visible:outline-2 has-focus-visible:outline-offset-4"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <p className="label-caps text-accent">
                                        {String(index + 1).padStart(2, "0")} // {look.kind}
                                    </p>
                                    <Icon size={20} strokeWidth={1.25} aria-hidden="true" className="text-muted" />
                                </div>

                                <h3 className="mt-8 text-2xl leading-snug">
                                    {/* The ::after stretches this link over the whole card. */}
                                    <Link
                                        to={`/services#${service.id}`}
                                        className="outline-none after:absolute after:inset-0 after:content-['']"
                                    >
                                        {service.title}
                                    </Link>
                                </h3>
                                <p className="text-muted mt-3 text-sm">{service.summary}</p>

                                <div className="mt-auto pt-8">
                                    <div className="border-line border-t pt-4">
                                        <p className="label-caps text-muted">Starting from</p>
                                        <p className="mt-1 font-serif text-xl">{service.price}</p>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </Reveal>
            </Container>
        </section>
    );
}