"use client";

import { useCallback, useEffect, useState } from "react";
import type { Testimonial } from "@/data/types";
import { testimonials as defaultTestimonials } from "@/data/testimonials";

type TestimonialCarouselProps = {
  items?: Testimonial[];
};

export default function TestimonialCarousel({
  items = defaultTestimonials,
}: TestimonialCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (direction: number) => {
      setIndex((current) => {
        const next = current + direction;
        return (next + items.length) % items.length;
      });
    },
    [items.length],
  );

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => go(1), 8000);
    return () => window.clearInterval(timer);
  }, [go, paused]);

  const active = items[index] ?? items[0];

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -top-10 left-0 font-display text-[9rem] leading-none text-gold/10 md:-top-16 md:text-[13rem]"
      >
        &ldquo;
      </span>

      <div aria-live="polite" className="relative">
        <blockquote
          key={index}
          className="animate-fade-in font-display text-2xl leading-[1.45] text-ivory/90 md:text-[2rem] lg:text-[2.35rem]"
        >
          {active.quote}
        </blockquote>
        <footer className="mt-9 flex flex-col gap-1">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold">
            {active.couple}
          </span>
          <span className="text-[10px] uppercase tracking-[0.24em] text-muted-2">
            {active.place}
          </span>
        </footer>
      </div>

      <div className="mt-10 flex items-center gap-5">
        <div className="flex gap-2" role="tablist" aria-label="Testimonials">
          {items.map((item, dotIndex) => (
            <button
              key={item.couple}
              type="button"
              role="tab"
              aria-selected={dotIndex === index}
              aria-label={`Testimonial from ${item.couple}`}
              onClick={() => setIndex(dotIndex)}
              className={`h-px transition-all duration-500 ${
                dotIndex === index
                  ? "w-10 bg-gold"
                  : "w-5 bg-line hover:bg-muted-2"
              }`}
            />
          ))}
        </div>
        <span className="text-[10px] tracking-[0.24em] text-muted-2">
          {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
        <div className="ml-auto flex gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="flex h-10 w-10 items-center justify-center border border-line text-ivory/70 transition-colors hover:border-gold/60 hover:text-gold"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="flex h-10 w-10 items-center justify-center border border-line text-ivory/70 transition-colors hover:border-gold/60 hover:text-gold"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
