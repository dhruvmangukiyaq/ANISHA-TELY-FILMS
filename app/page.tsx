import Image from "next/image";
import Link from "next/link";
import CTA from "@/components/CTA";
import HeroSlideshow from "@/components/HeroSlideshow";
import PortfolioCard from "@/components/PortfolioCard";
import Reveal from "@/components/Reveal";
import SectionLabel, { ArrowLink } from "@/components/SectionLabel";
import Stats from "@/components/Stats";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import { gallery } from "@/data/gallery";
import { portfolio } from "@/data/portfolio";
import { reviewTestimonials } from "@/data/reviews";
import { services } from "@/data/services";

const recentWeddings = portfolio.slice(0, 3);
const galleryPreview = gallery.slice(0, 12);

export default function HomePage() {
  return (
    <>
      <HeroSlideshow />

      {/* Short intro */}
      <section className="container-x py-20 md:py-28 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src="/images/about-portrait.jpg"
                alt="Anisha Tely, wedding photographer and filmmaker"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
              <p className="absolute bottom-6 left-6 text-[9.5px] uppercase tracking-[0.26em] text-ivory/70">
                Anisha Tely · Mumbai
              </p>
            </div>
          </Reveal>

          <div className="lg:col-span-7 lg:pt-4">
            <SectionLabel>The Studio</SectionLabel>
            <Reveal>
              <h2 className="mt-6 font-display text-3xl font-light leading-[1.12] text-ivory md:text-4xl lg:text-[2.9rem]">
                Photographs that feel like{" "}
                <em className="italic text-gold-light">the day itself.</em>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-7 max-w-xl text-sm leading-[1.9] text-muted">
                Anisha Tely is a wedding photographer and filmmaker working
                between Mumbai and London. Her work is quiet, editorial and led
                by light — a record of the day as it actually happened, for
                couples who would rather be present than posed.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <div className="mt-8">
                <ArrowLink href="/about">More about the studio</ArrowLink>
              </div>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-12">
                <Stats />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="border-y border-line/60 bg-ink-soft py-20 md:py-28">
        <div className="container-x">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel>Services</SectionLabel>
              <h2 className="mt-6 max-w-2xl font-display text-4xl font-light leading-[1.06] text-ivory md:text-5xl">
                Three ways to work together.
              </h2>
            </div>
            <ArrowLink href="/services" className="shrink-0 md:pb-2">
              All services
            </ArrowLink>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden border border-line/70 bg-line/70 md:grid-cols-3">
            {services.map((service, index) => (
              <Reveal
                key={service.name}
                delay={index * 100}
                className="h-full bg-ink-soft"
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col p-7 transition-colors duration-500 hover:bg-surface/70 md:p-8"
                >
                  <span className="text-[10px] tracking-[0.3em] text-gold/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 font-display text-2xl leading-tight text-ivory">
                    {service.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-7 text-[9px] uppercase tracking-[0.26em] text-gold">
                    Explore
                    <span
                      aria-hidden
                      className="transition-transform duration-500 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Recent portfolio */}
      <section className="container-x py-20 md:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel>Recent Work</SectionLabel>
            <h2 className="mt-6 max-w-2xl font-display text-4xl font-light leading-[1.06] text-ivory md:text-5xl">
              Three days I keep coming back to.
            </h2>
          </div>
          <ArrowLink href="/portfolio" className="shrink-0 md:pb-2">
            All stories
          </ArrowLink>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3 md:gap-6">
          {recentWeddings.map((wedding, index) => (
            <Reveal key={wedding.slug} delay={index * 100}>
              <PortfolioCard wedding={wedding} index={index} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Reviews slider */}
      <section className="border-y border-line/60 bg-surface/40 py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionLabel>Kind Words</SectionLabel>
            <h2 className="mt-6 font-display text-4xl font-light leading-[1.08] text-ivory md:text-5xl">
              Said by the people
              <br />
              who were there.
            </h2>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
              A handful of notes from couples, shared with their permission.
            </p>
            <div className="mt-8">
              <ArrowLink href="/reviews">Read all reviews</ArrowLink>
            </div>
          </div>
          <div className="lg:col-span-8 lg:pl-10">
            <TestimonialCarousel items={reviewTestimonials} />
          </div>
        </div>
      </section>

      {/* Gallery preview */}
      <section className="container-x py-20 md:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel>Gallery</SectionLabel>
            <h2 className="mt-6 max-w-2xl font-display text-4xl font-light leading-[1.06] text-ivory md:text-5xl">
              Twelve frames from the archive.
            </h2>
          </div>
          <ArrowLink href="/gallery" className="shrink-0 md:pb-2">
            View all 20
          </ArrowLink>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {galleryPreview.map((image, index) => (
            <Reveal key={image.src} delay={(index % 4) * 60}>
              <Link
                href="/gallery"
                aria-label={`View the gallery — ${image.alt}`}
                className="group relative block overflow-hidden bg-surface"
              >
                <div className="relative aspect-square w-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-ink/25 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CTA />
    </>
  );
}
