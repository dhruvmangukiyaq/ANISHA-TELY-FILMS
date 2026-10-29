"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Video } from "@/data/types";
import Reveal from "./Reveal";

export type VideoCard = Video & { cover: string };

type VideoGalleryProps = {
  videos: VideoCard[];
};

const pad = (value: number) => String(value).padStart(2, "0");

export default function VideoGallery({ videos }: VideoGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpenIndex(null);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (openIndex === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== "Tab") return;

      const nodes = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button, a[href], iframe, [tabindex]:not([tabindex="-1"])',
      );
      if (!nodes || nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex, close]);

  const active = openIndex !== null ? videos[openIndex] : null;

  const openAt = (index: number) => {
    triggerRef.current = document.activeElement as HTMLElement | null;
    setOpenIndex(index);
  };

  return (
    <>
      <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
        {videos.map((video, index) => (
          <Reveal key={video.youtubeId} delay={(index % 2) * 120}>
            <article className="group relative">
              <button
                type="button"
                onClick={() => openAt(index)}
                aria-label={`Play film: ${video.title} — ${video.couple}, ${video.location}`}
                className="absolute inset-0 z-10 w-full cursor-pointer"
              />

              <div className="relative aspect-video w-full overflow-hidden bg-surface">
                <Image
                  src={video.cover}
                  alt={`${video.title} — ${video.couple}`}
                  fill
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-ink/45 transition-colors duration-500 group-hover:bg-ink/25" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/25" />

                <span className="absolute left-4 top-4 text-[9px] uppercase tracking-[0.28em] text-ivory/60">
                  Film {pad(index + 1)}
                </span>

                <span
                  aria-hidden
                  className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/40 bg-ink/30 backdrop-blur-sm transition-all duration-500 group-hover:scale-105 group-hover:border-gold group-hover:bg-gold/20"
                >
                  <svg viewBox="0 0 24 24" className="ml-1 h-5 w-5 fill-ivory">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>

                <span className="absolute bottom-4 right-4 border border-ivory/20 bg-ink/70 px-2 py-1 text-[9px] tracking-[0.16em] text-ivory/80">
                  {video.duration}
                </span>
              </div>

              <div className="mt-5 flex items-start justify-between gap-6">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.28em] text-gold/90">
                    {video.couple}
                  </p>
                  <h2 className="mt-2 font-display text-2xl leading-tight text-ivory md:text-[1.75rem]">
                    {video.title}
                  </h2>
                  <p className="mt-1.5 text-[10px] uppercase tracking-[0.24em] text-ivory/50">
                    {video.location} · {video.year}
                  </p>
                </div>
                <span
                  aria-hidden
                  className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center border border-line text-ivory/60 transition-colors duration-500 group-hover:border-gold group-hover:text-gold"
                >
                  →
                </span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {active && openIndex !== null && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${active.title} — wedding film`}
          className="animate-fade-in fixed inset-0 z-[80] flex flex-col bg-ink/95 backdrop-blur-md"
        >
          <div className="flex items-center justify-between gap-4 p-4 md:p-6">
            <p className="text-[10px] tracking-[0.28em] text-ivory/60" aria-live="polite">
              {pad(openIndex + 1)} / {pad(videos.length)}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close video"
              className="flex h-11 w-11 items-center justify-center border border-line text-ivory/70 transition-colors hover:border-gold hover:text-gold"
            >
              <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4">
                <path
                  d="M5 5l14 14M19 5L5 19"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </svg>
            </button>
          </div>

          <div
            className="flex flex-1 items-center justify-center overflow-y-auto px-4 pb-6 md:px-10 md:pb-10"
            onClick={(event) => {
              if (event.target === event.currentTarget) close();
            }}
          >
            <div className="w-full max-w-5xl">
              <div className="relative aspect-video w-full overflow-hidden bg-black shadow-[0_40px_120px_rgba(0,0,0,0.55)]">
                <iframe
                  key={active.youtubeId}
                  src={`https://www.youtube-nocookie.com/embed/${active.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                  title={`${active.title} — ${active.couple}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>

              <div className="mt-5 flex flex-wrap items-end justify-between gap-5">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.28em] text-gold/90">
                    {active.couple}
                  </p>
                  <h2 className="mt-2 font-display text-2xl leading-tight text-ivory md:text-3xl">
                    {active.title}
                  </h2>
                  <p className="mt-1.5 text-[10px] uppercase tracking-[0.24em] text-ivory/50">
                    {active.location} · {active.year} · {active.duration}
                  </p>
                </div>
                <a
                  href={`https://www.youtube.com/watch?v=${active.youtubeId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group/link inline-flex items-center gap-3 border border-line px-5 py-3 text-[9px] uppercase tracking-[0.24em] text-ivory/70 transition-colors hover:border-gold hover:text-gold"
                >
                  Watch on YouTube
                  <span
                    aria-hidden
                    className="transition-transform duration-500 group-hover/link:translate-x-1"
                  >
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
