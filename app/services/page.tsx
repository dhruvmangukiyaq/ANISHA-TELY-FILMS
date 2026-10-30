import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CTA from "@/components/CTA";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Wedding photography, wedding films, and multi-day destination coverage. Quiet, editorial work made for celebrations that feel like you.",
  path: "/services",
  image: "/images/galleries/val-dorcia/cover.jpg",
  imageAlt: "Wedding photography and film collections",
  keywords: [
    "wedding photography packages",
    "wedding film",
    "destination wedding coverage",
  ],
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services"
        title={
          <>
            Made for the
            <br />
            <em className="italic text-gold-light">way you celebrate.</em>
          </>
        }
        description="Three ways to work together, whether it's an intimate elopement for twenty or a three-day celebration across two countries. Every collection is shaped around the day itself."
        meta={
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-line/60 pt-6 text-[10px] uppercase tracking-[0.24em] text-muted-2">
            <span>Photography</span>
            <span aria-hidden className="h-1 w-1 rotate-45 bg-gold/60" />
            <span>Film</span>
            <span aria-hidden className="h-1 w-1 rotate-45 bg-gold/60" />
            <span>{site.location}</span>
          </div>
        }
      />

      <section className="container-x py-16 md:py-24">
        <div className="grid gap-6 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 100} className="h-full">
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col border border-line/80 bg-ink-soft/40 transition-colors duration-500 hover:border-gold/40 hover:bg-surface/50"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface">
                  <Image
                    src={service.cover}
                    alt={`${service.name} — ${service.tagline}`}
                    fill
                    loading="lazy"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                  <span className="absolute left-5 top-5 text-[10px] tracking-[0.3em] text-ivory/60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-7 md:p-8">
                  <h2 className="font-display text-2xl leading-tight text-ivory transition-colors duration-500 group-hover:text-gold-light md:text-[1.75rem]">
                    {service.name}
                  </h2>
                  <p className="mt-2 font-display text-base italic text-gold-light/85">
                    {service.tagline}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>

                  <ul className="mt-7 space-y-2.5 border-t border-line/60 pt-6 text-[13px] leading-relaxed text-ivory/70">
                    {service.includes.slice(0, 3).map((item) => (
                      <li key={item} className="flex gap-3">
                        <span
                          aria-hidden
                          className="mt-[0.5rem] h-1 w-1 shrink-0 rotate-45 bg-gold/70"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex items-end justify-between gap-4 pt-8">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-gold">
                      {service.startingPrice}
                    </span>
                    <span className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.24em] text-ivory/60 transition-colors duration-500 group-hover:text-gold">
                      View details
                      <span
                        aria-hidden
                        className="transition-transform duration-500 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 grid gap-8 border-t border-line/60 pt-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <SectionLabel>How it works</SectionLabel>
            <p className="mt-4 max-w-xl text-sm leading-[1.9] text-muted">
              Every wedding is quoted individually. Travel, additional days, and
              fine-art albums are added where they make sense — never as a
              package you don&apos;t need.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 md:col-span-5 md:justify-end">
            <Link
              href="/contact"
              className="border border-gold/60 px-7 py-3.5 text-[10px] uppercase tracking-[0.26em] text-gold transition-colors hover:bg-gold hover:text-ink"
            >
              Request the collection guide
            </Link>
          </div>
        </Reveal>
      </section>

      <CTA
        eyebrow="Bookings"
        title="Tell me what you're planning."
        body="Send the date, the place, and a little about the two of you. I'll reply with availability and the full collection guide."
      />
    </>
  );
}
