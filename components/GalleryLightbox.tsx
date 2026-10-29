"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import type { GalleryImage } from "@/data/types";
import Lightbox from "./Lightbox";
import Reveal from "./Reveal";
import { aspectClass } from "./aspect";

type GalleryLightboxProps = {
  images: GalleryImage[];
  label: string;
};

export default function GalleryLightbox({ images, label }: GalleryLightboxProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpenIndex(null);
    triggerRef.current?.focus();
  }, []);

  const go = useCallback(
    (direction: number) => {
      setOpenIndex((current) => {
        if (current === null) return current;
        return (current + direction + images.length) % images.length;
      });
    },
    [images.length],
  );

  const openAt = (index: number) => {
    triggerRef.current = document.activeElement as HTMLElement | null;
    setOpenIndex(index);
  };

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 lg:gap-6">
        {images.map((image, index) => (
          <Reveal
            key={image.src}
            delay={(index % 3) * 70}
            className="mb-4 break-inside-avoid lg:mb-6"
          >
            <button
              type="button"
              onClick={() => openAt(index)}
              aria-label={`Open image ${index + 1} of ${images.length}: ${image.alt}`}
              className="group relative block w-full overflow-hidden bg-surface text-left"
            >
              <span className={`relative block w-full ${aspectClass[image.aspect]}`}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                />
                <span className="absolute inset-0 bg-ink/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute bottom-4 left-4 flex items-center gap-2 text-[9px] uppercase tracking-[0.26em] text-ivory opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  View
                  <span aria-hidden>+</span>
                </span>
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          images={images}
          index={openIndex}
          label={`${label} gallery`}
          onClose={close}
          onNavigate={go}
        />
      )}
    </>
  );
}
