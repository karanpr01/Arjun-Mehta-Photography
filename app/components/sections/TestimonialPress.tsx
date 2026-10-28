import { Reveal } from "~/components/motion/Reveal";
import { Container } from "~/components/ui/Container";
import { press, testimonial } from "~/data/home";

// The press names take turns in three typographic styles, as in the design.
const nameStyles = [
    "font-serif text-2xl",
    "font-label text-sm tracking-[0.2em] uppercase",
    "font-serif text-2xl italic",
];

export function TestimonialPress() {
    return (
        <section aria-labelledby="testimonial-heading" className="py-24 md:py-32">
            <Container>
                <h2 id="testimonial-heading" className="sr-only">
                    What clients say, and where the work has appeared
                </h2>

                <Reveal>
                    <figure className="bg-surface border-line border p-8 text-center md:p-16">
                        <p className="label-caps text-accent">Client testimonial</p>
                        <blockquote className="mx-auto mt-8 max-w-4xl">
                            <p className="font-serif text-3xl leading-snug italic md:text-5xl">
                                &ldquo;{testimonial.quote}&rdquo;
                            </p>
                        </blockquote>
                        <figcaption className="mt-8">
                            <span className="label-caps block">{testimonial.name}</span>
                            <span className="text-muted mt-1 block text-sm">{testimonial.role}</span>
                        </figcaption>
                    </figure>
                </Reveal>

                <Reveal className="mt-16 text-center">
                    <p className="label-caps text-muted">Selected press and recognition</p>
                    <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
                        {press.map((item, index) => (
                            <li key={item.name} className={`text-muted ${nameStyles[index % nameStyles.length]}`}>
                                {item.name}
                                <span className="sr-only">, {item.kind}</span>
                            </li>
                        ))}
                    </ul>
                </Reveal>
            </Container>
        </section>
    );
}