import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CTA from "@/components/CTA";
import Marquee from "@/components/Marquee";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import Stats from "@/components/Stats";
import { approach } from "@/data/collections";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Anisha Tely — wedding photographer and filmmaker working between Mumbai and London. Quiet, editorial photography for intimate celebrations.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About"
        title={
          <>
            The person
            <br />
            <em className="italic text-gold-light">behind the lens.</em>
          </>
        }
        description="Photographer, filmmaker, and a firm believer that the best photographs happen when nobody is performing for them."
        meta={
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-line/60 pt-6 text-[10px] uppercase tracking-[0.24em] text-muted-2">
            <span>{site.role}</span>
            <span aria-hidden className="h-1 w-1 rotate-45 bg-gold/60" />
            <span>{site.basedIn}</span>
            <span aria-hidden className="h-1 w-1 rotate-45 bg-gold/60" />
            <span>Est. 2014</span>
          </div>
        }
      />

      {/* Story */}
      <section className="container-x py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src="/images/about-portrait.jpg"
                  alt="Anisha Tely, wedding photographer and filmmaker"
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                <p className="absolute bottom-6 left-6 text-[9.5px] uppercase tracking-[0.26em] text-ivory/70">
                  Anisha Tely · Mumbai
                </p>
              </div>

              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line/60 pt-6">
                <div>
                  <dt className="text-[9px] uppercase tracking-[0.22em] text-muted-2">
                    Based in
                  </dt>
                  <dd className="mt-1.5 text-sm text-ivory/80">{site.basedIn}</dd>
                </div>
                <div>
                  <dt className="text-[9px] uppercase tracking-[0.22em] text-muted-2">
                    Works in
                  </dt>
                  <dd className="mt-1.5 text-sm text-ivory/80">
                    India · Europe · UK
                  </dd>
                </div>
                <div>
                  <dt className="text-[9px] uppercase tracking-[0.22em] text-muted-2">
                    Languages
                  </dt>
                  <dd className="mt-1.5 text-sm text-ivory/80">
                    English · Hindi · Marathi
                  </dd>
                </div>
                <div>
                  <dt className="text-[9px] uppercase tracking-[0.22em] text-muted-2">
                    Studio
                  </dt>
                  <dd className="mt-1.5 text-sm text-ivory/80">Bandra West</dd>
                </div>
              </dl>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <SectionLabel>A Note From Anisha</SectionLabel>
            <Reveal>
              <h2 className="mt-6 font-display text-3xl font-light leading-[1.16] text-ivory md:text-4xl lg:text-[2.7rem]">
                I started photographing weddings because I wanted to understand
                what people look like{" "}
                <em className="italic text-gold-light">when they mean it.</em>
              </h2>
            </Reveal>

            <div className="mt-8 space-y-5 text-sm leading-[1.9] text-muted">
              <p>
                Eleven years, a hundred and twenty weddings, and I still get
                nervous before the ceremony. Not because anything might go
                wrong — because something real is about to happen, and I want to
                be ready for it.
              </p>
              <p>
                I trained as an editorial photographer in Mumbai and assisted a
                documentary photographer in London, which is where I learned the
                thing that still shapes my work: the best frame is usually the
                one just after the one everyone expects. The hand on a shoulder.
                The mother in the doorway. The five seconds of quiet before the
                doors open.
              </p>
              <p>
                My couples tend to be thoughtful, well-travelled, and not
                particularly interested in tradition for its own sake. They want
                a record of the day that feels like them — warm, a little
                imperfect, and honest enough to still move them in twenty years.
              </p>
              <p>
                I work quietly, mostly in natural light, and always as myself.
                By the time the wedding comes around, I hope we&apos;ll feel like
                old friends.
              </p>
            </div>

            <p className="mt-8 font-display text-3xl italic text-gold-light">
              Anisha
            </p>

            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-line/60 pt-6">
              {site.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="link-gold"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 md:mt-24">
          <Stats />
        </div>
      </section>

      {/* Photo band */}
      <section className="relative isolate flex min-h-[70vh] items-end overflow-hidden">
        <Image
          src="/images/hero-02.jpg"
          alt="A quiet moment during a wedding celebration"
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />

        <div className="container-x relative pb-16 md:pb-24">
          <Reveal>
            <p className="max-w-3xl font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-light leading-[1.3] text-ivory">
              &ldquo;The best frame is usually the one just after the one
              everyone expects.&rdquo;
            </p>
          </Reveal>
          <p className="mt-6 text-[9.5px] uppercase tracking-[0.28em] text-ivory/50">
            Anisha Tely · Val d&apos;Orcia, 2025
          </p>
        </div>
      </section>

      {/* Approach */}
      <section
        id="approach"
        className="scroll-mt-24 border-b border-line/60 bg-ink-soft py-24 md:py-32"
      >
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionLabel>The Approach</SectionLabel>
            <h2 className="mt-6 font-display text-4xl font-light leading-[1.08] text-ivory md:text-5xl">
              How we work
              <br />
              <em className="italic text-gold-light">together.</em>
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
              Three parts, one continuous conversation. No shot lists that
              dictate the day, no hours spent away from your guests.
            </p>

            <div className="relative mt-10 hidden aspect-[4/3] w-full overflow-hidden lg:block">
              <Image
                src="/images/galleries/villa-balbiano/cover.jpg"
                alt="A wedding reception on Lake Como"
                fill
                loading="lazy"
                sizes="30vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="divide-y divide-line/70 border-t border-line/70">
              {approach.map((step) => (
                <Reveal key={step.number}>
                  <div className="grid gap-4 py-9 sm:grid-cols-[auto_1fr] sm:gap-10">
                    <span className="font-display text-xl text-gold/70">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="font-display text-2xl text-ivory md:text-3xl">
                        {step.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-10 border border-line/70 p-7 md:p-9">
              <p className="text-[9.5px] uppercase tracking-[0.28em] text-gold">
                A small promise
              </p>
              <p className="mt-4 font-display text-xl leading-relaxed text-ivory/85 md:text-2xl">
                However the day unfolds, you will not spend it with me. You will
                spend it with the people you love — and I will be there,
                quietly, to make sure it isn&apos;t forgotten.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Press */}
      <section className="border-b border-line/60 py-16 md:py-20">
        <div className="container-x mb-10">
          <SectionLabel align="center">As seen in</SectionLabel>
        </div>
        <Marquee items={site.press} label="Featured publications" />
      </section>

      {/* Next */}
      <section className="container-x py-20 md:py-24">
        <div className="grid gap-px overflow-hidden border border-line/70 bg-line/70 md:grid-cols-3">
          {[
            {
              href: "/services",
              label: "Services",
              body: "Three ways to work together, with full inclusions and pricing.",
            },
            {
              href: "/faq",
              label: "FAQ",
              body: "Travel, timelines, editing, and what arrives afterwards.",
            },
            {
              href: "/portfolio",
              label: "Portfolio",
              body: "Six recent weddings, photographed start to finish.",
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex h-full flex-col bg-ink-soft p-7 transition-colors duration-500 hover:bg-surface/60 md:p-8"
            >
              <p className="font-display text-2xl text-ivory transition-colors duration-500 group-hover:text-gold">
                {item.label}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.body}
              </p>
              <span className="mt-auto pt-7 text-[9px] uppercase tracking-[0.26em] text-gold">
                Explore{" "}
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-500 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <CTA
        eyebrow="Enquiries"
        title="I'd love to hear about it."
        body="Send a few details about your day and I'll reply with availability, the full collection guide, and a few questions of my own."
      />
    </>
  );
}
