import { Plus } from "lucide-react";
import type { ReactNode } from "react";

type Item = { question: string; answer: ReactNode };

type Props = {
    items: readonly Item[];
    name: string; // items sharing a name act as a group: opening one closes the others
};

// Built on the browser's own <details> and <summary>: keyboard support, screen-reader
// announcements ("collapsed" / "expanded") and even no-JavaScript use come for free.
export function Accordion({ items, name }: Props) {
    return (
        <div className="border-line border-t">
            {items.map((item) => (
                <details key={item.question} name={name} className="group border-line border-b">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left font-serif text-2xl leading-snug [&::-webkit-details-marker]:hidden">
                        {item.question}
                        <Plus
                            size={20}
                            strokeWidth={1.25}
                            aria-hidden="true"
                            className="shrink-0 motion-safe:transition-transform group-open:rotate-45"
                        />
                    </summary>
                    <div className="text-muted max-w-2xl pb-6">{item.answer}</div>
                </details>
            ))}
        </div>
    );
}