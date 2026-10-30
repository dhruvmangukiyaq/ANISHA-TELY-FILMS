import type { Metadata } from "next";
import { site } from "@/data/site";

const defaultImage = "/images/hero-01.jpg";

type PageMetaOptions = {
  /** Short page title; the root template appends the studio name. */
  title: string;
  description: string;
  /** Route path used for the canonical and Open Graph URL, e.g. "/about". */
  path: string;
  image?: string;
  imageAlt?: string;
  keywords?: string[];
};

/**
 * Builds consistent per-page metadata: canonical URL, Open Graph, and Twitter
 * cards. `metadataBase` in the root layout resolves the relative paths.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = defaultImage,
  imageAlt,
  keywords,
}: PageMetaOptions): Metadata {
  const socialTitle = `${title} · ${site.fullName}`;

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_GB",
      url: path,
      siteName: site.fullName,
      title: socialTitle,
      description,
      images: [{ url: image, alt: imageAlt ?? socialTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image],
    },
  };
}
