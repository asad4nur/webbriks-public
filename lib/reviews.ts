// Reviews from Web Briks LLC's Google Business Profile.
//
// Live: with GOOGLE_PLACES_API_KEY set on Vercel, lib/google-reviews.ts pulls the listing's reviews from Google
// every hour, so a new client review appears on the site by itself (Google returns the 5 most relevant).
// What shows up automatically: 4–5 stars with at least a sentence of text, unless the author is in `hiddenAuthors`.
// The list below is the fallback (no key, or Google unreachable) and adds the client name / industry to a review.
// Keep review text exactly as written on Google.

export const google = {
  name: "Web Briks LLC",
  placeId: "ChIJP5ZhRQDBVTcRV4KpJzvbkWo",
  /** Used when live data isn't available. */
  rating: 4.7,
  count: 3,
  /** Opens the listing's reviews on Google. */
  reviewsUrl: "https://www.google.com/search?q=Web+Briks+LLC#lrd=0x3755c1004561963f:0x6a91db3b27a98257,1",
  /** Google's official "write a review" link for the listing. Send this to clients. */
  writeReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJP5ZhRQDBVTcRV4KpJzvbkWo",
};

/** Auto-publish rules for live reviews. */
export const autoPublish = {
  minRating: 4,
  minLength: 40,
  /** Google display names never shown on the site (spam, not a client, asked to be removed…). */
  hiddenAuthors: ["সংবাদ প্রতিদিন বিডি"],
};

export type Review = {
  /** Name shown on the Google review. */
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  /** The client this review is from, and what we did for them. */
  company: string;
  industry: string;
  /** Checked as genuinely from this client and cleared for the site. */
  approved: boolean;
  /** Optional: the person behind the account, once they're happy to be named. */
  person?: string;
  role?: string;
  /** Link to the review on Google (live reviews only). */
  url?: string;
};

export const reviews: Review[] = [
  {
    author: "Trenzo",
    rating: 5,
    text: "Working with WebBrik was a genuinely pleasant experience. From the beginning, the team showed strong professionalism and a clear understanding of our vision. They were responsive, supportive, and always open to feedback. The final website came out exactly how we wanted, both in design and functionality. Really appreciate the effort and dedication from the team. Happy to recommend them to anyone looking for quality web development work.",
    company: "Trenzo",
    industry: "Premium wallets",
    approved: true,
  },
  {
    author: "Hossain Furniture BD",
    rating: 5,
    text: "We had a very good experience working with Web Briks LLC. Their team is professional, responsive, and skilled in design, website, and digital solutions. They understood our furniture business needs clearly and delivered quality work with proper care and attention to detail. Communication was smooth throughout the project, and the final result was very satisfying. We highly recommend Web Briks LLC to any business looking for reliable and professional service.",
    company: "Hossain Furniture",
    industry: "Furniture",
    approved: true,
  },
  {
    // A short 4-star review from a news page we haven't confirmed as a client. Kept here, not shown.
    author: "সংবাদ প্রতিদিন বিডি",
    rating: 4,
    text: "Website design agency",
    company: "সংবাদ প্রতিদিন বিডি",
    industry: "News",
    approved: false,
  },
];

export const reviewByCompany = (company: string) => reviews.find((r) => r.approved && r.company === company);
