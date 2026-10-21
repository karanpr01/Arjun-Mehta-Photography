import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    {title: "Arjun Mehta Photography"},
     { name: "description", content: "Placeholder description. We write the real one on Day 5." },
  ]
}

export default function Home(){
  return (
    <main className="bg-bg text-fg min-h-screen p-8 md:p-16">
      <p className="label-caps text-accent">Design token Preview</p>
      <h1 className="mt-5 text-5xl md:text-7xl">
        Visual Poetry <em className="text-accent">Through Lights</em> &amp; Shadow.
      </h1>
      <p className="text-muted mt-6 max-w-xl text-lg font-light">
        Body text in Manrope.Editorial headings in EB Garamond. Labels is Outfit.
      </p>
       <div className="bg-surface border-line mt-10 max-w-md border p-6">
        <p className="label-caps text-muted">Surface card</p>
        <p className="mt-2">Hairline border, no rounded corners.</p>
      </div>
      <button className="bg-btn text-btn-fg hover:bg-btn-hover label-caps mt-10 px-8 py-4 transition-colors">
        Enquire
      </button>
    </main>
  )
}