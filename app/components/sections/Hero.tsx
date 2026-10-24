import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router";
import { ResponsiveImage } from "~/components/gallery/ResponsiveImage";
import { ButtonLink } from "~/components/ui/ButtonLink";
import { Container } from "~/components/ui/Container";
import { site } from "~/data/site";

gsap.registerPlugin(useGSAP);

export function Hero() {
    const sectionRef = useRef<HTMLElement>(null);

    // The intro: the photo settles in, then the text rises one line at a time.
    // The starting (hidden) look is set in app.css, so there is no flash before this runs.
    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
                intro
                    .fromTo("[data-hero-image]", { scale: 1.08 }, { scale: 1, duration: 2 }, 0)
                    .fromTo(
                        "[data-hero]",
                        { autoAlpha: 0, y: 24 },
                        { autoAlpha: 1, y: 0, duration: 1, stagger: 0.14 },
                        0.2,
                    );
            });
            return () => mm.revert();
        },
        { scope: sectionRef },
    );

    return (
        <section
            ref={sectionRef}
            aria-labelledby="hero-heading"
            className="text-on-image relative h-[calc(100svh-4.75rem)] min-h-170 overflow-hidden bg-[#050505]"
        >
            <div data-hero-image className="absolute inset-0">
                <ResponsiveImage
                    id="hero"
                    alt={site.heroAlt}
                    sizes="100vw"
                    priority
                    className="h-full w-full object-cover"
                />
            </div>

            {/* Dark gradients so the text stays readable on any photo. */}
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(90deg,rgb(5_5_5/0.82),rgb(5_5_5/0.15)_70%),linear-gradient(0deg,rgb(5_5_5/0.7),transparent_45%)]"
            />

            <Container className="relative flex h-full flex-col justify-end gap-6 pb-20 md:pb-28">
                <p data-hero className="label-caps text-on-image-accent">
                    {site.shortName} · {site.role}
                </p>

                <h1
                    data-hero
                    id="hero-heading"
                    className="max-w-205 text-[clamp(2.75rem,7vw,5rem)] leading-[1.08] tracking-[-0.03em]"
                >
                    Visual Poetry <em className="text-on-image-accent">Through Light</em> &amp; Shadow.
                </h1>

                <p
                    data-hero
                    className="text-on-image/90 max-w-130 text-base leading-relaxed font-light md:text-lg"
                >
                    {site.heroIntro}
                </p>

                <div data-hero className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-2">
                    <ButtonLink to="/portfolio" variant="onImage">
                        Explore selected work
                        <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
                    </ButtonLink>
                    <Link
                        to="/contact"
                        className="label-caps hover:text-on-image-accent underline-offset-8 transition-colors hover:underline"
                    >
                        Commission a shoot
                    </Link>
                </div>
            </Container>
        </section>
    );
}