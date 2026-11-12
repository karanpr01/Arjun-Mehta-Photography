import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { ResponsiveImage } from "~/components/gallery/ResponsiveImage";
import { Reveal } from "~/components/motion/Reveal";
import { Container } from "~/components/ui/Container";
import { site } from "~/data/site";
import { Parallax } from "../motion/Parallax";

export function AboutSnippet() {
    return (
        <section aria-labelledby="about-heading" className="bg-surface py-24 md:py-32">
            <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-5">
                    <div className="relative">
                        <Parallax className="bg-bg aspect-4/5">
                            <ResponsiveImage
                                id="portrait"
                                alt={site.aboutAlt}
                                sizes="(min-width: 1024px) 40vw, 100vw"
                                className="h-full w-full object-cover"
                            />
                        </Parallax>
                        <p className="bg-veil border-line absolute bottom-4 left-4 border p-4 backdrop-blur-md">
                            <span className="block font-serif text-xl">{site.shortName}</span>
                            <span className="label-caps text-muted mt-1 block">{site.role}</span>
                        </p>
                    </div>
                </div>

                <Reveal className="lg:col-span-7">
                    <p className="label-caps text-accent">Artistic philosophy</p>
                    <h2 id="about-heading" className="sr-only">
                        About {site.shortName}
                    </h2>
                    <figure className="mt-6">
                        <blockquote>
                            <p className="font-serif text-3xl leading-tight tracking-[-0.01em] md:text-5xl">
                                &ldquo;{site.aboutQuote}&rdquo;
                            </p>
                        </blockquote>
                    </figure>
                    <p className="text-muted mt-8 max-w-xl">{site.aboutBody}</p>
                    <Link
                        to="/about"
                        className="label-caps hover:text-accent mt-10 inline-flex items-center gap-2 underline underline-offset-8 transition-colors"
                    >
                        Read the full story and studio kit
                        <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
                    </Link>
                </Reveal>
            </Container>
        </section>
    );
}