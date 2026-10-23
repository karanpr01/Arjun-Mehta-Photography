import { Link, type LinkProps } from "react-router";

const variants = {
    primary: "bg-btn text-btn-fg hover:bg-btn-hover",
    outline: "border border-line text-fg hover:border-accent",
    onImage: "bg-on-image-accent text-[#0a0a0a] hover:bg-on-image",
} as const;

type Props = LinkProps & { variant?: keyof typeof variants };

// A link that looks like a button. (A real <a>, because it goes to another page.)
export function ButtonLink({ variant = "primary", className = "", ...props }: Props) {
    return (
        <Link
            className={`label-caps inline-flex items-center justify-center gap-3 px-8 py-4 transition-colors ${variants[variant]} ${className}`}
            {...props}
        />
    );
}