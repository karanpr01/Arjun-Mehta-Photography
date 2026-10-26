import type { Route } from "./+types/privacy";
import { Container } from "~/components/ui/Container";
import { privacySections } from "~/data/privacy";
import { pageMeta } from "~/lib/seo";

export function meta({ }: Route.MetaArgs) {
  return pageMeta({
    title: "Privacy Policy",
    description:
      "What this website collects, how enquiries are handled, and how cookies and local storage are used.",
    path: "/privacy",
  });
}

export default function Privacy() {
  return (
    <>
      <section aria-labelledby="privacy-heading" className="pt-16 pb-12 md:pt-24">
        <Container>
          <p className="label-caps text-accent">Legal</p>
          <h1 id="privacy-heading" className="mt-4 text-5xl tracking-[-0.03em] md:text-7xl">
            Privacy Policy
          </h1>
          <p className="border-line text-muted mt-8 max-w-2xl border p-4 text-sm">
            <strong className="text-fg">Concept project.</strong> This page describes how this demo
            website really works.
          </p>
        </Container>
      </section>

      <Container className="grid gap-12 pb-24 md:pb-32 lg:grid-cols-12 lg:gap-16">
        <nav aria-label="On this page" className="lg:col-span-3 lg:sticky lg:top-28 lg:self-start">
          <p className="label-caps text-accent">On this page</p>
          <ol className="mt-4 space-y-2 text-sm">
            {privacySections.map((section, index) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="hover:text-accent underline-offset-4 hover:underline">
                  {String(index + 1).padStart(2, "0")}. {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="space-y-14 lg:col-span-9">
          {privacySections.map((section, index) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`} className="scroll-mt-28">
              <p className="label-caps text-accent">{String(index + 1).padStart(2, "0")}</p>
              <h2 id={`${section.id}-heading`} className="mt-2 text-3xl leading-snug md:text-4xl">
                {section.title}
              </h2>
              <div className="mt-5 max-w-2xl space-y-4 text-lg">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.list && (
                  <ul className="list-disc space-y-1 pl-6">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.link && (
                  <p>
                    <a
                      href={section.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent underline underline-offset-4"
                    >
                      {section.link.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </p>
                )}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}