import { CountUp } from "~/components/motion/CountUp";

type Props = {
    value: number;
    suffix?: string;
    label: string;
};

// One big number with a label under it. The number counts up when it scrolls into view.
export function Stat({ value, suffix = "", label }: Props) {
    return (
        <div>
            <p className="font-serif text-5xl leading-none">
                <CountUp value={value} suffix={suffix} />
            </p>
            <p className="label-caps text-muted mt-3">{label}</p>
        </div>
    );
}