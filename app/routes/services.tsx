import type { Route } from "./+types/services";
import { CtaBanner } from "~/components/sections/CtaBanner";
import { ServiceCard } from "~/components/sections/ServiceCard";
import { Container } from "~/components/ui/Container";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { processSteps } from "~/data/process";
import { services } from "~/data/services";
import { site } from "~/data/site";

export function meta({ }: Route.MetaArgs) {
  return [{ title: "Services & Pricing | Arjun Mehta Photography" }];
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
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="process-heading" className="bg-surface py-24 md:py-32">
        <Container>
          <SectionHeading id="process-heading" eyebrow="Working process" title="How a commission works" />
          <ol className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <li key={step.title} className="border-line border-t pt-6">
                <p className="label-caps text-accent">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 text-2xl leading-snug">{step.title}</h3>
                <p className="text-muted mt-3 text-sm">{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}