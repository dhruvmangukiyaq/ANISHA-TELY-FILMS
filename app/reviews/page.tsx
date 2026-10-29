import type { Metadata } from "next";
import CTA from "@/components/CTA";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import Stars from "@/components/Stars";
import { reviewAverage, reviews } from "@/data/reviews";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "Kind words from couples photographed by Anisha Tely — in Tuscany, Udaipur, Lake Como, and the Cotswolds.",
};

const countries = new Set(reviews.map((review) => review.country)).size;
const pad = (value: number) => String(value).padStart(2, "0");
const initials = (couple: string) =>
  couple
    .split(" & ")
    .map((name) => name.trim()[0])
    .join("&");

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        label="Reviews"
        title={
          <>
            What couples say
            <br />
            <em className="italic text-gold-light">after the last song.</em>
          </>
        }
        description="A few notes from the people who were there. No prompts, no rewrites — just what arrived in my inbox a few weeks after the wedding."
        meta={
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-line/60 pt-6 text-[10px] uppercase tracking-[0.24em] text-muted-2">
            <span>{reviewAverage.toFixed(1)} Average</span>
            <span aria-hidden className="h-1 w-1 rotate-45 bg-gold/60" />
            <span>{pad(reviews.length)} Reviews</span>
            <span aria-hidden className="h-1 w-1 rotate-45 bg-gold/60" />
            <span>{pad(countries)} Countries</span>
          </div>
        }
      />

      <section className="container-x pt-16 md:pt-20">
        <div className="grid gap-8 border-y border-line/60 py-10 md:grid-cols-12 md:items-center md:gap-10">
          <div className="flex items-center gap-5 md:col-span-4">
            <span className="font-display text-6xl leading-none text-gold">
              {reviewAverage.toFixed(1)}
            </span>
            <div>
              <Stars rating={reviewAverage} starClassName="h-3.5 w-3.5" />
              <p className="mt-2.5 text-[9px] uppercase tracking-[0.24em] text-muted-2">
                Average rating
              </p>
            </div>
          </div>

          <p className="max-w-lg text-sm leading-[1.9] text-muted md:col-span-5">
            Notes arrive by email, Google and Instagram, usually a few weeks
            after the wedding — once the photographs have been lived with for a
            while.
          </p>

          <dl className="grid grid-cols-2 gap-6 md:col-span-3 md:justify-items-end md:text-right">
            <div>
              <dt className="text-[9px] uppercase tracking-[0.22em] text-muted-2">
                Reviews
              </dt>
              <dd className="mt-1.5 font-display text-2xl text-ivory">
                {pad(reviews.length)}
              </dd>
            </div>
            <div>
              <dt className="text-[9px] uppercase tracking-[0.22em] text-muted-2">
                Countries
              </dt>
              <dd className="mt-1.5 font-display text-2xl text-ivory">
                {pad(countries)}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="container-x py-16 md:py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <SectionLabel>In Their Words</SectionLabel>
          <p className="text-[10px] uppercase tracking-[0.24em] text-muted-2">
            Published with permission
          </p>
        </div>

        <div className="grid gap-px overflow-hidden border border-line/70 bg-line/70 md:grid-cols-2">
          {reviews.map((review, index) => (
            <Reveal
              key={review.couple}
              delay={(index % 2) * 100}
              className="h-full bg-ink-soft"
            >
              <figure className="flex h-full flex-col p-8 transition-colors duration-500 hover:bg-surface/50 md:p-10">
                <div className="flex items-start justify-between gap-4">
                  <Stars rating={review.rating} />
                  <span className="shrink-0 text-[9px] uppercase tracking-[0.22em] text-muted-2">
                    {review.wedding}
                  </span>
                </div>

                <blockquote className="mt-7 font-display text-[1.35rem] leading-[1.5] text-ivory/90 md:text-[1.45rem]">
                  <span aria-hidden className="text-gold/50">
                    &ldquo;
                  </span>
                  {review.quote}
                  <span aria-hidden className="text-gold/50">
                    &rdquo;
                  </span>
                </blockquote>

                <figcaption className="mt-auto flex items-center gap-4 border-t border-line/60 pt-6">
                  <span
                    aria-hidden
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 font-display text-[13px] text-gold"
                  >
                    {initials(review.couple)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[10px] uppercase tracking-[0.24em] text-ivory">
                      {review.couple}
                    </p>
                    <p className="mt-1.5 text-[9px] uppercase tracking-[0.22em] text-muted-2">
                      {review.city}, {review.country}
                    </p>
                  </div>
                  <span className="ml-auto hidden shrink-0 text-[8.5px] uppercase tracking-[0.2em] text-muted-2/80 sm:block">
                    {review.source}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <CTA
        eyebrow="Enquiries"
        title="Your day, in good hands."
        body="If these sound like the kind of photographs you'd like to live with, tell me a little about the day you're planning."
      />
    </>
  );
}
