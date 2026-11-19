import fs from "node:fs";
import path from "node:path";

import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo";

// Built from the app folder: every page.tsx becomes a URL, so a new page is listed without editing this file.
// Skipped: dynamic segments ([token]), private folders (_sections) and pages that ask search engines not to index them.
const APP = path.join(process.cwd(), "app");

function pages(dir: string, route: string[] = []): string[] {
  const found: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) {
      if (
        entry.name === "page.tsx" &&
        !/robots:\s*\{\s*index:\s*false/.test(fs.readFileSync(path.join(dir, entry.name), "utf8"))
      )
        found.push("/" + route.join("/"));
      continue;
    }
    const name = entry.name;
    if (name.startsWith("_") || name.startsWith("[") || name === "api") continue;
    found.push(...pages(path.join(dir, name), /^\(.*\)$/.test(name) ? route : [...route, name]));
  }
  return found;
}

const weight = (url: string) =>
  url === "/"
    ? 1
    : url.startsWith("/services/")
      ? 0.9
      : ["/portfolio", "/pricing", "/contact", "/book-consultation"].includes(url)
        ? 0.8
        : /policy|terms|agreement|nda/.test(url)
          ? 0.3
          : 0.6;

export default function sitemap(): MetadataRoute.Sitemap {
  return pages(APP)
    .sort((a, b) => weight(b) - weight(a) || a.localeCompare(b))
    .map((url) => ({
      url: url === "/" ? SITE_URL : `${SITE_URL}${url}`,
      changeFrequency: url === "/" || url === "/portfolio" ? "weekly" : "monthly",
      priority: weight(url),
    }));
}
