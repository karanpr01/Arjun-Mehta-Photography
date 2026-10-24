import type { ReactNode } from "react";

// What every input needs so screen readers connect it to its label, hint and error.
type ControlProps = {
    id: string;
    "aria-invalid": true | undefined;
    "aria-describedby": string | undefined;
};

type Props = {
    id: string;
    label: string;
    required?: boolean;
    hint?: string;
    error?: string;
    children: (control: ControlProps) => ReactNode;
};

export function Field({ id, label, required = false, hint, error, children }: Props) {
    const hintId = hint ? `${id}-hint` : undefined;
    const errorId = error ? `${id}-error` : undefined;
    const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

    return (
        <div>
            <label htmlFor={id} className="label-caps text-muted block">
                {label}
                {required ? (
                    <span aria-hidden="true" className="text-accent"> *</span>
                ) : (
                    <span className="normal-case tracking-normal"> (optional)</span>
                )}
            </label>
            {children({ id, "aria-invalid": error ? true : undefined, "aria-describedby": describedBy })}
            {hint && (
                <p id={hintId} className="text-muted mt-2 text-sm">
                    {hint}
                </p>
            )}
            {error && (
                <p id={errorId} className="text-error mt-2 text-sm">
                    {error}
                </p>
            )}
        </div>
    );
}

// Shared look for text boxes, selects and text areas: a single line underneath.
export const controlClass =
    "bg-transparent text-fg placeholder:text-muted border-field aria-[invalid=true]:border-error mt-2 block min-h-12 w-full border-0 border-b py-2 text-base";