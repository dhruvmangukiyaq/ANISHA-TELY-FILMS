# Anisha Tely Films

A dark, editorial portfolio site for a wedding photographer and filmmaker. Built with the Next.js App Router, TypeScript, Tailwind CSS v4, and Framer Motion, with an Express + SQLite backend that stores real wedding enquiries. Gallery, portfolio and review content is still local mock data — there is no CMS.

## Getting started

```bash
npm install
cp .env.example .env   # then set ADMIN_TOKEN
npm run dev            # frontend
npm run dev:server     # enquiry API (separate terminal)
```

Open [http://localhost:3000](http://localhost:3000).

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run dev:server` | Start the Express enquiry API on `:8787`, reloading on change |
| `npm run start:server` | Start the enquiry API without watch mode |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Enquiry API

`server/` is a small Express service. The contact form posts to it directly, so
the API needs CORS for the site origin and its own public URL on the frontend.

| Route | Auth | Purpose |
| --- | --- | --- |
| `POST /api/enquiries` | public (rate-limited, honeypot) | Validate and store an enquiry |
| `GET /api/enquiries` | `x-admin-token` | Inbox: `?status=new&limit=50&offset=0` |
| `GET /api/enquiries/:id` | `x-admin-token` | One enquiry |
| `PATCH /api/enquiries/:id` | `x-admin-token` | Set `status` to `new`, `replied` or `closed` |
| `GET /health` | public | Liveness, whether email notify is configured |

- **Storage** — SQLite at `SQLITE_PATH` (default `server/data/enquiries.db`,
  gitignored) through Node's built-in `node:sqlite`, so there is no native
  module to compile. Requires Node 22.5+; run `node --version` before deploying.
- **Validation** — `server/validate.js` mirrors the browser rules and answers
  `422` with per-field messages, so a stale or bypassed client cannot write junk.
- **Spam** — hidden `company_website` field plus five requests per ten minutes
  per IP (`429`). Set `TRUST_PROXY=1` when the API sits behind a host proxy,
  otherwise every visitor shares the proxy's bucket.
- **Email** — optional. With `MAIL_TO` and `SMTP_URL` (or `SMTP_HOST`/`PORT`/
  `USER`/`PASS`) set, each stored enquiry also mails the studio. A mail failure
  is logged, never returned to the couple, because the enquiry is already saved.

To read the inbox without a UI:

```bash
curl -H "x-admin-token: $ADMIN_TOKEN" "$API_URL/api/enquiries?status=new"
```

## Pages

| Route | Description |
| --- | --- |
| `/` | Hero, manifesto, featured stories, approach, testimonials, press, CTA |
| `/about` | Biography, approach, press, and studio statistics |
| `/services` | Photography, film, and destination services |
| `/services/[slug]` | Collection detail, process, and next/previous navigation |
| `/faq` | Accordion of the questions couples ask most |
| `/portfolio` | Grid of wedding stories |
| `/portfolio/[slug]` | Cover, story, masonry gallery with lightbox, and next/previous navigation |
| `/gallery` | Masonry photo wall with category filters and a fullscreen lightbox |
| `/videos` | Wedding film cards |
| `/reviews` | Couple reviews |
| `/contact` | Enquiry form with validation, WhatsApp, and a map placeholder |
| `not-found` | Custom 404 |

Also included: `app/sitemap.ts`, `app/robots.ts`, and an SVG favicon at `app/icon.svg`.

## Project structure

```
app/                 Routes, layout, global styles, metadata, template
components/          Header, footer, gallery cards, carousel, accordion,
                     scroll animations (Framer Motion), and the enquiry form
data/                Mock content: galleries, portfolio, reviews, videos,
                     services, FAQ, and site settings
lib/                 Shared utilities (e.g. SEO metadata builder)
server/              Express enquiry API: index.js (routes), db.js (SQLite),
                     validate.js (server-side rules), notify.js (SMTP)
public/images/       Photography — a mix of licensed stand-ins and generated
                     placeholders; see Notes
```

### Editing content

- **Brand, contact details, nav, stats, press** — `data/site.ts` (also holds
  the WhatsApp number and the pre-filled message used by the contact page)
- **Galleries and categories** — `data/galleries.ts` (add a gallery and its
  `cover`/`photos` paths; the detail page is generated automatically)
- **Collections, testimonials, FAQ** — `data/collections.ts`,
  `data/testimonials.ts`, `data/faq.ts`
- **Portfolio grid** — `data/portfolio.ts` (6 weddings, each with a cover and
  image list)
- **Photo wall** — `data/gallery.ts` (20 images, each with a `category`; the
  filter tabs read from `galleryCategories`)
- **Services** — `data/services.ts`
- **Reviews** — `data/reviews.ts` (quote, couple, city, country, rating,
  wedding date, source)
- **Films** — `data/videos.ts`; the `youtubeId` values are placeholders, so
  swap them for real IDs before launch. Covers are matched to a gallery by
  couple name.
- **Images** — replace files in `public/images/` keeping the same names, or
  update the paths in the data files. Twelve hero/about/CTA/gallery covers are
  licensed Pexels stand-ins (free for commercial use, no attribution needed);
  the remaining gallery photos are still abstract placeholders. Swap every image
  for Anisha's own work before launch — none of it is hers yet.

## Design system

Theme tokens live in `app/globals.css` under `@theme`:

| Token | Value | Use |
| --- | --- | --- |
| `ink` | `#08080a` | Page background |
| `surface` | `#121216` | Cards and panels |
| `ivory` | `#f3eee4` | Primary text |
| `gold` | `#c9a86a` | Accent |
| `gold-light` | `#e7d3a8` | Highlighted accent |
| `gold-deep` | `#8a6b3b` | Deep accent |
| `danger` | `#e2a58f` | Form validation errors |

Type is set with Cormorant Garamond (display) and Jost (sans) via `next/font`.
Scroll reveals use Framer Motion (`Reveal`), with a subtle page fade (`app/template.tsx`), a reading progress bar (`ScrollProgress`), and full respect for `prefers-reduced-motion`. Per-page SEO metadata is built with `lib/seo.ts`; the root layout adds `viewport`, JSON-LD (`ProfessionalService`), and a noscript fallback for reveals. `next.config.ts` enables AVIF/WebP, caps device sizes, and sets a 30-day image cache TTL.

## Notes

- The enquiry form is live. It validates in the browser, posts to the Express
  API, re-prints server-side field messages on `422`, and only shows the success
  state after the API answers `201`. The frontend needs
  `NEXT_PUBLIC_API_BASE_URL`; unset, it posts to `/api/enquiries` on the site's
  own origin and ends in the error banner.
- The contact map is a styled placeholder, not an embedded map. `mapsHref` in
  `data/site.ts` powers the "Open in Google Maps" link.
- Built against Next.js 16 with Cache Components enabled. Avoid unguarded
  runtime values such as `new Date()` in server components, or prerendering
  will fail.
