// Server only: imported by server components, never by client code.
import { cacheLife } from "next/cache";

import { autoPublish, google, type Review, reviews as curated } from "./reviews";

// Live Google reviews via the Places API (New). Needs GOOGLE_PLACES_API_KEY on Vercel; without it (or if Google
// fails) the curated list in lib/reviews.ts is used, so the section never breaks.
// Cached and refreshed hourly: about 24 calls a day, well inside Google's free monthly allowance.

type PlacesReview = {
  rating?: number;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: { displayName?: string; uri?: string };
  googleMapsUri?: string;
};

export type GoogleReviews = { rating: number; count: number; reviews: Review[]; live: boolean };

const fallback = (): GoogleReviews => ({
  rating: google.rating,
  count: google.count,
  reviews: curated.filter((r) => r.approved),
  live: false,
});

export async function getGoogleReviews(): Promise<GoogleReviews> {
  "use cache";
  cacheLife("hours");

  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return fallback();

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${google.placeId}?languageCode=en`, {
      headers: {
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "rating,userRatingCount,reviews",
      },
    });
    if (!res.ok) throw new Error(`Places API ${res.status}: ${await res.text()}`);
    const data = (await res.json()) as { rating?: number; userRatingCount?: number; reviews?: PlacesReview[] };

    const hidden = new Set(autoPublish.hiddenAuthors);
    const live: Review[] = (data.reviews ?? []).flatMap((r) => {
      const author = r.authorAttribution?.displayName?.trim() ?? "";
      const text = (r.originalText?.text ?? r.text?.text ?? "").trim();
      const rating = Math.round(r.rating ?? 0) as Review["rating"];
      if (!author || hidden.has(author) || rating < autoPublish.minRating || text.length < autoPublish.minLength) {
        return [];
      }
      // Reuse what we know about this client (company, industry, a named person) from the curated list.
      const known = curated.find((c) => c.author === author);
      return [
        {
          author,
          rating,
          text,
          company: known?.company ?? author,
          industry: known?.industry ?? "Client",
          person: known?.person,
          role: known?.role,
          approved: true,
          url: r.googleMapsUri ?? r.authorAttribution?.uri,
        },
      ];
    });

    return {
      rating: data.rating ?? google.rating,
      count: data.userRatingCount ?? google.count,
      reviews: live.length > 0 ? live : fallback().reviews,
      live: true,
    };
  } catch (error) {
    console.error("[reviews] Falling back to curated reviews:", error);
    return fallback();
  }
}
