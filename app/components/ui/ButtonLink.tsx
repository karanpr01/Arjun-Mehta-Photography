import { Link, type LinkProps } from "react-router";
import { Magnetic } from "~/components/motion/Magnetic";

const variants = {
    primary: "bg-btn text-btn-fg hover:bg-btn-hover",
    outline: "border border-line text-fg hover:border-accent",
    onImage: "bg-on-image-accent text-[#0a0a0a] hover:bg-on-image",
} as const;

type Props = LinkProps & { variant?: keyof typeof variants; magnetic?: boolean };

// A link that looks like a button. (A real <a>, because it goes to another page.)
// With `magnetic`, it leans toward the pointer on devices that have a mouse.
export function ButtonLink({
    variant = "primary",
    magnetic = false,
    className = "",
    ...props
}: Props) {
    const link = (
        <Link
            className={`label-caps inline-flex items-center justify-center gap-3 px-8 py-4 transition-colors ${variants[variant]} ${className}`}
            {...props}
        />
    );

    return magnetic ? <Magnetic>{link}</Magnetic> : link;
}