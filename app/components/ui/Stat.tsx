type Props = {
    value: number;
    suffix?: string;
    label: string;
};

// One big number with a label under it. (A count-up animation is added in the motion phase.)
export function Stat({ value, suffix = "", label }: Props) {
    return (
        <div>
            <p className="font-serif text-5xl leading-none">
                {value}
                {suffix}
            </p>
            <p className="label-caps text-muted mt-3">{label}</p>
        </div>
    );
}