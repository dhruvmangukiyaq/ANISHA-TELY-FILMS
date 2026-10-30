"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/data/site";

const slides = [
  {
    src: "/images/hero-01.jpg",
    alt: "Evening light across a wedding celebration in the Tuscan hills",
  },
  {
    src: "/images/hero-02.jpg",
    alt: "A quiet moment during a wedding celebration",
  },
  {
    src: "/images/galleries/villa-balbiano/cover.jpg",
    alt: "A ceremony on the terrace at Lake Como",
  },
];

const pad = (value: number) => String(value).padStart(2, "0");

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Recent wedding photography"
      className="relative isolate flex min-h-[max(640px,100svh)] flex-col justify-end overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {slides.map((slide, slideIndex) => (
        <div
          key={slide.src}
          role="group"
          aria-roledescription="slide"
          aria-label={`${slideIndex + 1} of ${slides.length}`}
          aria-hidden={slideIndex !== index}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${
            slideIndex === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={slideIndex === 0}
            sizes="100vw"
            className={`object-cover ${
              slideIndex === index ? "animate-slow-zoom" : ""
            }`}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/15 to-ink/95" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/65 via-transparent to-transparent" />

      <div className="absolute right-5 top-24 z-20 flex items-center gap-3 md:right-10 md:top-28">
        <span className="text-[10px] tracking-[0.24em] text-ivory/50">
          {pad(index + 1)} / {pad(slides.length)}
        </span>
        <div className="flex gap-2">
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setIndex(slideIndex)}
              aria-label={`Go to slide ${slideIndex + 1}`}
              aria-current={slideIndex === index}
              className={`h-px transition-all duration-500 ${
                slideIndex === index
                  ? "w-8 bg-gold"
                  : "w-4 bg-ivory/30 hover:bg-ivory/60"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="container-x relative z-10 pb-12 pt-24 sm:pb-14 sm:pt-28 md:pb-20 md:pt-32">
        <p className="eyebrow flex flex-wrap items-center gap-2.5 sm:gap-4">
          <span aria-hidden className="h-px w-6 bg-gold/60 sm:w-10" />
          <span className="max-w-[90vw]">Wedding Photography &amp; Film · Worldwide</span>
        </p>

        <h1 className="mt-6 max-w-5xl font-display text-[clamp(2.4rem,9vw,6.4rem)] font-light leading-[0.98] tracking-[-0.015em] text-ivory sm:mt-7">
          Weddings, remembered
          <br />
          <em className="italic text-gold-light">as they felt.</em>
        </h1>

        <p className="mt-6 max-w-lg text-sm leading-relaxed text-ivory/70 sm:mt-8 md:text-base">
          For couples who want their day documented, not directed. Quiet,
          editorial photography and film for intimate celebrations in India,
          Italy and wherever the light is good.
        </p>

        <div className="mt-8 flex w-full flex-col items-start gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <Link
            href="/portfolio"
            className="group inline-flex w-full items-center justify-center gap-4 border border-gold bg-gold px-6 py-3 text-[10px] uppercase tracking-[0.26em] text-ink transition-colors duration-300 hover:bg-gold-light hover:border-gold-light sm:w-auto sm:px-7 sm:py-3.5"
          >
            View Portfolio
            <span
              aria-hidden
              className="transition-transform duration-500 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex w-full items-center justify-center gap-4 border border-ivory/30 px-6 py-3 text-[10px] uppercase tracking-[0.26em] text-ivory transition-colors duration-300 hover:border-gold hover:text-gold sm:w-auto sm:px-7 sm:py-3.5"
          >
            Book Now
          </Link>
        </div>

        <div className="mt-10 flex items-center gap-6 border-t border-ivory/15 pt-6 text-[10px] uppercase tracking-[0.24em] text-ivory/40">
          <span>{site.location}</span>
          <span className="ml-auto hidden items-center gap-3 md:flex">
            Scroll
            <span aria-hidden className="h-8 w-px bg-ivory/25" />
          </span>
        </div>
      </div>
    </section>
  );
}
