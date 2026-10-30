# Namastays Website

Public website for Namastays: discovery pages for stays, food and treks across Nepal. Booking happens in the mobile app; the site sends visitors there.

## Stack
Next.js (App Router) · React 19 · TypeScript · Tailwind CSS 3 · Leaflet maps

## Getting started
```bash
npm install
cp .env.example .env.local   # then set NEXT_PUBLIC_SITE_URL and API_BASE_URL
npm run dev                  # http://localhost:3000
```

**The build reads live data from the backend**, so `API_BASE_URL` must be set wherever you build (including your hosting provider's environment settings). Pages refresh themselves every 10 minutes.

Other scripts: `npm run build`, `npm start`, `npm run typecheck`, `npm run lint`, `npm test`, and `npm run check:api` (calls the real backend through the data layer and prints what it found).

## Layout
- `src/app/` – routes, metadata, sitemap and robots
- `src/views/` – page content components used by the routes
- `src/lib/app.ts` – set `PLAY_STORE_URL` here once the app is on Google Play (until then the site says "Coming soon"), and add social links
- `src/components/` – shared UI
- `src/lib/api/` – server-only client for the backend's public API (`/api/v1/public/**`), DTO types and mappers
- `src/lib/` – domain models, GPX parsing, image and formatting helpers (unit-tested)
- `src/data/` – temporary mock data, being replaced by the API page by page
