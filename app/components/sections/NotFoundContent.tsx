import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { ArchiveSearch } from "~/components/ui/ArchiveSearch";
import { ButtonLink } from "~/components/ui/ButtonLink";
import { Container } from "~/components/ui/Container";
import { FilmFrame } from "~/components/ui/FilmFrame";

const departures = [
    { to: "/portfolio", label: "Selected works", note: "Browse the portfolio" },
    { to: "/services", label: "Services & pricing", note: "See what is offered" },
    { to: "/about", label: "About", note: "Meet the photographer" },
    { to: "/contact", label: "Contact", note: "Start an enquiry" },
] as const;

// Used by the /not-found page AND by the root error page when a project is missing.
export function NotFoundContent() {
    return (
        <>
            <section aria-labelledby="not-found-heading" className="pt-12 pb-24 md:pt-16 md:pb-32">
                <Container>
                    <div className="border-line label-caps flex flex-wrap items-center justify-between gap-4 border-b pb-4">
                        <span className="text-accent">Error 404 // frame out of sequence</span>
                        <span className="text-muted">Roll 120 · Exp 00</span>
                    </div>

                    <div className="mt-12 grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
                        <div className="lg:col-span-7">
                            <h1
                                id="not-found-heading"
                                className="max-w-3xl text-5xl leading-[1.08] tracking-[-0.03em] md:text-7xl"
                            >
                                The frame you are seeking has <em className="text-accent">drifted</em> beyond the
                                archive.
                            </h1>
                            <p className="text-muted mt-6 max-w-xl text-lg">
                                The page may have moved, or the address may have a typo. Try one of the places
                                below, or search the archive.
                            </p>
                            <div className="mt-10 flex flex-wrap gap-4">
                                <ButtonLink to="/">Return home</ButtonLink>
                                <ButtonLink to="/portfolio" variant="outline">
                                    Browse the portfolio
                                </ButtonLink>
                            </div>
                            <div className="mt-12">
                                <ArchiveSearch />
                            </div>
                        </div>

                        <div className="lg:col-span-5">
                            <FilmFrame />
                        </div>
                    </div>
                </Container>
            </section>

            <section aria-labelledby="departures-heading" className="bg-surface py-20 md:py-24">
                <Container>
                    <p className="label-caps text-accent">Wayfinding</p>
                    <h2 id="departures-heading" className="mt-3 text-3xl leading-tight md:text-4xl">
                        Curated departures
                    </h2>
                    <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {departures.map((item) => (
                            <li key={item.to}>
                                <Link
                                    to={item.to}
                                    className="group border-line hover:border-accent flex h-full items-start justify-between gap-4 border p-6 transition-colors"
                                >
                                    <span>
                                        <span className="block font-serif text-2xl leading-snug">{item.label}</span>
                                        <span className="text-muted mt-2 block text-sm">{item.note}</span>
                                    </span>
                                    <ArrowRight
                                        size={20}
                                        strokeWidth={1.25}
                                        aria-hidden="true"
                                        className="mt-1 shrink-0"
                                    />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Container>
            </section>
        </>
    );
}