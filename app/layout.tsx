import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { site } from "@/data/site";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://anishatelyfilms.com"),
  title: {
    default: "Anisha Tely Films — Wedding Photography & Film",
    template: "%s · Anisha Tely Films",
  },
  description: site.description,
  keywords: [
    "wedding photographer",
    "destination wedding",
    "wedding film",
    "luxury wedding photography",
    "Italy wedding photographer",
    "India wedding photographer",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "/",
    siteName: site.fullName,
    title: "Anisha Tely Films — Wedding Photography & Film",
    description: site.description,
    images: [
      {
        url: "/images/hero-01.jpg",
        width: 2000,
        height: 1250,
        alt: "Anisha Tely Films — wedding photography",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anisha Tely Films — Wedding Photography & Film",
    description: site.description,
    images: ["/images/hero-01.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
  themeColor: "#08080a",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.fullName,
  description: site.description,
  url: "https://anishatelyfilms.com",
  image: "https://anishatelyfilms.com/images/hero-01.jpg",
  telephone: site.phone,
  email: site.email,
  priceRange: "₹₹₹",
  founder: { "@type": "Person", name: site.name },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Studio 4, Pali Hill Road",
    addressLocality: "Bandra West, Mumbai",
    postalCode: "400050",
    addressCountry: "IN",
  },
  areaServed: ["India", "Italy", "United Kingdom", "Worldwide"],
  sameAs: site.socials.map((social) => social.href),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="grain flex min-h-screen flex-col bg-ink text-ivory antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:border focus:border-gold focus:bg-ink focus:px-5 focus:py-3 focus:text-xs focus:uppercase focus:tracking-[0.2em] focus:text-gold"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
