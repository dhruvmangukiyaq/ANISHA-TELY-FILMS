import Image from "next/image";
import Link from "next/link";
import type { PortfolioWedding } from "@/data/types";

type PortfolioCardProps = {
  wedding: PortfolioWedding;
  index: number;
};

export default function PortfolioCard({ wedding, index }: PortfolioCardProps) {
  return (
    <Link
      href={`/portfolio/${wedding.slug}`}
      className="group relative block overflow-hidden bg-surface"
    >
      <div className="relative aspect-[4/5] w-full">
        <Image
          src={wedding.cover}
          alt={`${wedding.couple} — ${wedding.location}`}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.045]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-ink/10 transition-opacity duration-700 group-hover:from-ink/95" />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 md:p-6">
          <span className="text-[10px] tracking-[0.3em] text-ivory/60">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-[9px] uppercase tracking-[0.28em] text-gold/90">
            Wedding
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
          <span
            aria-hidden
            className="mb-4 block h-px w-10 bg-gold/70 transition-all duration-700 group-hover:w-20"
          />
          <h3 className="font-display text-2xl leading-tight text-ivory md:text-[1.75rem]">
            {wedding.couple}
          </h3>
          <p className="mt-1.5 text-[10px] uppercase tracking-[0.24em] text-ivory/60">
            {wedding.location}
          </p>
          <span className="mt-4 inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.24em] text-gold transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100">
            View story
            <span aria-hidden>→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
