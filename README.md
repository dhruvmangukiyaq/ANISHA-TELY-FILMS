# Anisha Tely Films

A dark, editorial portfolio site for a wedding photographer and filmmaker. Built with the Next.js App Router, TypeScript, and Tailwind CSS v4. Every piece of content is local mock data — there is no backend, database, or CMS.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Pages

| Route | Description |
| --- | --- |
| `/` | Hero, manifesto, featured stories, approach, testimonials, press, CTA |
| `/about` | Biography, approach, collections, FAQ accordion |
| `/services` | Photography, film, and destination services |
| `/portfolio` | Grid of wedding stories |
| `/portfolio/[slug]` | Cover, story, masonry gallery with lightbox, and next/previous navigation |
| `/gallery` | Masonry photo wall with category filters and a fullscreen lightbox |
| `/videos` | Wedding film cards |
| `/reviews` | Couple reviews |
| `/contact` | Enquiry form (local-only mock submission) |
| `not-found` | Custom 404 |

Also included: `app/sitemap.ts`, `app/robots.ts`, and an SVG favicon at `app/icon.svg`.

## Project structure

```
app/                 Routes, layout, global styles, metadata
components/          Header, footer, gallery cards, carousel, accordion,
                     reveal animation, and the mock enquiry form
data/                Mock content: galleries, collections, testimonials,
                     FAQ, and site settings
public/images/       Locally generated placeholder photography
```

### Editing content

- **Brand, contact details, nav, stats, press** — `data/site.ts`
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
  update the paths in the data files. The current images are abstract,
  bokeh-style placeholders, not real photographs.

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

Type is set with Cormorant Garamond (display) and Jost (sans) via `next/font`.
Animations respect `prefers-reduced-motion`.

## Notes

- The enquiry form is a client-side mock. It validates fields and shows a
  success state, but sends nothing anywhere.
- Built against Next.js 16 with Cache Components enabled. Avoid unguarded
  runtime values such as `new Date()` in server components, or prerendering
  will fail.
