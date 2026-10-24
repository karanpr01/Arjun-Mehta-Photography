import type { Route } from "./+types/services";
import { Reveal } from "~/components/motion/Reveal";
import { CtaBanner } from "~/components/sections/CtaBanner";
import { ServiceCard } from "~/components/sections/ServiceCard";
import { Accordion } from "~/components/ui/Accordion";
import { Container } from "~/components/ui/Container";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { faqs } from "~/data/faqs";
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

export default function Services() {
  return (
    <>
      <section aria-labelledby="services-page-heading" className="pt-16 pb-12 md:pt-24">
        <Container>
          <p className="label-caps text-accent">Services &amp; pricing</p>
          <h1 id="services-page-heading" className="mt-4 text-5xl tracking-[-0.03em] md:text-7xl">
            Commissioned Services
          </h1>
          <p className="text-muted mt-6 max-w-xl">
            Choose the kind of project you have in mind, then tell us the details.
          </p>
          <p className="text-muted mt-4 max-w-xl text-sm">{site.pricingNote}</p>
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
            title="How a commission works"
          />
          <Reveal as="ol" stagger className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <li key={step.title} className="border-line border-t pt-6">
                <p className="label-caps text-accent">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 text-2xl leading-snug">{step.title}</h3>
                <p className="text-muted mt-3 text-sm">{step.description}</p>
              </li>
            ))}
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="faq-heading" className="py-24 md:py-32">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="label-caps text-accent">Questions</p>
            <h2
              id="faq-heading"
              className="mt-3 text-4xl leading-tight tracking-[-0.02em] md:text-5xl"
            >
              Frequently asked questions
            </h2>
          </div>
          <div className="lg:col-span-8">
            <Accordion items={faqs} name="faq" />
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}