"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/data/site";

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || open
            ? "border-b border-line/70 bg-ink/90 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div
          className={`container-x flex items-center justify-between transition-all duration-500 ${
            scrolled ? "h-16 md:h-[4.5rem]" : "h-20 md:h-24"
          }`}
        >
          <Link
            href="/"
            className="group flex items-center gap-3.5"
            aria-label={`${site.fullName} — home`}
          >
            <span className="flex h-10 w-10 items-center justify-center border border-gold/45 font-display text-sm tracking-[0.18em] text-gold transition-colors duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
              AT
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-lg tracking-[0.2em] text-ivory">
                ANISHA TELY
              </span>
              <span className="mt-1 text-[9px] uppercase tracking-[0.34em] text-muted">
                Photography &amp; Film
              </span>
            </span>
          </Link>

          <nav
            className="hidden items-center gap-4 lg:flex xl:gap-6"
            aria-label="Primary"
          >
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative whitespace-nowrap text-[9.5px] uppercase tracking-[0.18em] transition-colors duration-300 xl:text-[10px] xl:tracking-[0.22em] ${
                  isActive(item.href)
                    ? "text-gold"
                    : "text-ivory/70 hover:text-ivory"
                }`}
              >
                {item.label}
                <span
                  aria-hidden
                  className={`absolute -bottom-2 left-0 h-px bg-gold transition-all duration-500 ${
                    isActive(item.href) ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden whitespace-nowrap border border-gold/50 px-5 py-3 text-[10px] uppercase tracking-[0.22em] text-gold transition-colors duration-300 hover:bg-gold hover:text-ink sm:inline-flex"
            >
              Book Now
            </Link>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-[6px] border border-line/70 lg:hidden"
            >
              <span
                className={`block h-px w-5 bg-ivory transition-transform duration-300 ${
                  open ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-5 bg-ivory transition-transform duration-300 ${
                  open ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 flex flex-col bg-ink transition-all duration-500 lg:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="container-x flex flex-1 flex-col justify-start overflow-y-auto pt-28 pb-12">
          <nav className="flex flex-col gap-0.5" aria-label="Mobile">
            {site.nav.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="group flex items-baseline justify-between border-b border-line/60 py-3.5"
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <span className="font-display text-3xl text-ivory transition-colors group-hover:text-gold sm:text-4xl">
                  {item.label}
                </span>
                <span className="text-[10px] tracking-[0.3em] text-muted">
                  0{index + 1}
                </span>
              </Link>
            ))}
          </nav>

          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-8 inline-flex w-fit items-center gap-4 border border-gold/60 px-7 py-3.5 text-[10px] uppercase tracking-[0.26em] text-gold transition-colors hover:bg-gold hover:text-ink"
          >
            Book Now
            <span aria-hidden>→</span>
          </Link>

          <div className="mt-8 flex flex-col gap-4 text-sm text-muted">
            <a href={`mailto:${site.email}`} className="hover:text-gold">
              {site.email}
            </a>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-gold">
              {site.phone}
            </a>
            <div className="flex gap-6 pt-2">
              {site.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] uppercase tracking-[0.26em] hover:text-gold"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
