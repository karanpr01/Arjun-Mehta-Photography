import { press, ticker } from "~/data/home";

// Mixes the studio news and the publication names into one list: news in serif, names in capitals.
const items = (() => {
    const list: { text: string; kind: "news" | "name" }[] = [];
    const longest = Math.max(ticker.length, press.length);
    for (let i = 0; i < longest; i += 1) {
        if (ticker[i]) list.push({ text: ticker[i], kind: "news" });
        if (press[i]) list.push({ text: press[i].name, kind: "name" });
    }
    return list;
})();

// A slowly scrolling strip under the hero. It is decoration only: the same information
// appears elsewhere on the site, so screen readers skip it, and it stops for reduced motion.
export function Ticker() {
    // Four copies, so the first half is identical to the second and the loop has no jump.
    const track = [...items, ...items, ...items, ...items];

    return (
        <div
            aria-hidden="true"
            className="ticker bg-surface border-line overflow-hidden border-y py-4 whitespace-nowrap"
        >
            <div className="ticker-track inline-flex">
                {track.map((item, index) => (
                    <span
                        key={`${item.text}-${index}`}
                        className={
                            item.kind === "news"
                                ? "text-fg px-7 font-serif text-xl"
                                : "label-caps text-muted px-7"
                        }
                    >
                        {item.text}
                    </span>
                ))}
            </div>
        </div>
    );
}