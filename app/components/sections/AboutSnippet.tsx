import { ResponsiveImage } from "~/components/gallery/ResponsiveImage";
import { ButtonLink } from "~/components/ui/ButtonLink";
import { Container } from "~/components/ui/Container";
import { site } from "~/data/site";

export function AboutSnippet() {
    return (
        <section aria-labelledby="about-heading" className="bg-surface py-24 md:py-32">
            <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-5">
                    <div className="bg-bg aspect-4/5 overflow-hidden">
                        <ResponsiveImage
                            id="about-portrait"
                            alt={site.aboutAlt}
                            sizes="(min-width: 1024px) 40vw, 100vw"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>

                <div className="lg:col-span-7">
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
                    <ButtonLink to="/about" variant="outline" className="mt-10">
                        Read the full story
                    </ButtonLink>
                </div>
            </Container>
        </section>
    );
}