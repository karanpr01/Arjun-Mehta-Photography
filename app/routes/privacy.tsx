import type { Route } from "./+types/privacy";
import { Container } from "~/components/ui/Container";
import { lastReviewed, privacySections, privacySummary } from "~/data/privacy";
import { site } from "~/data/site";
import { pageMeta } from "~/lib/seo";

export function meta({ }: Route.MetaArgs) {
  return pageMeta({
    title: "Privacy Policy",
    description:
      "What this website collects, how enquiries are handled, and how cookies and local storage are used.",
    path: "/privacy",
  });
}

const facts = [
  { label: "Last reviewed", value: lastReviewed },
  { label: "Scope", value: "This website only" },
  { label: "Tracking", value: "None" },
  { label: "Privacy contact", value: site.email },
];

export default function Privacy() {
  return (
    <>
      <section aria-labelledby="privacy-heading" className="pt-16 pb-12 md:pt-24">
        <Container>
          <p className="label-caps text-accent">Legal · Concept project</p>
          <h1 id="privacy-heading" className="mt-4 text-5xl tracking-[-0.03em] md:text-7xl">
            Privacy Policy &amp; <em className="text-accent">Disclosures</em>
          </h1>
          <p className="text-muted mt-6 max-w-2xl">
            What this website collects, what it does not, and who sees your enquiry, in plain words.
            This page describes how this demo website really works.
          </p>

          <dl className="border-line bg-line mt-10 grid gap-px border sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((item) => (
              <div key={item.label} className="bg-bg p-5">
                <dt className="label-caps text-muted">{item.label}</dt>
                <dd className="mt-2 text-sm wrap-break-word">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <Container className="grid gap-12 pb-24 md:pb-32 lg:grid-cols-12 lg:gap-16">
        <div className="space-y-6 lg:sticky lg:top-28 lg:col-span-3 lg:self-start">
          <nav aria-label="On this page">
            <p className="label-caps text-accent">On this page</p>
            <ol className="mt-4 space-y-2 text-sm">
              {privacySections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="hover:text-accent underline-offset-4 hover:underline"
                  >
                    {String(index + 1).padStart(2, "0")}. {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <aside aria-label="In short" className="bg-surface border-line border p-5">
            <p className="label-caps text-accent">In short</p>
            <ul className="mt-3 space-y-2 text-sm">
              {privacySummary.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="space-y-14 lg:col-span-9">
          {privacySections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-heading`}
              className="scroll-mt-28"
            >
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
              </div>

              {section.table && (
                <div className="mt-6 overflow-x-auto">
                  <table className="w-full min-w-140 border-collapse text-left text-sm">
                    <caption className="sr-only">{section.title}</caption>
                    <thead>
                      <tr className="label-caps text-muted border-line border-b">
                        {section.table.head.map((cell) => (
                          <th key={cell} scope="col" className="py-3 pr-4 font-normal">
                            {cell}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row) => (
                        <tr key={row[0]} className="border-line border-b">
                          {row.map((cell, cellIndex) =>
                            cellIndex === 0 ? (
                              <th
                                key={cell}
                                scope="row"
                                className="py-4 pr-4 font-serif text-xl font-normal"
                              >
                                {cell}
                              </th>
                            ) : (
                              <td key={cell} className="text-muted py-4 pr-4">
                                {cell}
                              </td>
                            ),
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {section.link && (
                <p className="mt-4 text-lg">
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
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}