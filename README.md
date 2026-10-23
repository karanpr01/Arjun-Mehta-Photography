# Arjun Mehta Photography

Premium photography portfolio and client-enquiry website, built with React, TypeScript, Tailwind CSS and GSAP.

> **Arjun Mehta is a fictional example name.** Replace it with the real photographer's details before publishing. Anything marked `PLACEHOLDER` or `SAMPLE` in the code is not real content, and the photographs in `assets/images-src/` are sample images (see `CREDITS.md`).

## Status

Work in progress: v0.3.0 (Home, portfolio with filters, project story pages and lightbox).

## Features

Done so far:

- Light and dark themes, with a saved preference and no flash on load
- Accessible header, mobile menu (native `<dialog>`) and skip link
- Typed content data for projects and services
- Image pipeline: AVIF, WebP and JPG at several sizes, with responsive `<picture>` markup
- Home page: hero, featured works, services preview, about snippet and call-to-action
- Portfolio grid with category filters kept in the URL, a live result count and an empty state
- Project story pages with breadcrumbs, previous/next links, related work and a real 404 for unknown projects
- Accessible lightbox (Escape, arrow keys, focus returns to the photo)

Planned:

- Services and pricing, About, Privacy and a custom 404 page
- Validated enquiry form
- Motion (GSAP) that respects reduced-motion settings
- SEO (pre-rendered pages, meta tags, sitemap) and a WCAG 2.2 AA accessibility target
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

| Command             | What it does                                           |
| ------------------- | ------------------------------------------------------ |
| `npm run dev`       | Start the local development server                     |
| `npm run build`     | Create a production build                              |
| `npm run typecheck` | Check the TypeScript types                             |
| `npm run images`    | Create optimised image sizes from `assets/images-src/` |

## Adding or changing photos

1. Put the original JPG in `assets/images-src/`. Its file name (without `.jpg`) is its `id`.
2. Run `npm run images`. This writes the sizes to `public/images/` and updates `app/data/imageManifest.json`.
3. Reference the `id` in `app/data/projects.ts` or in a component, and add a row to `CREDITS.md`.

## Folder structure

```
app/
├── components/
│   ├── │   ├── gallery/    Photo components (ResponsiveImage, ProjectCard, FilterBar, Lightbox, ProjectGallery)
│   ├── layout/     Header, Footer, MobileMenu, ThemeToggle, SkipLink
│   ├── sections/   Page sections (Hero, FeaturedWorks, ...)
│   └── ui/         Small building blocks (Container, ButtonLink, SectionHeading)
├── data/           Content as typed data (site, projects, services, navigation)
├── hooks/          Shared React logic (useTheme)
├── lib/            Non-visual helpers (theme init script)
├── routes/         One file per page
├── styles/         Global CSS and design tokens
├── root.tsx        HTML shell shared by every page
└── routes.ts       URL → page map
assets/images-src/  Original photos (not served directly)
public/             Files served as they are (generated images live in public/images/)
scripts/            Build-time helper scripts
```

## Screenshots

_Coming soon._

## Deployment

_Coming soon._
