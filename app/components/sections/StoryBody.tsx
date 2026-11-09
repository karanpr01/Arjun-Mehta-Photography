import { ProjectGallery } from "~/components/gallery/ProjectGallery";
import { Reveal } from "~/components/motion/Reveal";
import { EditionPanel } from "~/components/sections/EditionPanel";
import { Container } from "~/components/ui/Container";
import { about } from "~/data/about";
import type { Project } from "~/data/projects";

// The long-form layout for projects that have a written story.
export function StoryBody({ project }: { project: Project }) {
    const story = project.story;
    if (!story) return null;

    // Short names from the kit list: "Sony A7 IV · main full-frame body" becomes "Sony A7 IV".
    const kitNames = about.kit
        .slice(0, 2)
        .flatMap((group) => group.items)
        .map((item) => item.split(" · ")[0]);

    return (
        <>
            <section aria-labelledby="story-intro-heading" className="mt-16 md:mt-24">
                <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                    <Reveal className="lg:col-span-5">
                        <p className="label-caps text-accent">Field perspective</p>
                        <h2 id="story-intro-heading" className="mt-4 text-4xl leading-tight md:text-5xl">
                            {story.intro.title} <em className="text-accent">{story.intro.emphasis}</em>
                        </h2>
                        <p className="label-caps text-muted mt-6">{story.intro.kicker}</p>
                    </Reveal>

                    <Reveal className="space-y-6 lg:col-span-7">
                        {story.intro.paragraphs.map((paragraph, index) => (
                            <p key={paragraph} className={index === 0 ? "text-xl leading-relaxed" : "text-muted"}>
                                {paragraph}
                            </p>
                        ))}
                        <figure className="border-line border-l-2 pl-6">
                            <blockquote>
                                <p className="font-serif text-2xl leading-snug italic">
                                    &ldquo;{story.pullQuote.text}&rdquo;
                                </p>
                            </blockquote>
                            <figcaption className="label-caps text-muted mt-3">{story.pullQuote.by}</figcaption>
                        </figure>
                    </Reveal>
                </Container>
            </section>

            <section aria-label="Photographs" className="mt-20 md:mt-28">
                <Container>
                    <ProjectGallery images={project.gallery ?? []} />
                </Container>
            </section>

            <section aria-labelledby="field-notes-heading" className="mt-24 md:mt-32">
                <Container>
                    <Reveal className="flex flex-wrap items-end justify-between gap-6">
                        <div>
                            <p className="label-caps text-accent">Expedition notes</p>
                            <h2 id="field-notes-heading" className="mt-3 text-4xl leading-tight md:text-5xl">
                                Field Notes &amp; Technical Realities
                            </h2>
                        </div>
                    </Reveal>

                    <Reveal as="ul" stagger className="mt-12 grid gap-6 md:grid-cols-3">
                        {story.fieldNotes.map((note) => (
                            <li key={note.title} className="bg-surface border-line flex flex-col border p-6">
                                <p className="label-caps text-accent">{note.label}</p>
                                <h3 className="mt-4 text-2xl leading-snug">{note.title}</h3>
                                <p className="text-muted mt-3 text-sm">{note.text}</p>
                                <p className="label-caps text-muted border-line mt-auto border-t pt-4">
                                    {note.footnote}
                                </p>
                            </li>
                        ))}
                    </Reveal>

                    <Reveal className="border-line mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 border p-5">
                        <p className="label-caps text-accent">Field kit manifest</p>
                        <ul className="text-muted flex flex-wrap gap-x-6 gap-y-1 text-sm">
                            {kitNames.map((name) => (
                                <li key={name}>{name}</li>
                            ))}
                        </ul>
                    </Reveal>
                </Container>
            </section>

            <section aria-labelledby="story-end-heading" className="mt-24 md:mt-32">
                <h2 id="story-end-heading" className="sr-only">
                    Client words and print edition
                </h2>
                <Container className="grid gap-8 lg:grid-cols-12">
                    <Reveal className="lg:col-span-7">
                        <figure className="bg-surface border-line flex h-full flex-col justify-between border p-8 md:p-12">
                            <div>
                                <p className="label-caps text-accent">Client words</p>
                                <blockquote className="mt-6">
                                    <p className="font-serif text-3xl leading-snug italic md:text-4xl">
                                        &ldquo;{story.testimonial.text}&rdquo;
                                    </p>
                                </blockquote>
                            </div>
                            <figcaption className="label-caps text-muted mt-8">
                                {story.testimonial.by}
                            </figcaption>
                        </figure>
                    </Reveal>
                    <Reveal className="lg:col-span-5">
                        <EditionPanel edition={story.edition} />
                    </Reveal>
                </Container>
            </section>
        </>
    );
}