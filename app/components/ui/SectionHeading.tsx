import type { ReactNode } from "react";

type Props = {
    id: string; // lets the section name itself after this heading
    eyebrow: string; // the small label above the heading
    title: ReactNode;
    children?: ReactNode; // optional extra on the right, such as a link
};

export function SectionHeading({ id, eyebrow, title, children }: Props) {
    return (
        <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
                <p className="label-caps text-accent">{eyebrow}</p>
                <h2 id={id} className="mt-3 text-4xl leading-tight tracking-[-0.02em] md:text-5xl">
                    {title}
                </h2>
            </div>
            {children}
        </div>
    );
}