import { Aperture, ArrowRight, Camera, Lightbulb, type LucideIcon } from "lucide-react";
import type { Route } from "./+types/about";
import { ResponsiveImage } from "~/components/gallery/ResponsiveImage";
import { Reveal } from "~/components/motion/Reveal";
import { CtaBanner } from "~/components/sections/CtaBanner";
import { ButtonLink } from "~/components/ui/ButtonLink";
import { Container } from "~/components/ui/Container";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { Stat } from "~/components/ui/Stat";
import { about } from "~/data/about";
import { site } from "~/data/site";
import { pageMeta } from "~/lib/seo";
import { Parallax } from "~/components/motion/Parallax";
import { Words } from "~/components/motion/Words";

export function meta({ }: Route.MetaArgs) {
  return pageMeta({
    title: "About",
    description: "About the photographer Arjun Mehta: approach, working style and where he works.",
    path: "/about",
  });
}

const kitIcons: Record<string, LucideIcon> = {
  Cameras: Camera,
  Lenses: Aperture,
};

export default function About() {
  return (
    <>
      <section aria-labelledby="about-page-heading" className="pt-16 pb-24 md:pt-24 md:pb-32">
        <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <figure className="lg:col-span-5">
            <Parallax className="bg-surface aspect-4/5">
              <ResponsiveImage
                id={about.portrait.id}
                alt={about.portrait.alt}
                sizes="(min-width: 1024px) 40vw, 100vw"
                priority
                className="h-full w-full object-cover"
              />
            </Parallax>
            <figcaption className="label-caps text-muted mt-4 flex flex-wrap justify-between gap-x-4 gap-y-1">
              <span>Plate 01 // The photographer</span>
              <span>Mumbai</span>
            </figcaption>
          </figure>

          <div className="lg:col-span-7">
            <p className="label-caps text-accent">Biography &amp; practice</p>
            <Words
              as="h1"
              id="about-page-heading"
              trigger="load"
              className="mt-4 text-5xl tracking-[-0.03em] md:text-7xl"
            >
              {about.headline.lead} <em className="text-accent">{about.headline.emphasis}</em>
            </Words>

            <figure className="border-line mt-8 border-l-2 pl-6">
              <blockquote>
                <p className="font-serif text-2xl leading-snug italic">
                  &ldquo;{site.aboutQuote}&rdquo;
                </p>
              </blockquote>
              <figcaption className="label-caps text-muted mt-3">
                {site.shortName}, artist statement
              </figcaption>
            </figure>

            <div className="mt-8 max-w-xl space-y-5 text-lg">
              {about.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="border-line mt-10 grid grid-cols-3 gap-6 border-y py-8">
              {site.stats.map((item) => (
                <Stat key={item.label} value={item.value} suffix={item.suffix} label={item.label} />
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink to="/portfolio">View the portfolio</ButtonLink>
              <ButtonLink to="/contact" variant="outline">
                Start an enquiry
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="pillars-heading" className="bg-surface py-24 md:py-32">
        <Container>
          <SectionHeading
            id="pillars-heading"
            eyebrow="Ethos & conviction"
            title="The three pillars of practice"
          />
          <Reveal as="ol" stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {about.pillars.map((pillar, index) => (
              <li key={pillar.title} className="bg-bg border-line border p-6">
                <p className="label-caps text-accent">
                  Pillar {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-6 text-2xl leading-snug">{pillar.title}</h3>
                <p className="text-muted mt-3 text-sm">{pillar.description}</p>
              </li>
            ))}
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="field-note-heading" className="py-24 md:py-32">
        <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <div className="bg-surface aspect-16/10 overflow-hidden">
              <ResponsiveImage
                id={about.fieldImage.id}
                alt={about.fieldImage.alt}
                sizes="(min-width: 1440px) 740px, (min-width: 1024px) 58vw, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal className="lg:col-span-5">
            <p className="label-caps text-accent">From the field notes</p>
            <h2
              id="field-note-heading"
              className="mt-3 text-4xl leading-tight tracking-[-0.02em] md:text-5xl"
            >
              {about.fieldNote.title}
            </h2>
            <blockquote className="mt-6">
              <p className="text-muted text-lg">&ldquo;{about.fieldNote.quote}&rdquo;</p>
            </blockquote>
            <p className="label-caps text-muted mt-6">{about.fieldNote.place}</p>
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="journey-heading" className="bg-surface py-24 md:py-32">
        <Container>
          <SectionHeading
            id="journey-heading"
            eyebrow="The road so far"
            title="Six years, one frame at a time"
          />
          <Reveal as="ol" stagger className="border-line mt-12 border-t">
            {about.journey.map((step) => (
              <li
                key={step.year}
                className="border-line grid gap-2 border-b py-6 md:grid-cols-12 md:gap-8"
              >
                <p className="label-caps text-accent md:col-span-2">{step.year}</p>
                <h3 className="font-serif text-2xl md:col-span-4">{step.title}</h3>
                <p className="text-muted md:col-span-6">{step.text}</p>
              </li>
            ))}
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="kit-heading" className="py-24 md:py-32">
        <Container>
          <SectionHeading
            id="kit-heading"
            eyebrow="Technical inventory"
            title="Equipment & studio kit"
          />
          <Reveal as="ul" stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {about.kit.map((group) => {
              const Icon = kitIcons[group.title] ?? Lightbulb;
              return (
                <li key={group.title} className="bg-surface border-line border p-6">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="label-caps text-accent">{group.title}</h3>
                    <Icon size={20} strokeWidth={1.25} aria-hidden="true" className="text-muted" />
                  </div>
                  <ul className="mt-6 space-y-3">
                    {group.items.map((item) => (
                      <li key={item} className="border-line border-b pb-3 text-sm last:border-b-0">
                        {item}
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </Reveal>
        </Container>
      </section>

      {about.recognition.length > 0 && (
        <section aria-labelledby="recognition-heading" className="bg-surface py-24 md:py-32">
          <Container>
            <SectionHeading
              id="recognition-heading"
              eyebrow="Recognition"
              title="Honours & selected features"
            />
            <ul className="border-line mt-12 border-t">
              {about.recognition.map((item) => (
                <li
                  key={`${item.year}-${item.title}`}
                  className="border-line grid gap-2 border-b py-6 md:grid-cols-12 md:gap-8"
                >
                  <p className="label-caps text-accent md:col-span-2">{item.year}</p>
                  <h3 className="font-serif text-2xl md:col-span-5">{item.title}</h3>
                  <p className="text-muted md:col-span-5">{item.detail}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <section aria-labelledby="area-heading" className="py-24 md:py-32">
        <Container>
          <SectionHeading
            id="area-heading"
            eyebrow="Booking calendar"
            title="2027 availability and travel"
          />
          <p className="text-muted mt-5 max-w-xl text-sm">{about.serviceArea}</p>
          <Reveal as="ul" stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {about.availability.map((slot) => (
              <li key={slot.quarter} className="bg-surface border-line flex flex-col border p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="label-caps text-muted">{slot.months}</p>
                  <p
                    className={`label-caps border px-2 py-1 ${slot.status === "Limited"
                      ? "border-accent text-accent"
                      : "border-line text-muted"
                      }`}
                  >
                    {slot.status}
                  </p>
                </div>
                <h3 className="mt-6 font-serif text-3xl">{slot.quarter}</h3>
                <p className="text-muted mt-3 text-sm">{slot.note}</p>
              </li>
            ))}
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="concept-heading" className="pb-24 md:pb-32">
        <Container>
          <div className="border-line border p-6 md:p-8">
            <h2 id="concept-heading" className="label-caps text-accent">
              About this concept project
            </h2>
            <p className="text-muted mt-3 max-w-3xl text-sm">
              {site.shortName} is a fictional photographer, created to show what a professional
              photography website can look like. The site was designed and built by{" "}
              {site.builtBy.name}. {site.builtBy.imageNote}
            </p>
            {site.builtBy.href && (
              <a
                href={site.builtBy.href}
                target="_blank"
                rel="noopener noreferrer"
                className="label-caps hover:text-accent mt-5 inline-flex items-center gap-2 underline underline-offset-8 transition-colors"
              >
                Want a website like this for your own work? Get in touch
                <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
          </div>
        </Container>
      </section>

      <CtaBanner
        eyebrow="Direct collaboration"
        title="Have a story that deserves honest light?"
        text="I take on a limited number of commissions each season, so every project gets proper attention."
        buttonLabel="Collaborate with Arjun"
      />
    </>
  );
}