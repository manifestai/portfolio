# Charlles Pinon, AI crafter

Portfolio in English and Portuguese: one "sheet" per product, each walking through four stages (think in public, design system, build, run).

- `lib/content.ts` holds every word on the site, in both languages, and the list of products.
- `public/shots/<product>/` holds the screenshots.
- `/` redirects to `/en`; the language switch keeps the current page.

## Run locally

    npm install
    npm run dev

## Deploy

Import this repository in Vercel (framework: Next.js, no environment variables needed).

## Add a product

Add an entry to `products` in `lib/content.ts` and its images under `public/shots/<slug>/`.
