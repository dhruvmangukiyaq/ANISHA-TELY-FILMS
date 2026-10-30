import type { Metadata } from "next";
import CTA from "@/components/CTA";
import GalleryExplorer from "@/components/GalleryExplorer";
import PageHero from "@/components/PageHero";
import { gallery } from "@/data/gallery";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Gallery",
  description:
    "A selection of frames from recent weddings — quiet portraits, long tables, and the light in between.",
  path: "/gallery",
  image: "/images/galleries/rose-dust-palms/cover.jpg",
  imageAlt: "Wedding gallery — portraits and details",
  keywords: [
    "wedding photo gallery",
    "wedding portraits",
    "wedding details photography",
  ],
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        label="Gallery"
        title={
          <>
            Twenty frames,
            <br />
            <em className="italic text-gold-light">one long summer.</em>
          </>
        }
        description="A loose edit of recent work: the in-between moments, the tables after dark, and the light that makes a place feel like it belongs to you. Filter by mood, or open any frame full screen."
        meta={
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-line/60 pt-6 text-[10px] uppercase tracking-[0.24em] text-muted-2">
            <span>{String(gallery.length).padStart(2, "0")} Photographs</span>
            <span aria-hidden className="h-1 w-1 rotate-45 bg-gold/60" />
            <span>Five categories</span>
            <span aria-hidden className="h-1 w-1 rotate-45 bg-gold/60" />
            <span>Italy · India · Greece · Japan</span>
          </div>
        }
      />

      <section className="container-x py-16 md:py-24">
        <GalleryExplorer />
      </section>

      <CTA
        eyebrow="The full archive"
        title="Stories, told in full."
        body="The gallery is only a glimpse. Each wedding lives in its own complete story, from the first quiet hour to the last song."
        href="/portfolio"
        linkLabel="View the portfolio"
      />
    </>
  );
}
