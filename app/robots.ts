import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo";

// Search engines and AI assistants (ChatGPT search, GPTBot) may crawl everything except the API.
// Ticket pages carry their own noindex, so they are not blocked here (a block would hide that noindex).
export default function robots(): MetadataRoute.Robots {
  const disallow = ["/api/"];
  return {
    rules: [
      ...["OAI-SearchBot", "GPTBot", "ChatGPT-User", "Googlebot", "Bingbot"].map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow,
      })),
      { userAgent: "*", allow: "/", disallow },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
