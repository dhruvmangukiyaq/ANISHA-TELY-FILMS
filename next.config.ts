import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // AVIF first, WebP fallback — both are smaller than the source JPEGs.
    formats: ["image/avif", "image/webp"],
    // Source photography tops out at 2000px, so skip the 3840px variant.
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920, 2048],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
