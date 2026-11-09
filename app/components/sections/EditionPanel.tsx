import { ButtonLink } from "~/components/ui/ButtonLink";
import type { ProjectStory } from "~/data/projects";

// The limited-edition print panel: how many prints exist and how many are already taken.
export function EditionPanel({ edition }: { edition: ProjectStory["edition"] }) {
    const left = edition.total - edition.claimed;

    return (
        <aside aria-label="Print edition" className="bg-surface border-line border p-8">
            <p className="label-caps text-accent">Collection release</p>
            <h3 className="mt-3 text-3xl leading-snug">{edition.title}</h3>
            <p className="text-muted mt-3 text-sm">{edition.text}</p>

            <div className="mt-8">
                <div className="label-caps flex items-baseline justify-between gap-4">
                    <span className="text-muted">Edition availability</span>
                    <span className="text-accent">
                        {edition.claimed} / {edition.total} claimed
                    </span>
                </div>
                <div
                    role="meter"
                    aria-label="Prints claimed"
                    aria-valuemin={0}
                    aria-valuemax={edition.total}
                    aria-valuenow={edition.claimed}
                    aria-valuetext={`${edition.claimed} of ${edition.total} prints claimed, ${left} remaining`}
                    className="bg-line mt-3 h-0.5 w-full"
                >
                    <div
                        className="bg-accent h-full"
                        style={{ width: `${(edition.claimed / edition.total) * 100}%` }}
                    />
                </div>
                <p className="text-muted mt-3 text-sm">
                    {left === 0 ? "This edition is sold out." : `${left} prints remaining.`}
                </p>
            </div>

            <ButtonLink to="/contact?service=other" className="mt-8">
                Request a collector print
            </ButtonLink>
        </aside>
    );
}