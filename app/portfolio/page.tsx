import type { Metadata } from "next";
import CTA from "@/components/CTA";
import PageHero from "@/components/PageHero";
import PortfolioCard from "@/components/PortfolioCard";
import Reveal from "@/components/Reveal";
import { portfolio } from "@/data/portfolio";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Portfolio",
  description:
    "Six wedding stories from Italy, India, Greece, Morocco and England — photographed by Anisha Tely.",
  path: "/portfolio",
  image: "/images/galleries/aegean-linen/cover.jpg",
  imageAlt: "Wedding portfolio — a ceremony in Greece",
  keywords: [
    "wedding portfolio",
    "destination wedding photographer",
    "editorial wedding photos",
  ],
});

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        label="Portfolio"
        title={
          <>
            Stories, told
            <br />
            <em className="italic text-gold-light">slowly.</em>
          </>
        }
        description="Six celebrations from the last two years — some in palaces, some in fields, all of them led by the people who lived them. Open a story to see the full day."
        meta={
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-line/60 pt-6 text-[10px] uppercase tracking-[0.24em] text-muted-2">
            <span>{String(portfolio.length).padStart(2, "0")} Stories</span>
            <span aria-hidden className="h-1 w-1 rotate-45 bg-gold/60" />
            <span>2024 — 2026</span>
            <span aria-hidden className="h-1 w-1 rotate-45 bg-gold/60" />
            <span>Five countries</span>
          </div>
        }
      />

      <section className="container-x py-16 md:py-24">
        <div className="grid gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {portfolio.map((wedding, index) => (
            <Reveal key={wedding.slug} delay={(index % 3) * 100}>
              <PortfolioCard wedding={wedding} index={index} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x pb-24 md:pb-32">
        <div className="mx-auto max-w-2xl border-t border-line/60 pt-12 text-center">
          <p className="font-display text-2xl leading-snug text-ivory/85 md:text-3xl">
            Every wedding is a different story. Yours will be too.
          </p>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted">
            If you don&apos;t see your part of the world here, that is only
            because I haven&apos;t been yet. I travel for celebrations that feel
            like they belong to the people in them.
          </p>
        </div>
      </section>

      <CTA
        eyebrow="Next"
        title="Your day, documented."
        body="Dates for 2026 and 2027 are open. Tell me where you're marrying and I'll send the full collection guide."
        linkLabel="Check availability"
        image="/images/galleries/aegean-linen/cover.jpg"
      />
    </>
  );
}
