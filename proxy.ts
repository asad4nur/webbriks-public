import { type NextRequest, NextResponse } from "next/server";

import { CURRENCY_COOKIE } from "@/lib/pricing";

// Picks the pricing currency from the visitor's country (Vercel's geo header) and stores it in a cookie
// the pricing components read: Bangladesh sees BDT, everyone else USD.
// Locally there is no geo header, so it falls back to BDT; add ?currency=usd to preview USD (development only).
export function proxy(request: NextRequest) {
  const country = request.headers.get("x-vercel-ip-country");
  let currency = country ? (country === "BD" ? "BDT" : "USD") : process.env.NODE_ENV === "production" ? "USD" : "BDT";

  if (process.env.NODE_ENV !== "production") {
    const preview = request.nextUrl.searchParams.get("currency")?.toUpperCase();
    if (preview === "USD" || preview === "BDT") currency = preview;
  }

  const response = NextResponse.next();
  if (request.cookies.get(CURRENCY_COOKIE)?.value !== currency) {
    response.cookies.set(CURRENCY_COOKIE, currency, { path: "/", sameSite: "lax", maxAge: 60 * 60 * 24 });
  }
  return response;
}

export const config = {
  // Pages only: skip API routes, Next internals and files with an extension (images, fonts…).
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
