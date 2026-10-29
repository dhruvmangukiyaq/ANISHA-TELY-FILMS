import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";

type CTAProps = {
  eyebrow?: string;
  title?: string;
  body?: string;
  href?: string;
  linkLabel?: string;
  image?: string;
};

export default function CTA({
  eyebrow = "Enquiries",
  title = "Let's make something that lasts.",
  body = "Tell me about the day you're planning — the place, the people, the feeling you're after. I reply to every enquiry personally.",
  href = "/contact",
  linkLabel = "Start an enquiry",
  image = "/images/cta-wide.jpg",
}: CTAProps) {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src={image}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-ink/75" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-ink/20" />

      <div className="container-x relative flex flex-col items-start gap-10 py-24 md:py-32 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-6 font-display text-4xl leading-[1.06] text-ivory md:text-5xl lg:text-6xl">
            {title}
          </h2>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-ivory/60 md:text-base">
            {body}
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <Link
            href={href}
            className="group inline-flex items-center gap-5 border border-gold/60 px-8 py-4 text-[10px] uppercase tracking-[0.28em] text-gold transition-colors duration-300 hover:bg-gold hover:text-ink"
          >
            {linkLabel}
            <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1.5">
              →
            </span>
          </Link>
          <a
            href={`mailto:${site.email}`}
            className="text-center text-[10px] uppercase tracking-[0.22em] text-ivory/50 transition-colors hover:text-gold"
          >
            {site.email}
          </a>
        </div>
      </div>
    </section>
  );
}
