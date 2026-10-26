import type { Route } from "./+types/contact";
import { EnquiryForm } from "~/components/forms/EnquiryForm";
import { Container } from "~/components/ui/Container";
import { site } from "~/data/site";
import { pageMeta } from "~/lib/seo";
import { ConceptNotice } from "~/components/ui/ConceptNotice";

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
        <Container>
          <p className="label-caps text-accent">Contact</p>
          <h1 id="contact-heading" className="mt-4 text-5xl tracking-[-0.03em] md:text-7xl">
            Start a Conversation
          </h1>
          <p className="text-muted mt-6 max-w-xl">
            Tell us about your project and we will get back to you. Fields marked with an asterisk are
            required.
          </p>
          <p className="text-muted mt-2 max-w-xl text-sm">Typical reply time: {site.replyTime}</p>
        </Container>
      </section>

      <section aria-labelledby="enquiry-heading" className="pb-24 md:pb-32">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <h2 id="enquiry-heading" className="sr-only">
              Enquiry form
            </h2>
            <ConceptNotice className="mb-8"/>
            <EnquiryForm />
          </div>

          <aside aria-label="Other ways to get in touch" className="space-y-10 lg:col-span-4">
            <div>
              <p className="label-caps text-accent">Direct enquiries</p>
              <a href={`mailto:${site.email}`} className="mt-3 inline-block font-serif text-2xl hover:underline">
                {site.email}
              </a>
            </div>
            <div>
              <p className="label-caps text-accent">Location</p>
              <p className="text-muted mt-3">{site.location}</p>
            </div>
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
          </aside>
        </Container>
      </section>
    </>
  );
}