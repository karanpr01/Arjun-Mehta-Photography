# Arjun Mehta Photography

Premium photography portfolio and client-enquiry website, built with React, TypeScript, Tailwind CSS and GSAP.

> **Arjun Mehta is a fictional example name.** Replace it with the real photographer's details before publishing. Anything marked `PLACEHOLDER` or `SAMPLE` in the code is not real content, and the photographs in `assets/images-src/` are sample images (see `CREDITS.md`).

## Status

Work in progress: v0.5.0 (all pages, motion, SEO and static pre-rendering are done; testing and deployment are next).

- Scroll-reveal and hero intro animation (GSAP) that switch off for visitors who prefer reduced motion
- Per-page titles, descriptions, canonical links, Open Graph and Twitter tags, structured data (JSON-LD), `sitemap.xml` and `robots.txt`
- Every page pre-rendered to static HTML, with a real 404 status on static hosts

Planned:

- Unit, component and end-to-end tests, then deployment

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

| Command             | What it does                                                           |
| ------------------- | ---------------------------------------------------------------------- |
| `npm run dev`       | Start the local development server                                     |
| `npm run build`     | Build the static site into `build/client` (and create `404.html`)      |
| `npm run preview`   | Serve the built site locally, the way a static host would              |
| `npm run typecheck` | Check the TypeScript types                                             |
| `npm run images`    | Create optimised image sizes from `assets/images-src/`                 |
| `npm run og`        | Make the social-share picture (`public/og-default.jpg`) from the hero  |

## Adding or changing photos

1. Put the original JPG in `assets/images-src/`. Its file name (without `.jpg`) is its `id`.
2. Run `npm run images`. This writes the sizes to `public/images/` and updates `app/data/imageManifest.json`.
3. Reference the `id` in `app/data/projects.ts` or in a component, and add a row to `CREDITS.md`.

## Environment variables

Copy `.env.example` to `.env` and fill in your own value. `.env` is ignored by Git.

| Variable                 | What it is                                                                                                   |
| ------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `VITE_FORMSPREE_FORM_ID` | The code at the end of your Formspree form URL. Leave empty to run the form in demo mode (nothing is sent). |
| `VITE_SITE_URL`          | The public web address, with no slash at the end. Used for canonical links, share tags and the sitemap. It is read when the site is built. |is                                                                                         |



Variables starting with `VITE_` are visible to every visitor. Never put a real secret in one.

## Before publishing

This project ships with sample content. To list every placeholder, run:

```bash
git grep -n "PLACEHOLDER"
```

Then:

- Replace the sample photographs in `assets/images-src/`, run `npm run images`, and update `CREDITS.md`
- Replace `SAMPLE` and `PLACEHOLDER` text in `app/data/` with the photographer's confirmed details
- Add a real Formspree form ID and send a test enquiry
- Have the Privacy page reviewed by a qualified person, and fill in its placeholders

## Folder structure

```
app/
├── components/
│   ├── forms/      Enquiry form
│   ├── gallery/    Photo components (ResponsiveImage, ProjectCard, FilterBar, Lightbox, ProjectGallery)
│   ├── layout/     Header, Footer, MobileMenu, ThemeToggle, SkipLink
│   ├── motion/     Scroll-reveal wrapper (GSAP)
│   ├── sections/   Page sections (Hero, FeaturedWorks, ServiceCard, NotFoundContent, ...)
│   └── ui/         Small building blocks (Container, ButtonLink, SectionHeading, Field, Accordion)
├── data/           Content as typed data (site, projects, services, navigation)
├── hooks/          Shared React logic (useTheme)
├── lib/            Non-visual helpers (theme init script, enquiry schema, form submit helper)
├── routes/         One file per page
├── styles/         Global CSS and design tokens
├── root.tsx        HTML shell shared by every page
└── routes.ts       URL → page map
assets/images-src/  Original photos (not served directly)
public/             Files served as they are (generated images live in public/images/)
scripts/            Build-time helper scripts (images, share picture, 404 copy)
```

## Screenshots

_Coming soon._

## Deployment

_Coming soon._
