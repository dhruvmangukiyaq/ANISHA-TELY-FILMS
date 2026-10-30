import type { Metadata } from "next";
import CTA from "@/components/CTA";
import PageHero from "@/components/PageHero";
import SectionLabel from "@/components/SectionLabel";
import VideoGallery, { type VideoCard } from "@/components/VideoGallery";
import { galleries } from "@/data/galleries";
import { videos } from "@/data/videos";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Videos",
  description:
    "Short wedding films built around the sound of the day — the vows, the laughter, and the band at midnight.",
  path: "/videos",
  image: "/images/galleries/saltwater-vows/cover.jpg",
  imageAlt: "Wedding films by Anisha Tely",
  keywords: ["wedding films", "wedding videographer", "wedding highlight film"],
});

const films: VideoCard[] = videos.map((video) => ({
  ...video,
  cover:
    galleries.find((gallery) => gallery.couple === video.couple)?.cover ??
    "/images/cta-wide.jpg",
}));

export default function VideosPage() {
  return (
    <>
      <PageHero
        label="Videos"
        title={
          <>
            The day,
            <br />
            <em className="italic text-gold-light">as it sounded.</em>
          </>
        }
        description="Photography and film made by the same small team, so nothing has to be staged twice. These are the short cuts — the full films run between three and twelve minutes."
        meta={
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-line/60 pt-6 text-[10px] uppercase tracking-[0.24em] text-muted-2">
            <span>{String(films.length).padStart(2, "0")} Films</span>
            <span aria-hidden className="h-1 w-1 rotate-45 bg-gold/60" />
            <span>Super 8 &amp; Digital</span>
            <span aria-hidden className="h-1 w-1 rotate-45 bg-gold/60" />
            <span>Original Scores</span>
          </div>
        }
      />

      <section className="container-x py-16 md:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-line/60 pb-6">
          <SectionLabel>Selected Films</SectionLabel>
          <p className="text-[10px] uppercase tracking-[0.24em] text-muted-2">
            2024 — 2026 · Play in page
          </p>
        </div>

        <VideoGallery videos={films} />
      </section>

      <CTA
        eyebrow="Films"
        title="A film you can hear."
        body="Every film is scored and edited by hand, using the vows and speeches from the day. If you'd like to see a full-length film, ask and I'll send a private link."
        linkLabel="Ask for a private link"
      />
    </>
  );
}
