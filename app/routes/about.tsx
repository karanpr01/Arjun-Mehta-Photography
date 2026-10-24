import type { Route } from "./+types/about";
import { ResponsiveImage } from "~/components/gallery/ResponsiveImage";
import { CtaBanner } from "~/components/sections/CtaBanner";
import { ButtonLink } from "~/components/ui/ButtonLink";
import { Container } from "~/components/ui/Container";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { about } from "~/data/about";
import { site } from "~/data/site";
import { pageMeta } from "~/lib/seo";

export function meta({ }: Route.MetaArgs) {
  return pageMeta({
    title: "About",
    description: "About the photographer Arjun Mehta: approach, working style and where he works.",
    path: "/about",
  });
}

export default function About() {
  return (
    <>
      <section aria-labelledby="about-page-heading" className="pt-16 pb-24 md:pt-24 md:pb-32">
        <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="bg-surface aspect-4/5 overflow-hidden">
              <ResponsiveImage
                id="about-portrait"
                alt={site.aboutAlt}
                sizes="(min-width: 1024px) 40vw, 100vw"
                priority
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="label-caps text-accent">About {site.shortName}</p>
            <h1 id="about-page-heading" className="mt-4 text-5xl tracking-[-0.03em] md:text-7xl">
              Quiet truth, <em className="text-accent">raw grace.</em>
            </h1>

            <div className="mt-8 max-w-xl space-y-5 text-lg">
              {about.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
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
          <SectionHeading id="pillars-heading" eyebrow="Working style" title="Three pillars of practice" />
          <ol className="mt-12 grid gap-10 md:grid-cols-3">
            {about.pillars.map((pillar, index) => (
              <li key={pillar.title} className="border-line border-t pt-6">
                <p className="label-caps text-accent">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 text-2xl leading-snug">{pillar.title}</h3>
                <p className="text-muted mt-3 text-sm">{pillar.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {about.recognition.length > 0 && (
        <section aria-labelledby="recognition-heading" className="py-24 md:py-32">
          <Container>
            <SectionHeading
              id="recognition-heading"
              eyebrow="Recognition"
              title="Honours & selected exhibitions"
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
        <Container className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="label-caps text-accent">Service area</p>
            <h2 id="area-heading" className="mt-3 text-4xl leading-tight tracking-[-0.02em] md:text-5xl">
              Where I work
            </h2>
          </div>
          <p className="text-muted max-w-xl text-lg lg:col-span-8">{about.serviceArea}</p>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}