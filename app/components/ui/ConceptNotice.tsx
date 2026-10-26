import { site } from "~/data/site";

// A short, honest note: this is a concept project and the photographer is fictional.
export function ConceptNotice({ className = "" }: { className?: string }) {
  return (
    <p className={`border-line text-muted border p-4 text-sm ${className}`}>
      <strong className="text-fg">Concept project.</strong> {site.shortName} is a fictional
      photographer, created to show what a professional photography website can look like. Messages
      sent through this form are received by {site.builtBy.name}, the developer.
    </p>
  );
}