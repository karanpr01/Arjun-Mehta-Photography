import type { Category } from "~/data/projects";

type Props = {
    categories: readonly Category[];
    active: Category | null;
    counts: Record<string, number>;
    total: number;
    onChange: (category: Category | null) => void;
};

const base = "label-caps min-h-11 border px-4 py-3 transition-colors";
const off = "border-line text-fg hover:border-accent";
const on = "border-btn bg-btn text-btn-fg";

export function FilterBar({ categories, active, counts, total, onChange }: Props) {
    return (
        <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-3">
            <button
                type="button"
                aria-pressed={active === null}
                onClick={() => onChange(null)}
                className={`${base} ${active === null ? on : off}`}
            >
                All works ({total})
            </button>

            {categories.map((category) => (
                <button
                    key={category}
                    type="button"
                    aria-pressed={active === category}
                    onClick={() => onChange(category)}
                    className={`${base} ${active === category ? on : off}`}
                >
                    {category} ({counts[category] ?? 0})
                </button>
            ))}
        </div>
    );
}