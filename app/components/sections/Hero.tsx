import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { ResponsiveImage } from "~/components/gallery/ResponsiveImage";
import { ButtonLink } from "~/components/ui/ButtonLink";
import { Container } from "~/components/ui/Container";
import { heroSlides } from "~/data/home";
import { site } from "~/data/site";
import { Words } from "../motion/Words";

gsap.registerPlugin(useGSAP);

const SLIDE_MS = 7000; // how long each slide stays

export function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const [index, setIndex] = useState(0);
    const [playing, setPlaying] = useState(true); // the visitor's own choice (Pause / Play button)
    const [hovering, setHovering] = useState(false); // pointer or keyboard focus is inside the hero
    const [reduceMotion, setReduceMotion] = useState(false);

    // The slideshow only advances when nothing says "stop".
    const running = playing && !hovering && !reduceMotion;
    const slide = heroSlides[index];

    // Respect the "reduce motion" setting of the visitor's device.
    useEffect(() => {
        const media = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => setReduceMotion(media.matches);
        update();
        media.addEventListener("change", update);
        return () => media.removeEventListener("change", update);
    }, []);

    // Move to the next slide after a pause. Starts again whenever the slide changes.
    useEffect(() => {
        if (!running) return;
        const timer = window.setTimeout(() => setIndex((i) => (i + 1) % heroSlides.length), SLIDE_MS);
        return () => window.clearTimeout(timer);
    }, [running, index]);

    // The intro: the text rises one line at a time. The starting (hidden) look is set in app.css.
    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                const wait = document.documentElement.classList.contains("show-curtain") ? 1.9 : 0;
                gsap.fromTo(
                    "[data-hero]",
                    { autoAlpha: 0, y: 24 },
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 1,
                        stagger: 0.14,
                        delay: 0.2 + wait,
                        ease: "power3.out",
                    },
                );
            });
            return () => mm.revert();
        },
        { scope: sectionRef },
    );

    return (
        <section
            ref={sectionRef}
            aria-roledescription="carousel"
            aria-label="Featured work"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onFocus={() => setHovering(true)}
            onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setHovering(false);
            }}
            className="text-on-image relative h-[calc(100svh-4.75rem)] min-h-170 overflow-hidden bg-[#050505]"
        >
            {/* The slides: they cross-fade, and the photo drifts slowly while it is on screen. */}
            <div className="absolute inset-0">
                {heroSlides.map((item, i) => {
                    const active = i === index;
                    return (
                        <div
                            key={item.image.id}
                            role="group"
                            aria-roledescription="slide"
                            aria-label={`${i + 1} of ${heroSlides.length}`}
                            aria-hidden={!active}
                            className={`absolute inset-0 transition-opacity duration-1600 ease-out motion-reduce:transition-none ${active ? "opacity-100" : "opacity-0"
                                }`}
                        >
                            <ResponsiveImage
                                id={item.image.id}
                                alt={item.image.alt}
                                sizes="100vw"
                                priority={i === 0}
                                className={`h-full w-full object-cover transition-transform duration-9000 ease-linear motion-reduce:scale-100 motion-reduce:transition-none ${active ? "scale-[1.2]" : "scale-[1.06]"
                                    }`}
                            />
                        </div>
                    );
                })}
            </div>

            {/* Dark gradients so the text stays readable on any photo. */}
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(90deg,rgb(5_5_5/0.82),rgb(5_5_5/0.15)_70%),linear-gradient(0deg,rgb(5_5_5/0.7),transparent_45%)]"
            />

            <Container className="relative flex h-full flex-col justify-end gap-6 pb-36 md:pb-40">
                <p data-hero className="label-caps text-on-image-accent">
                    {site.shortName} · {site.role}
                </p>

                <Words
                    as="h1"
                    id="hero-heading"
                    trigger="load"
                    delay={0.1}
                    className="max-w-205 text-[clamp(2.75rem,7vw,5rem)] leading-[1.08] tracking-[-0.03em]"
                >
                    Visual Poetry <em className="text-on-image-accent">Through Light</em> &amp; Shadow.
                </Words>

                <p
                    data-hero
                    className="text-on-image/90 max-w-130 text-base leading-relaxed font-light md:text-lg"
                >
                    {site.heroIntro}
                </p>

                <div data-hero className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-2">
                              <ButtonLink to="/portfolio" variant="onImage" magnetic>
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

            {/* Slideshow controls: caption, slide buttons with a progress line, and Pause / Play. */}
            <div className="absolute inset-x-0 bottom-5 z-10">
                <Container className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
                    <p aria-live={running ? "off" : "polite"} className="label-caps text-on-image/80">
                        <Link to={slide.href} className="hover:text-on-image-accent transition-colors">
                            {slide.caption}
                            <span className="sr-only"> (view project)</span>
                        </Link>
                    </p>

                    <div className="flex items-end gap-2">
                        <div role="group" aria-label="Choose slide" className="flex">
                            {heroSlides.map((item, i) => (
                                <button
                                    key={item.image.id}
                                    type="button"
                                    aria-label={`Show slide ${i + 1}: ${item.caption}`}
                                    aria-current={i === index}
                                    onClick={() => setIndex(i)}
                                    className="hover:text-on-image-accent flex min-h-11 min-w-11 flex-col justify-end gap-2 px-2 pb-2 text-left transition-colors"
                                >
                                    <span className="label-caps">0{i + 1}</span>
                                    <span className="bg-on-image/30 relative block h-px w-9">
                                        {i === index && (
                                            <span
                                                key={`${index}-${running}`}
                                                className="bg-on-image-accent absolute inset-y-0 left-0 block h-px w-full"
                                                style={
                                                    running
                                                        ? { animation: `hero-progress ${SLIDE_MS}ms linear forwards` }
                                                        : undefined
                                                }
                                            />
                                        )}
                                    </span>
                                </button>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={() => setPlaying((value) => !value)}
                            aria-label={playing ? "Pause slideshow" : "Play slideshow"}
                            className="hover:text-on-image-accent inline-flex size-11 items-center justify-center transition-colors"
                        >
                            {playing ? (
                                <Pause size={18} strokeWidth={1.5} aria-hidden="true" />
                            ) : (
                                <Play size={18} strokeWidth={1.5} aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </Container>
            </div>
        </section>
    );
}