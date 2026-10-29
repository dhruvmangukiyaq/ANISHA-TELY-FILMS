"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { GalleryImage } from "@/data/types";

type LightboxProps = {
  images: GalleryImage[];
  index: number;
  label: string;
  onClose: () => void;
  onNavigate: (direction: number) => void;
  /** Small line shown beside the keyboard hint. */
  meta?: string;
};

const pad = (value: number) => String(value).padStart(2, "0");

export default function Lightbox({
  images,
  index,
  label,
  onClose,
  onNavigate,
  meta,
}: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowRight") {
        onNavigate(1);
      } else if (event.key === "ArrowLeft") {
        onNavigate(-1);
      } else if (event.key === "Tab") {
        const buttons =
          dialogRef.current?.querySelectorAll<HTMLButtonElement>("button");
        if (!buttons || buttons.length === 0) return;
        const first = buttons[0];
        const last = buttons[buttons.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
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
  }, [onClose, onNavigate]);

  const active = images[index];
  if (!active) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className="animate-fade-in fixed inset-0 z-[80] flex flex-col bg-ink/95 backdrop-blur-md"
    >
      <div className="flex items-center justify-between gap-4 p-4 md:p-6">
        <p className="text-[10px] tracking-[0.28em] text-ivory/60" aria-live="polite">
          {pad(index + 1)} / {pad(images.length)}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close lightbox"
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
        className="relative flex flex-1 items-center justify-center px-4 pb-2 md:px-20"
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <div className="relative h-full w-full max-w-6xl">
          <Image
            key={active.src}
            src={active.src}
            alt={active.alt}
            fill
            sizes="90vw"
            className="object-contain"
            priority
          />
        </div>

        <button
          type="button"
          onClick={() => onNavigate(-1)}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-line bg-ink/60 text-ivory/70 backdrop-blur-sm transition-colors hover:border-gold hover:text-gold md:left-6"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => onNavigate(1)}
          aria-label="Next image"
          className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-line bg-ink/60 text-ivory/70 backdrop-blur-sm transition-colors hover:border-gold hover:text-gold md:right-6"
        >
          →
        </button>
      </div>

      <div className="flex items-center justify-between gap-6 px-4 pb-5 md:px-6 md:pb-6">
        <p className="max-w-xl text-[9.5px] uppercase leading-relaxed tracking-[0.2em] text-ivory/50">
          {active.alt}
        </p>
        <p className="hidden shrink-0 text-[9px] uppercase tracking-[0.22em] text-muted-2 sm:block">
          {meta ? `${meta} · ` : ""}Use ← → to browse · Esc to close
        </p>
      </div>
    </div>
  );
}
