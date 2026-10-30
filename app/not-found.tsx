import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[70svh] flex-col items-center justify-center py-32 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-6 font-display text-5xl font-light leading-tight text-ivory md:text-7xl">
        This page has
        <br />
        <em className="italic text-gold-light">wandered off.</em>
      </h1>
      <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
        The story you were looking for isn&apos;t here. Perhaps it moved, or
        perhaps it was never written. Either way, the portfolio is a good place
        to start again.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
        <Link
          href="/portfolio"
          className="border border-gold/60 px-7 py-3.5 text-[10px] uppercase tracking-[0.26em] text-gold transition-colors hover:bg-gold hover:text-ink"
        >
          View the portfolio
        </Link>
        <Link href="/" className="link-gold">
          Back home
        </Link>
      </div>
    </section>
  );
}
