import { ButtonLink } from "~/components/ui/ButtonLink";
import { Container } from "~/components/ui/Container";
import { site } from "~/data/site";

export function CtaBanner() {
    return (
        <section aria-labelledby="cta-heading" className="py-24 text-center md:py-32">
            <Container>
                <p className="label-caps text-accent">Commission a shoot</p>
                <h2
                    id="cta-heading"
                    className="mx-auto mt-4 max-w-3xl text-4xl leading-tight tracking-[-0.02em] md:text-6xl"
                >
                    Have a story waiting to be told?
                </h2>
                <p className="text-muted mx-auto mt-6 max-w-xl">
                    Tell us about the project, the mood you have in mind and your timeline.
                </p>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                    <ButtonLink to="/contact">Start an enquiry</ButtonLink>
                    <a href={`mailto:${site.email}`} className="hover:text-accent underline underline-offset-8">
                        {site.email}
                    </a>
                </div>
            </Container>
        </section>
    );
}