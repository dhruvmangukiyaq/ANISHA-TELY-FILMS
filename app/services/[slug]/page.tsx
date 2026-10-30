import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTA from "@/components/CTA";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import {
  getAdjacentServices,
  getService,
  services,
} from "@/data/services";
import { pageMetadata } from "@/lib/seo";

// Every slug is prerendered; allow the route to resolve params before rendering.
export const instant = false;

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

const pad = (value: number) => String(value).padStart(2, "0");

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return { title: "Service not found" };
  }

  return pageMetadata({
    title: service.name,
    description: service.description,
    path: `/services/${service.slug}`,
    image: service.cover,
    imageAlt: `${service.name} by Anisha Tely`,
    keywords: [
      service.name.toLowerCase(),
      `${service.name.toLowerCase()} pricing`,
      "wedding photographer",
    ],
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  const index = services.findIndex((item) => item.slug === service.slug);
  const { previous, next } = getAdjacentServices(service.slug);

  return (
    <>
      <section className="relative overflow-hidden border-b border-line/60 pb-16 pt-36 md:pb-24 md:pt-44">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-gold/[0.055] blur-3xl"
        />

        <div className="container-x relative">
          <div className="flex flex-wrap items-center gap-4 text-[10px] uppercase tracking-[0.24em] text-muted-2">
            <Link href="/services" className="transition-colors hover:text-gold">
              Services
            </Link>
            <span aria-hidden className="h-px w-6 bg-line" />
            <span className="text-gold/80">
              {pad(index + 1)} / {pad(services.length)}
            </span>
          </div>

          <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <h1 className="font-display text-[clamp(2.6rem,6vw,4.6rem)] font-light leading-[1.02] tracking-[-0.01em] text-ivory">
                  {service.name}
                </h1>
              </Reveal>
              <Reveal delay={80}>
                <p className="mt-4 font-display text-xl italic text-gold-light md:text-2xl">
                  {service.tagline}
                </p>
              </Reveal>
              <Reveal delay={140}>
                <p className="mt-7 max-w-xl text-sm leading-[1.9] text-muted md:text-base">
                  {service.description}
                </p>
              </Reveal>

              <Reveal delay={200}>
                <dl className="mt-10 grid gap-6 border-t border-line/60 pt-7 sm:grid-cols-3">
                  <div>
                    <dt className="text-[9px] uppercase tracking-[0.24em] text-muted-2">
                      Investment
                    </dt>
                    <dd className="mt-2 font-display text-lg text-ivory">
                      {service.startingPrice}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[9px] uppercase tracking-[0.24em] text-muted-2">
                      Best for
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-ivory/75">
                      {service.bestFor}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[9px] uppercase tracking-[0.24em] text-muted-2">
                      Coverage
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-ivory/75">
                      {service.coverage}
                    </dd>
                  </div>
                </dl>
              </Reveal>

              <Reveal delay={260}>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-4 border border-gold bg-gold px-7 py-3.5 text-[10px] uppercase tracking-[0.26em] text-ink transition-colors duration-300 hover:border-gold-light hover:bg-gold-light"
                  >
                    Check availability
                    <span
                      aria-hidden
                      className="transition-transform duration-500 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-4 border border-ivory/25 px-7 py-3.5 text-[10px] uppercase tracking-[0.26em] text-ivory/80 transition-colors duration-300 hover:border-gold hover:text-gold"
                  >
                    All services
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal className="lg:col-span-5" delay={120}>
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface">
                <Image
                  src={service.cover}
                  alt={`${service.name} — ${service.tagline}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                <p className="absolute bottom-6 left-6 text-[9px] uppercase tracking-[0.26em] text-ivory/70">
                  Anisha Tely · {service.coverage}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="container-x py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionLabel>What&apos;s Included</SectionLabel>
            <h2 className="mt-6 font-display text-3xl font-light leading-[1.1] text-ivory md:text-4xl lg:text-[2.6rem]">
              Everything that comes
              <br />
              <em className="italic text-gold-light">with the day.</em>
            </h2>

            <div className="mt-8 space-y-5 text-sm leading-[1.9] text-muted">
              {service.details.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-9 border border-line/70 bg-surface/30 p-6 md:p-7">
              <p className="text-[9px] uppercase tracking-[0.26em] text-gold">
                Investment
              </p>
              <p className="mt-3 font-display text-2xl text-ivory">
                {service.startingPrice}
              </p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-muted-2">
                Travel &amp; accommodation quoted separately
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ul className="divide-y divide-line/70 border-y border-line/70">
              {service.includes.map((item, itemIndex) => (
                <li
                  key={item}
                  className="flex items-baseline gap-5 py-5 md:gap-8"
                >
                  <span className="text-[10px] tracking-[0.24em] text-gold/70">
                    {pad(itemIndex + 1)}
                  </span>
                  <span className="text-sm leading-relaxed text-ivory/80">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[9px] uppercase tracking-[0.22em] text-muted-2">
              <span>Hand-edited</span>
              <span aria-hidden className="h-1 w-1 rotate-45 bg-gold/50" />
              <span>Print rights included</span>
              <span aria-hidden className="h-1 w-1 rotate-45 bg-gold/50" />
              <span>Private gallery</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x pb-20 md:pb-24">
        <div className="grid gap-4 sm:grid-cols-3">
          {service.images.map((src, imageIndex) => (
            <Reveal key={src} delay={imageIndex * 80}>
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface">
                <Image
                  src={src}
                  alt={`Selected frame from a recent ${service.name.toLowerCase()} wedding`}
                  fill
                  loading="lazy"
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover transition-transform duration-[1400ms] ease-out hover:scale-[1.03]"
                />
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-5 text-[9px] uppercase tracking-[0.24em] text-muted-2">
          Selected frames from recent weddings
        </p>
      </section>

      <section className="border-y border-line/60 bg-ink-soft py-20 md:py-28">
        <div className="container-x">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel>The Process</SectionLabel>
              <h2 className="mt-6 max-w-xl font-display text-4xl font-light leading-[1.06] text-ivory md:text-5xl">
                How it works.
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted md:pb-2 md:text-right">
              Three parts, one continuous conversation — from the first email to
              the archive arriving on your doorstep.
            </p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden border border-line/70 bg-line/70 md:grid-cols-3">
            {service.process.map((step, stepIndex) => (
              <Reveal
                key={step.title}
                delay={stepIndex * 100}
                className="h-full bg-ink-soft"
              >
                <div className="flex h-full flex-col p-7 md:p-8">
                  <span className="text-[10px] tracking-[0.3em] text-gold/70">
                    {pad(stepIndex + 1)}
                  </span>
                  <h3 className="mt-5 font-display text-2xl leading-tight text-ivory">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {previous && next && (
        <section className="container-x py-16 md:py-20">
          <div className="grid gap-px overflow-hidden border border-line/70 bg-line/70 sm:grid-cols-2">
            <Link
              href={`/services/${previous.slug}`}
              className="group bg-ink-soft p-7 transition-colors duration-500 hover:bg-surface/60 md:p-9"
            >
              <p className="text-[9px] uppercase tracking-[0.24em] text-muted-2">
                ← Previous
              </p>
              <p className="mt-3 font-display text-xl text-ivory transition-colors duration-500 group-hover:text-gold md:text-2xl">
                {previous.name}
              </p>
            </Link>
            <Link
              href={`/services/${next.slug}`}
              className="group bg-ink-soft p-7 text-right transition-colors duration-500 hover:bg-surface/60 md:p-9"
            >
              <p className="text-[9px] uppercase tracking-[0.24em] text-muted-2">
                Next →
              </p>
              <p className="mt-3 font-display text-xl text-ivory transition-colors duration-500 group-hover:text-gold md:text-2xl">
                {next.name}
              </p>
            </Link>
          </div>
        </section>
      )}

      <CTA
        eyebrow="Enquiries"
        title="Tell me what you're planning."
        body="Send the date, the place, and a little about the two of you. I'll reply with availability, the full collection guide, and a few questions of my own."
        image={service.cover}
      />
    </>
  );
}
