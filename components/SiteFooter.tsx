import Link from "next/link";
import { site, footerLinks } from "@/data/site";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line/70 bg-ink-soft">
      <div className="container-x py-16 md:py-20">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Link href="/" className="flex items-center gap-3.5" aria-label={`${site.fullName} — home`}>
              <span className="flex h-11 w-11 items-center justify-center border border-gold/45 font-display text-sm tracking-[0.18em] text-gold">
                AT
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-lg tracking-[0.2em] text-ivory">
                  ANISHA TELY
                </span>
                <span className="mt-1 text-[9px] uppercase tracking-[0.34em] text-muted">
                  Photography &amp; Film
                </span>
              </span>
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
              Quiet, editorial wedding photography and film for celebrations that
              feel like you. Based in {site.basedIn}, working worldwide.
            </p>
            <p className="mt-6 text-[10px] uppercase tracking-[0.28em] text-gold/80">
              {site.bookingNote}
            </p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.heading}>
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-muted-2">
                {group.heading}
              </h3>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ivory/75 transition-colors hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-muted-2">
              Say hello
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-ivory/75 transition-colors hover:text-gold"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="text-ivory/75 transition-colors hover:text-gold"
                >
                  {site.phone}
                </a>
              </li>
              <li>
                <address className="not-italic leading-relaxed text-muted">
                  {site.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </li>
              <li className="text-[10px] uppercase tracking-[0.22em] text-muted-2">
                {site.studioHours}
              </li>
            </ul>
            <div className="mt-6 flex gap-5">
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
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line/60 pt-8 text-[10px] uppercase tracking-[0.22em] text-muted-2 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.copyrightYear} {site.fullName}. All rights reserved.
          </p>
          <p>Made with care · Mumbai &amp; London</p>
        </div>
      </div>
    </footer>
  );
}
