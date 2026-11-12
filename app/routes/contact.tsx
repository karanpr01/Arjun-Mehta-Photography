import type { Route } from "./+types/contact";
import { EnquiryForm } from "~/components/forms/EnquiryForm";
import { ResponsiveImage } from "~/components/gallery/ResponsiveImage";
import { Reveal } from "~/components/motion/Reveal";
import { ConceptNotice } from "~/components/ui/ConceptNotice";
import { Container } from "~/components/ui/Container";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { about } from "~/data/about";
import { nextSteps, quickAnswers } from "~/data/contact";
import { site } from "~/data/site";
import { pageMeta } from "~/lib/seo";
import { Words } from "~/components/motion/Words";

export function meta({ }: Route.MetaArgs) {
  return pageMeta({
    title: "Contact",
    description:
      "Start an enquiry with Arjun Mehta: tell him about your project using the enquiry form.",
    path: "/contact",
  });
}

export default function Contact() {
  return (
    <>
      <section aria-labelledby="contact-heading" className="pt-16 pb-12 md:pt-24">
        <Container className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <p className="label-caps text-accent">Commission enquiries · 2027 season</p>
            <Words
              as="h1"
              id="contact-heading"
              trigger="load"
              className="mt-4 text-5xl tracking-[-0.03em] md:text-7xl"
            >
              Start a <em className="text-accent">Conversation</em>
            </Words>
            <p className="text-muted mt-6 max-w-xl">
              I am currently taking commissions in India and abroad. Tell me about your project and
              I will get back to you {site.replyTime}. Fields marked with an asterisk are required.
            </p>
          </div>

          <ul aria-label="Booking status" className="grid gap-3 lg:col-span-5">
            {about.availability.slice(0, 2).map((slot) => (
              <li key={slot.quarter} className="bg-surface border-line border p-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="label-caps text-muted">
                    {slot.quarter} · {slot.months}
                  </p>
                  <p
                    className={`label-caps border px-2 py-1 ${slot.status === "Limited"
                      ? "border-accent text-accent"
                      : "border-line text-muted"
                      }`}
                  >
                    {slot.status}
                  </p>
                </div>
                <p className="mt-2 font-serif text-xl">{slot.note}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="enquiry-heading" className="pb-24 md:pb-32">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <h2 id="enquiry-heading" className="sr-only">
              Enquiry form
            </h2>
            <ConceptNotice className="mb-8" />
            <EnquiryForm />
          </div>

          <aside aria-label="Other ways to get in touch" className="space-y-8 lg:col-span-4">
            <div className="bg-surface border-line border p-6">
              <p className="label-caps text-accent">Direct enquiries</p>
              <a
                href={`mailto:${site.email}`}
                className="mt-3 inline-block font-serif text-2xl break-all hover:underline"
              >
                {site.email}
              </a>
              <p className="text-muted mt-3 text-sm">Reply time: {site.replyTime}</p>
              <p className="text-muted mt-1 text-sm">{site.location}</p>
            </div>

            {site.studios.map((studio) => (
              <figure key={studio.id} className="bg-surface border-line border">
                <div className="bg-bg aspect-video overflow-hidden">
                  <ResponsiveImage
                    id={studio.image.id}
                    alt={studio.image.alt}
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="p-5">
                  <span className="block font-serif text-2xl">{studio.name}</span>
                  <span className="text-muted mt-1 block text-sm">{studio.area}</span>
                  <span className="label-caps text-muted mt-3 block">{studio.note}</span>
                </figcaption>
              </figure>
            ))}

            {site.social.length > 0 && (
              <div>
                <p className="label-caps text-accent">Follow</p>
                <ul className="mt-3 space-y-2">
                  {site.social.map((item) => (
                    <li key={item.label}>
                      <a href={item.href} className="hover:text-accent underline underline-offset-4">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </Container>
      </section>

      <section aria-labelledby="next-heading" className="bg-surface py-24 md:py-32">
        <Container>
          <SectionHeading id="next-heading" eyebrow="Commission protocol" title="What happens next" />
          <Reveal as="ol" stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {nextSteps.map((step, index) => (
              <li key={step.title} className="bg-bg border-line border p-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-accent font-serif text-4xl">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="label-caps text-muted border-line border px-2 py-1">{step.tag}</p>
                </div>
                <h3 className="mt-6 text-2xl leading-snug">{step.title}</h3>
                <p className="text-muted mt-3 text-sm">{step.text}</p>
              </li>
            ))}
          </Reveal>

          <Reveal as="ul" stagger className="mt-6 grid gap-6 md:grid-cols-2">
            {quickAnswers.map((item) => (
              <li key={item.question} className="border-line border p-6">
                <h3 className="font-serif text-2xl">{item.question}</h3>
                <p className="text-muted mt-3 text-sm">{item.answer}</p>
              </li>
            ))}
          </Reveal>
        </Container>
      </section>
    </>
  );
}