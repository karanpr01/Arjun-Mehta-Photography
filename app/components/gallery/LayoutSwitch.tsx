export type Layout = "asym" | "cols" | "sheet";

export const layouts: { value: Layout; label: string }[] = [
    { value: "asym", label: "Asymmetric" },
    { value: "cols", label: "3-Column" },
    { value: "sheet", label: "Contact sheet" },
];

export function layoutFromParam(value: string | null): Layout {
    return layouts.find((item) => item.value === value)?.value ?? "asym";
}

type Props = { active: Layout; onChange: (layout: Layout) => void };

const base = "label-caps min-h-11 border px-4 py-3 transition-colors";
const off = "border-line text-fg hover:border-accent";
const on = "border-btn bg-btn text-btn-fg";

export function LayoutSwitch({ active, onChange }: Props) {
    return (
        <div role="group" aria-label="Choose a layout" className="flex flex-wrap gap-3">
            {layouts.map((item) => (
                <button
                    key={item.value}
                    type="button"
                    aria-pressed={active === item.value}
                    onClick={() => onChange(item.value)}
                    className={`${base} ${active === item.value ? on : off}`}
                >
                    {item.label}
                </button>
            ))}
        </div>
    );
}