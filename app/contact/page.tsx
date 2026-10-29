import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import InquiryForm from "@/components/InquiryForm";
import PageHero from "@/components/PageHero";
import SectionLabel from "@/components/SectionLabel";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Enquire about wedding photography and film with Anisha Tely. Now booking 2026 and 2027 celebrations worldwide.",
};

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
                    className="text-sm text-ivory/85 transition-colors hover:text-gold"
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
                  Based between
                </dt>
                <dd className="mt-2 text-sm text-ivory/85">{site.location}</dd>
              </div>
              <div>
                <dt className="text-[9px] uppercase tracking-[0.28em] text-muted-2">
                  Follow
                </dt>
                <dd className="mt-3 flex flex-wrap gap-5">
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
                </dd>
              </div>
            </dl>

            <div className="relative mt-10 hidden aspect-[4/3] w-full overflow-hidden lg:block">
              <Image
                src="/images/journal-01.jpg"
                alt="A quiet detail from a wedding celebration"
                fill
                sizes="30vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
            </div>

            <p className="mt-10 border-t border-line/60 pt-6 text-sm leading-relaxed text-muted">
              Prefer to talk it through? Mention a good time in your message and
              I&apos;ll send a calendar link for a short, no-obligation call.
            </p>

            <Link href="/about#faq" className="link-gold mt-8 inline-flex">
              Read the FAQ
            </Link>
          </aside>

          <div className="lg:col-span-8">
            <div className="border border-line/70 bg-surface/30 p-6 sm:p-8 md:p-10">
              <InquiryForm />
            </div>
            <p className="mt-6 text-[10px] leading-relaxed uppercase tracking-[0.2em] text-muted-2">
              Your details stay private and are never shared. This portfolio is a
              front-end demo — the form does not send data.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
