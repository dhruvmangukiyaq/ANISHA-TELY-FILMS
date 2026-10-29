import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTA from "@/components/CTA";
import GalleryLightbox from "@/components/GalleryLightbox";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import {
  galleries,
  getAdjacentGalleries,
  getGallery,
} from "@/data/galleries";

// Every slug is prerendered; allow the route to resolve params before rendering.
export const instant = false;

type GalleryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return galleries.map((gallery) => ({ slug: gallery.slug }));
}

export async function generateMetadata({
  params,
}: GalleryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const gallery = getGallery(slug);

  if (!gallery) {
    return { title: "Story not found" };
  }

  return {
    title: `${gallery.couple} — ${gallery.location}`,
    description: gallery.excerpt,
    openGraph: {
      title: `${gallery.couple} — ${gallery.location}`,
      description: gallery.excerpt,
      images: [{ url: gallery.cover, alt: `${gallery.couple} wedding` }],
    },
  };
}

export default async function GalleryPage({ params }: GalleryPageProps) {
  const { slug } = await params;
  const gallery = getGallery(slug);

  if (!gallery) {
    notFound();
  }

  const { previous, next } = getAdjacentGalleries(gallery.slug);

  return (
    <>
      <section className="relative isolate flex h-[80svh] min-h-[560px] flex-col justify-end overflow-hidden">
        <Image
          src={gallery.cover}
          alt={`${gallery.couple} — ${gallery.location}`}
          fill
          priority
          sizes="100vw"
          className="animate-slow-zoom object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/10 to-ink" />

        <div className="container-x relative z-10 pb-12 md:pb-16">
          <Reveal>
            <p className="eyebrow flex items-center gap-4">
              <span aria-hidden className="h-px w-10 bg-gold/60" />
              {gallery.category} · {gallery.year}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-6 font-display text-[clamp(2.6rem,6vw,5rem)] font-light leading-[1] text-ivory">
              {gallery.couple}
            </h1>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-gold/90">
              {gallery.location}
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 max-w-xl font-display text-xl italic text-gold-light/90 md:text-2xl">
              {gallery.title}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-line/60 bg-ink-soft">
        <div className="container-x grid grid-cols-2 gap-y-8 py-8 md:grid-cols-4 md:py-10">
          {[
            { label: "Location", value: gallery.location },
            { label: "Venue", value: gallery.venue },
            { label: "Date", value: gallery.date },
            { label: "Photography & Film", value: "Anisha Tely" },
          ].map((item) => (
            <div key={item.label} className="md:px-6 md:first:pl-0 md:last:pr-0">
              <p className="text-[9px] uppercase tracking-[0.28em] text-muted-2">
                {item.label}
              </p>
              <p className="mt-2 text-sm text-ivory/85">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionLabel>The Story</SectionLabel>
            <p className="mt-8 font-display text-xl leading-relaxed text-ivory/85 md:text-2xl">
              {gallery.intro}
            </p>
          </div>
          <div className="lg:col-span-8">
            <div className="space-y-6">
              {gallery.story.map((paragraph) => (
                <Reveal key={paragraph.slice(0, 24)}>
                  <p className="text-sm leading-[1.9] text-muted md:text-[0.95rem]">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-line/60 pt-8 sm:grid-cols-4">
              {gallery.credits.map((credit) => (
                <div key={credit.label}>
                  <dt className="text-[9px] uppercase tracking-[0.26em] text-muted-2">
                    {credit.label}
                  </dt>
                  <dd className="mt-2 text-sm text-ivory/80">{credit.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="container-x pb-20 md:pb-28">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-t border-line/60 pt-8">
          <SectionLabel>The Gallery</SectionLabel>
          <p className="text-[10px] uppercase tracking-[0.24em] text-muted-2">
            {String(gallery.images.length).padStart(2, "0")} Photographs
          </p>
        </div>
        <GalleryLightbox
          images={gallery.images}
          label={`${gallery.couple} — ${gallery.location}`}
        />
      </section>

      <section className="border-t border-line/60">
        <div className="container-x grid md:grid-cols-2">
          {previous && (
            <Link
              href={`/portfolio/${previous.slug}`}
              className="group flex items-center gap-6 border-b border-line/60 py-10 md:border-b-0 md:border-r md:pr-10"
            >
              <span className="relative hidden h-24 w-20 shrink-0 overflow-hidden sm:block">
                <Image
                  src={previous.cover}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </span>
              <span>
                <span className="block text-[9.5px] uppercase tracking-[0.26em] text-muted-2">
                  ← Previous story
                </span>
                <span className="mt-2 block font-display text-2xl text-ivory transition-colors group-hover:text-gold">
                  {previous.couple}
                </span>
                <span className="mt-1 block text-[10px] uppercase tracking-[0.22em] text-muted">
                  {previous.location}
                </span>
              </span>
            </Link>
          )}

          {next && (
            <Link
              href={`/portfolio/${next.slug}`}
              className="group flex items-center justify-between gap-6 py-10 md:pl-10"
            >
              <span>
                <span className="block text-[9.5px] uppercase tracking-[0.26em] text-muted-2">
                  Next story →
                </span>
                <span className="mt-2 block font-display text-2xl text-ivory transition-colors group-hover:text-gold">
                  {next.couple}
                </span>
                <span className="mt-1 block text-[10px] uppercase tracking-[0.22em] text-muted">
                  {next.location}
                </span>
              </span>
              <span className="relative hidden h-24 w-20 shrink-0 overflow-hidden sm:block">
                <Image
                  src={next.cover}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </span>
            </Link>
          )}
        </div>
      </section>

      <CTA
        eyebrow="Your story next"
        title="Every story starts with a conversation."
        body="If this felt like the kind of record you'd want of your own day, I'd love to hear what you're planning."
        linkLabel="Start an enquiry"
      />
    </>
  );
}
