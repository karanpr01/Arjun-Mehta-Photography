import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import type { Route } from "./+types/services";
import { Reveal } from "~/components/motion/Reveal";
import { CtaBanner } from "~/components/sections/CtaBanner";
import { ServiceCard } from "~/components/sections/ServiceCard";
import { Accordion } from "~/components/ui/Accordion";
import { Container } from "~/components/ui/Container";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { Stat } from "~/components/ui/Stat";
import { faqs } from "~/data/faqs";
import { ticker } from "~/data/home";
import { processSteps } from "~/data/process";
import { services } from "~/data/services";
import { site } from "~/data/site";
import { pageMeta } from "~/lib/seo";

export function meta({ }: Route.MetaArgs) {
  return pageMeta({
    title: "Services & Pricing",
    description:
      "Photography services offered by Arjun Mehta, how a commission works, and answers to common questions.",
    path: "/services",
  });
}

// The quick facts under the page title.
const essentials = [
  { label: "Base", value: "Mumbai, India" },
  { label: "Cameras", value: "Sony A7 IV · Fujifilm" },
  { label: "Turnaround", value: "5 to 14 business days" },
  { label: "Licensing", value: "Matched to each package" },
];

export default function Services() {
  return (
    <>
      <section aria-labelledby="services-page-heading" className="pt-16 pb-12 md:pt-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-3xl">
              <p className="label-caps text-accent">Rates &amp; commissions</p>
              <h1
                id="services-page-heading"
                className="mt-4 text-5xl tracking-[-0.03em] md:text-7xl"
              >
                Commissioned Services &amp; <em className="text-accent">Engagements</em>
              </h1>
              <p className="text-muted mt-6 max-w-xl">
                Choose the kind of project you have in mind, then tell me the details. I work with
                independent labels, magazines, architects, studios and couples, in India and abroad.
              </p>
            </div>
            <p className="label-caps border-line border px-4 py-3">{ticker[0]}</p>
          </div>

          <dl className="border-line bg-line mt-12 grid gap-px border sm:grid-cols-2 lg:grid-cols-4">
            {essentials.map((item) => (
              <div key={item.label} className="bg-bg p-5">
                <dt className="label-caps text-muted">{item.label}</dt>
                <dd className="mt-2 text-sm">{item.value}</dd>
              </div>
            ))}
          </dl>
          <p className="text-muted mt-6 max-w-2xl text-sm">{site.pricingNote}</p>
        </Container>
      </section>

      <section aria-labelledby="service-list-heading" className="pb-24 md:pb-32">
        <Container>
          <h2 id="service-list-heading" className="sr-only">
            Available services
          </h2>
          <Reveal stagger className="grid gap-6 md:grid-cols-2">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="process-heading" className="bg-surface py-24 md:py-32">
        <Container>
          <SectionHeading
            id="process-heading"
            eyebrow="Working process"
            title="The four-stage production sequence"
          />
          <p className="text-muted mt-5 max-w-xl text-sm">
            Every commission follows the same calm sequence, so you always know what happens next.
          </p>
          <Reveal as="ol" stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <li key={step.title} className="bg-bg border-line flex flex-col border p-6">
                <p className="text-accent font-serif text-4xl">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-6 text-2xl leading-snug">{step.title}</h3>
                <p className="text-muted mt-3 text-sm">{step.description}</p>
                <p className="label-caps text-muted border-line mt-auto border-t pt-4">
                  Timeline · {step.timeline}
                </p>
              </li>
            ))}
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="guarantee-heading" className="py-24 md:py-32">
        <Container>
          <Reveal className="bg-surface border-line grid gap-10 border p-8 md:p-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <p className="label-caps text-accent">Technical guarantee</p>
              <h2
                id="guarantee-heading"
                className="mt-3 text-4xl leading-tight tracking-[-0.02em] md:text-5xl"
              >
                Triple redundancy on location
              </h2>
              <p className="text-muted mt-5 max-w-lg">
                Before I leave any set, every frame is saved in three places: two memory cards
                written in camera, a portable drive on site and a cloud copy the same night. Your
                images never depend on a single device.
              </p>
            </div>
            <div className="grid grid-cols-3 items-start gap-6 lg:col-span-6">
              <Stat value={3} suffix="×" label="Backups per shoot" />
              <Stat
                value={site.stats[1].value}
                suffix={site.stats[1].suffix}
                label={site.stats[1].label}
              />
              <Stat
                value={site.stats[2].value}
                suffix={site.stats[2].suffix}
                label={site.stats[2].label}
              />
            </div>
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="faq-heading" className="pb-24 md:pb-32">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="label-caps text-accent">Inquiries &amp; protocols</p>
            <h2
              id="faq-heading"
              className="mt-3 text-4xl leading-tight tracking-[-0.02em] md:text-5xl"
            >
              Frequently asked questions
            </h2>
            <p className="text-muted mt-5 text-sm">
              Clear terms make for a calmer shoot. If your question isn't here, just ask.
            </p>
            <Link
              to="/contact"
              className="label-caps hover:text-accent mt-6 inline-flex items-center gap-2 underline underline-offset-8 transition-colors"
            >
              Speak with Arjun directly
              <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>
          <div className="lg:col-span-8">
            <Accordion items={faqs} name="faq" />
          </div>
        </Container>
      </section>

      <CtaBanner
        eyebrow="Direct studio enquiries"
        title="Custom briefs welcome. Need a tailored estimate?"
        text="Whether it is a seasonal lookbook, an architectural series or a destination wedding, describe the project and I will send a clear estimate."
        buttonLabel="Request an estimate"
      />
    </>
  );
}