import type { ReactNode } from "react";
import SectionLabel from "./SectionLabel";

type PageHeroProps = {
  label: string;
  title: ReactNode;
  description?: string;
  meta?: ReactNode;
};

export default function PageHero({ label, title, description, meta }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-line/60 pb-16 pt-36 md:pb-24 md:pt-48">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-gold/[0.055] blur-3xl"
      />
      <div className="container-x relative">
        <SectionLabel>{label}</SectionLabel>
        <h1 className="mt-7 max-w-4xl font-display text-[2.75rem] leading-[1.03] tracking-[-0.01em] text-ivory md:text-6xl lg:text-7xl">
          {title}
        </h1>
        {description && (
          <p className="mt-7 max-w-xl text-sm leading-relaxed text-muted md:text-base">
            {description}
          </p>
        )}
        {meta && <div className="mt-10">{meta}</div>}
      </div>
    </section>
  );
}
