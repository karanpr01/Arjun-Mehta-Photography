# Arjun Mehta Photography

Premium photography portfolio and client-enquiry website, built with React, TypeScript, Tailwind CSS and GSAP.

> **Arjun Mehta is a fictional example name.** Replace it with the real photographer's details before publishing. Anything marked `PLACEHOLDER` in the code is not real content.

## Status

Work in progress: v0.1.0 (foundation: routes, design tokens, layout shell).

## Planned features

- Light and dark themes with a persistent preference
- Responsive layouts from phone to desktop
- Filterable portfolio, project story pages and an accessible lightbox
- Services and pricing, About, Privacy and a custom 404
- Validated enquiry form
- SEO (pre-rendered pages, meta tags, sitemap) and WCAG 2.2 AA accessibility target
- Unit, component and end-to-end tests

## Tech stack

React 19, TypeScript, Vite, React Router (framework mode), Tailwind CSS 4, GSAP, Lucide, React Hook Form + Zod, Formspree, Vitest, Playwright.

## Getting started

Requires Node.js 22.22 or newer.

```bash
git clone https://github.com/YOUR-USERNAME/arjun-mehta-photography.git
cd arjun-mehta-photography
npm install
npm run dev
```

Then open http://localhost:5173.

## Scripts

| Command             | What it does                      |
| ------------------- | --------------------------------- |
| `npm run dev`       | Start the local development server |
| `npm run build`     | Create a production build         |
| `npm run typecheck` | Check the TypeScript types        |

## Folder structure

```
app/
├── components/   Reusable pieces (layout/, ui/)
├── data/         Content as typed data (site.ts)
├── routes/       One file per page
├── styles/       Global CSS and design tokens
├── root.tsx      HTML shell shared by every page
└── routes.ts     URL → page map
```

## Screenshots

_Coming soon._

## Deployment

_Coming soon._