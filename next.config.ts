import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  images: {
    // Temporary stock photos in the About section (free Unsplash licence) until real team/office photos replace them.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com", pathname: "/photo-**" }],
  },
  // Old or common addresses for pages that exist under another path. 301 so search engines move their ranking over.
  async redirects() {
    const moved: [string, string][] = [
      ["/about-us", "/about"],
      ["/contact-us", "/contact"],
      ["/team", "/teams"],
      ["/our-team", "/teams"],
      ["/career", "/careers"],
      ["/jobs", "/careers"],
      ["/our-work", "/portfolio"],
      ["/work", "/portfolio"],
      ["/projects", "/portfolio"],
      ["/services", "/#services"],
      ["/plans", "/pricing"],
      ["/privacy", "/privacy-policy"],
      ["/terms", "/terms-and-conditions"],
      ["/book", "/book-consultation"],
      ["/consultation", "/book-consultation"],
      ["/services/web-development", "/services/web-design-development"],
      ["/services/ecommerce", "/services/end-to-end-ecommerce"],
      ["/services/digital-marketing", "/services/performance-marketing"],
      ["/services/photography", "/services/product-photography-video"],
      ["/case-study", "/case-study/trenzo"],
    ];
    return moved.map(([source, destination]) => ({ source, destination, statusCode: 301 as const }));
  },
  cacheComponents: true,
  partialPrefetching: true,
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
