import { Search } from "lucide-react";
import { useId, useState } from "react";
import { Link } from "react-router";
import { searchWork } from "~/lib/search";

// A search box for the portfolio and archive. Results appear as you type.
export function ArchiveSearch() {
    const [query, setQuery] = useState("");
    const inputId = useId();
    const trimmed = query.trim();
    const hits = trimmed.length >= 2 ? searchWork(trimmed) : [];

    return (
        <div role="search" className="max-w-md">
            <label htmlFor={inputId} className="label-caps text-muted flex items-center gap-2">
                <Search size={14} strokeWidth={1.5} aria-hidden="true" />
                Search the archive
            </label>
            <input
                id={inputId}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="A project, place or year"
                autoComplete="off"
                className="text-fg placeholder:text-muted border-field mt-2 block min-h-12 w-full border-0 border-b bg-transparent py-2 text-base"
            />

            <div role="status" className="text-muted mt-3 text-sm">
                {trimmed.length >= 2 &&
                    (hits.length === 0
                        ? "No matching work found. Try a place or a year."
                        : `${hits.length} ${hits.length === 1 ? "result" : "results"} found.`)}
            </div>

            {hits.length > 0 && (
                <ul className="border-line mt-2 border-t">
                    {hits.map((hit) => (
                        <li key={`${hit.title}-${hit.meta}`} className="border-line border-b py-3">
                            {hit.href ? (
                                <Link to={hit.href} className="hover:text-accent font-serif text-xl">
                                    {hit.title}
                                </Link>
                            ) : (
                                <span className="font-serif text-xl">{hit.title}</span>
                            )}
                            <span className="label-caps text-muted mt-1 block">{hit.meta}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}