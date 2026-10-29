import type { MetadataRoute } from "next";
import { galleries } from "@/data/galleries";
import { services } from "@/data/services";

const baseUrl = "https://anishatelyfilms.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/gallery",
    "/videos",
    "/reviews",
    "/faq",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const serviceRoutes = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const galleryRoutes = galleries.map((gallery) => ({
    url: `${baseUrl}/portfolio/${gallery.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...galleryRoutes];
}
