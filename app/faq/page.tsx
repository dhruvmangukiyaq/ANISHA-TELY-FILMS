import type { Metadata } from "next";
import Link from "next/link";
import Accordion from "@/components/Accordion";
import CTA from "@/components/CTA";
import PageHero from "@/components/PageHero";
import SectionLabel from "@/components/SectionLabel";
import { faqs } from "@/data/faq";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "FAQ",
  description:
    "Answers to the questions couples ask most — travel, booking timelines, editing, deliverables, and how photography and film work together.",
  path: "/faq",
  image: "/images/cta-wide.jpg",
  imageAlt: "Frequently asked questions about wedding photography and film",
  keywords: [
    "wedding photographer FAQ",
    "wedding photography booking",
    "wedding film questions",
  ],
});

const structuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <PageHero
        label="FAQ"
        title={
          <>
            The things
            <br />
            <em className="italic text-gold-light">couples ask.</em>
          </>
        }
        description="Travel, timelines, editing, and what actually arrives afterwards. If your question isn't here, write — I answer every message myself."
        meta={
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-line/60 pt-6 text-[10px] uppercase tracking-[0.24em] text-muted-2">
            <span>{String(faqs.length).padStart(2, "0")} Questions</span>
            <span aria-hidden className="h-1 w-1 rotate-45 bg-gold/60" />
            <span>Replies within 48 hours</span>
            <span aria-hidden className="h-1 w-1 rotate-45 bg-gold/60" />
            <span>2026 &amp; 2027 open</span>
          </div>
        }
      />

      <section className="container-x py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionLabel>Before You Ask</SectionLabel>
              <h2 className="mt-6 font-display text-3xl font-light leading-[1.1] text-ivory md:text-4xl">
                Everything else,
                <br />
                <em className="italic text-gold-light">in plain words.</em>
              </h2>
              <p className="mt-6 max-w-xs text-sm leading-[1.9] text-muted">
                No hidden line items and no packages you don&apos;t need. If
                something isn&apos;t covered, ask me directly — you&apos;ll get
                a straight answer, usually within two days.
              </p>

              <div className="mt-9 border-t border-line/60 pt-7">
                <a href={`mailto:${site.email}`} className="link-gold">
                  {site.email}
                </a>
                <p className="mt-4 text-[10px] uppercase tracking-[0.22em] text-muted-2">
                  {site.studioHours}
                </p>
              </div>

              <Link
                href="/contact"
                className="mt-7 inline-flex items-center gap-4 border border-gold/60 px-6 py-3.5 text-[10px] uppercase tracking-[0.26em] text-gold transition-colors duration-300 hover:bg-gold hover:text-ink"
              >
                Ask a question
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-8">
            <Accordion items={faqs} />

            <div className="mt-8 flex flex-col gap-4 border border-line/70 bg-surface/30 p-6 sm:flex-row sm:items-center sm:justify-between md:p-7">
              <div>
                <p className="font-display text-lg text-ivory">
                  Still deciding?
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  The collection guide has full pricing, timelines, and a few
                  recent galleries.
                </p>
              </div>
              <Link
                href="/contact"
                className="group inline-flex shrink-0 items-center gap-3 text-[10px] uppercase tracking-[0.26em] text-gold"
              >
                Request the guide
                <span
                  aria-hidden
                  className="transition-transform duration-500 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTA
        eyebrow="Enquiries"
        title="Ask me anything."
        body="Dates, budgets, travel, or whether your venue will photograph well in November — send it all in one message and I'll reply personally."
      />
    </>
  );
}
