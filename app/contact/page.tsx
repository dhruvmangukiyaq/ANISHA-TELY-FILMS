import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import InquiryForm from "@/components/InquiryForm";
import PageHero from "@/components/PageHero";
import SectionLabel from "@/components/SectionLabel";
import WhatsAppButton from "@/components/WhatsAppButton";
import { mapsHref, site, whatsappHref } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Enquire about wedding photography and film with Anisha Tely. Now booking 2026 and 2027 celebrations worldwide.",
  path: "/contact",
  image: "/images/journal-01.jpg",
  imageAlt: "Enquire with Anisha Tely Films",
  keywords: [
    "book a wedding photographer",
    "wedding photography enquiry",
    "wedding photographer contact",
  ],
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact"
        title={
          <>
            Tell me about
            <br />
            <em className="italic text-gold-light">your day.</em>
          </>
        }
        description="A few details are enough to start. I reply to every enquiry personally, usually within two working days — and there is no pressure to book."
        meta={
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-line/60 pt-6 text-[10px] uppercase tracking-[0.24em] text-muted-2">
            <span className="text-gold/90">{site.bookingNote}</span>
            <span aria-hidden className="h-1 w-1 rotate-45 bg-gold/60" />
            <span>Replies within 2 days</span>
            <span aria-hidden className="h-1 w-1 rotate-45 bg-gold/60" />
            <span>No obligation</span>
          </div>
        }
      />

      <section className="container-x py-16 md:py-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <aside className="lg:col-span-4">
            <SectionLabel>Studio Details</SectionLabel>

            <dl className="mt-8 space-y-7">
              <div>
                <dt className="text-[9px] uppercase tracking-[0.28em] text-muted-2">
                  Email
                </dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${site.email}`}
                    className="break-all text-sm text-ivory/85 transition-colors hover:text-gold"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[9px] uppercase tracking-[0.28em] text-muted-2">
                  Telephone
                </dt>
                <dd className="mt-2">
                  <a
                    href={`tel:${site.phone.replace(/\s/g, "")}`}
                    className="text-sm text-ivory/85 transition-colors hover:text-gold"
                  >
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[9px] uppercase tracking-[0.28em] text-muted-2">
                  The studio
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-ivory/85">
                  {site.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="text-[9px] uppercase tracking-[0.28em] text-muted-2">
                  Hours
                </dt>
                <dd className="mt-2 text-sm text-ivory/85">{site.studioHours}</dd>
              </div>
            </dl>

            <WhatsAppButton className="mt-9" />

            <div className="relative mt-8 hidden aspect-[4/3] w-full overflow-hidden lg:block">
              <Image
                src="/images/journal-01.jpg"
                alt="A quiet detail from a wedding celebration"
                fill
                sizes="30vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
            </div>

            <div className="mt-8 flex flex-wrap gap-5 border-t border-line/60 pt-6">
              {site.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] uppercase tracking-[0.22em] text-muted transition-colors hover:text-gold"
                >
                  {social.label}
                </a>
              ))}
            </div>

            <Link href="/faq" className="link-gold mt-8 inline-flex">
              Read the FAQ
            </Link>
          </aside>

          <div className="lg:col-span-8">
            <div className="border border-line/70 bg-surface/30 p-6 sm:p-8 md:p-10">
              <InquiryForm />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line/60 bg-ink-soft py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionLabel>The Studio</SectionLabel>
            <h2 className="mt-6 font-display text-3xl font-light leading-[1.1] text-ivory md:text-4xl">
              Pali Hill,
              <br />
              <em className="italic text-gold-light">Bandra West.</em>
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-[1.9] text-muted">
              The studio sits a short walk from Bandra station, above the
              tailor&apos;s shop with the green awning. Visits are by appointment
              only, so the prints are out and the coffee is ready.
            </p>

            <dl className="mt-8 space-y-5 border-t border-line/60 pt-6">
              <div>
                <dt className="text-[9px] uppercase tracking-[0.26em] text-muted-2">
                  Address
                </dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-ivory/85">
                  {site.address.join(", ")}
                </dd>
              </div>
              <div>
                <dt className="text-[9px] uppercase tracking-[0.26em] text-muted-2">
                  Visiting
                </dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-ivory/85">
                  By appointment · {site.studioHours}
                </dd>
              </div>
            </dl>

            <a
              href={mapsHref}
              target="_blank"
              rel="noreferrer"
              className="link-gold mt-8 inline-flex"
            >
              Open in Google Maps
            </a>
          </div>

          <div className="lg:col-span-8">
            <div className="relative isolate h-[20rem] overflow-hidden border border-line/70 bg-ink sm:h-[26rem]">
              <div
                aria-hidden
                className="absolute inset-0 opacity-80"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, var(--color-line-soft) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line-soft) 1px, transparent 1px)",
                  backgroundSize: "52px 52px",
                }}
              />

              {/* stylised roads and blocks */}
              <div
                aria-hidden
                className="absolute left-[-10%] top-[36%] h-px w-[130%] -rotate-[14deg] bg-line"
              />
              <div
                aria-hidden
                className="absolute left-[-10%] top-[64%] h-[2px] w-[130%] rotate-[6deg] bg-line/80"
              />
              <div
                aria-hidden
                className="absolute left-[30%] top-[-10%] h-[130%] w-px rotate-[15deg] bg-line/70"
              />
              <div
                aria-hidden
                className="absolute left-[66%] top-[-10%] h-[130%] w-px -rotate-[9deg] bg-line/60"
              />
              <div
                aria-hidden
                className="absolute -bottom-16 -right-10 h-56 w-72 rotate-12 rounded-[42%] bg-gold/[0.05]"
              />
              <div
                aria-hidden
                className="absolute -left-16 top-4 h-40 w-52 rounded-[45%] bg-[#1b2a24]/50"
              />

              {/* marker */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <span
                  aria-hidden
                  className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-gold/15"
                />
                <span className="relative block h-3 w-3 rounded-full bg-gold ring-4 ring-gold/25" />
              </div>

              <p className="absolute left-5 top-5 border border-line/70 bg-ink/80 px-3 py-1.5 text-[9px] uppercase tracking-[0.24em] text-muted-2 backdrop-blur">
                Map placeholder
              </p>

              <div className="absolute bottom-5 left-5 right-5 border border-line/70 bg-ink/85 p-5 backdrop-blur sm:right-auto sm:max-w-[19rem]">
                <p className="text-[9px] uppercase tracking-[0.26em] text-gold">
                  Anisha Tely Films
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ivory/85">
                  Studio 4, Pali Hill Road
                  <br />
                  Bandra West, Mumbai 400050
                </p>
                <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-muted-2">
                  {site.studioHours}
                </p>
              </div>
            </div>

            <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-muted-2">
              Static preview — the live site would embed an interactive map here.
            </p>
          </div>
        </div>
      </section>

      <section className="container-x py-14 md:py-16">
        <div className="flex flex-col gap-7 border-t border-line/60 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-lg text-sm leading-[1.9] text-muted">
            If your date is soon, WhatsApp is the fastest way to reach me. For
            everything else, the form above lands straight in the studio inbox.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="border border-ivory/25 px-6 py-3.5 text-[10px] uppercase tracking-[0.26em] text-ivory/80 transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              Call the studio
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="border border-gold/60 px-6 py-3.5 text-[10px] uppercase tracking-[0.26em] text-gold transition-colors duration-300 hover:bg-gold hover:text-ink"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
