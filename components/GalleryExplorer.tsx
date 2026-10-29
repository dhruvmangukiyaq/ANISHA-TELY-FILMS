"use client";

import Image from "next/image";
import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import {
  gallery,
  galleryCategories,
  type GalleryFilter,
} from "@/data/gallery";
import Lightbox from "./Lightbox";
import Reveal from "./Reveal";
import { aspectClass } from "./aspect";

const pad = (value: number) => String(value).padStart(2, "0");

export default function GalleryExplorer() {
  const [filter, setFilter] = useState<GalleryFilter>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const visible = useMemo(
    () =>
      filter === "All"
        ? gallery
        : gallery.filter((image) => image.category === filter),
    [filter],
  );

  const close = useCallback(() => {
    setOpenIndex(null);
    triggerRef.current?.focus();
  }, []);

  const go = useCallback(
    (direction: number) => {
      setOpenIndex((current) => {
        if (current === null) return current;
        return (current + direction + visible.length) % visible.length;
      });
    },
    [visible.length],
  );

  const openAt = (index: number) => {
    triggerRef.current = document.activeElement as HTMLElement | null;
    setOpenIndex(index);
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = galleryCategories.length - 1;
    let next: number | null = null;

    if (event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;

    if (next === null) return;
    event.preventDefault();
    setFilter(galleryCategories[next]);
    tabRefs.current[next]?.focus();
  };

  return (
    <div>
      <div className="flex flex-col gap-5 border-b border-line/70 pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div
          role="tablist"
          aria-label="Filter photographs by category"
          className="-mx-6 flex snap-x gap-x-7 overflow-x-auto px-6 pb-1 lg:mx-0 lg:flex-wrap lg:gap-y-3 lg:overflow-visible lg:px-0"
        >
          {galleryCategories.map((category, index) => {
            const isActive = category === filter;
            const count =
              category === "All"
                ? gallery.length
                : gallery.filter((image) => image.category === category).length;

            return (
              <button
                key={category}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`gallery-tab-${category.toLowerCase()}`}
                aria-selected={isActive}
                aria-controls="gallery-grid"
                tabIndex={isActive ? 0 : -1}
                onClick={() => setFilter(category)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
                className={`group relative flex shrink-0 snap-start items-baseline gap-2 pb-2 text-[10px] uppercase tracking-[0.24em] transition-colors duration-300 ${
                  isActive
                    ? "text-gold"
                    : "text-muted-2 hover:text-ivory/80"
                }`}
              >
                {category}
                <span
                  className={`text-[8.5px] tracking-[0.16em] ${
                    isActive ? "text-gold/60" : "text-muted-2/60"
                  }`}
                >
                  {pad(count)}
                </span>
                <span
                  aria-hidden
                  className={`absolute inset-x-0 bottom-0 h-px origin-left bg-gold transition-transform duration-500 ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <p
          className="shrink-0 text-[10px] uppercase tracking-[0.24em] text-muted-2 lg:pb-2"
          aria-live="polite"
        >
          {pad(visible.length)} {visible.length === 1 ? "Photograph" : "Photographs"}
          {filter === "All" ? " · The archive" : ` · ${filter}`}
        </p>
      </div>

      <div
        key={filter}
        id="gallery-grid"
        role="tabpanel"
        aria-labelledby={`gallery-tab-${filter.toLowerCase()}`}
        className="mt-10 animate-fade-in columns-1 gap-4 sm:columns-2 lg:columns-3 lg:gap-5"
      >
        {visible.map((image, index) => (
          <Reveal
            key={image.src}
            delay={(index % 3) * 70}
            className="mb-4 break-inside-avoid lg:mb-5"
          >
            <button
              type="button"
              onClick={() => openAt(index)}
              aria-label={`Open image ${index + 1} of ${visible.length}: ${image.alt}`}
              className="group relative block w-full overflow-hidden bg-surface text-left"
            >
              <span className={`relative block w-full ${aspectClass[image.aspect]}`}>
                <span aria-hidden className="absolute inset-0 bg-surface-2" />
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                />

                <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

                <span className="absolute left-4 top-4 text-[8.5px] uppercase tracking-[0.26em] text-ivory/60">
                  {image.category}
                </span>

                <span className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4">
                  <span className="max-w-[80%] text-[9px] uppercase leading-relaxed tracking-[0.2em] text-ivory/85 md:opacity-0 md:transition-opacity md:duration-500 md:group-hover:opacity-100">
                    {image.alt}
                  </span>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-ivory/30 text-[11px] text-ivory/80 transition-colors duration-500 group-hover:border-gold group-hover:text-gold">
                    +
                  </span>
                </span>
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          images={visible}
          index={openIndex}
          label={filter === "All" ? "The gallery" : `${filter} photographs`}
          meta={filter === "All" ? undefined : filter}
          onClose={close}
          onNavigate={go}
        />
      )}
    </div>
  );
}
