"use client";

import { site } from "@/lib/site";
import { ArrowUpRight, Check, Copy, Navigation, Phone } from "lucide-react";
import { useState } from "react";

type Office = {
  name: string;
  address: string;
  /** What Google Maps searches for (coordinates when we know the exact pin). */
  query: string;
  /** Link to the place on Google Maps. */
  mapsUrl: string;
  phone: (typeof site.phones)[number];
};

// Dhaka is pinned to the "Web Briks LLC" listing (maps.app.goo.gl/TJbsasNjJwGkWdTQA → 23.8040576, 90.3694224).
// The other offices are located by address; add their exact pins here when available.
const DHAKA_PIN = "23.8040576,90.3694224";

const offices: Office[] = site.offices.map((office) => {
  const isDhaka = office.city.startsWith("Dhaka");
  return {
    name: office.city,
    address: office.address,
    query: isDhaka ? DHAKA_PIN : office.address,
    mapsUrl: isDhaka
      ? "https://maps.app.goo.gl/TJbsasNjJwGkWdTQA"
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`,
    phone: office.city.startsWith("USA") ? site.phones[1] : site.phones[0],
  };
});

// Google's keyless embed (the URL that maps?q=…&output=embed redirects to), zoom 16.
const embedSrc = (query: string) =>
  `https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s${encodeURIComponent(query)}!6i16`;
const directionsUrl = (query: string) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;

export default function OfficeMap() {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const office = offices[active];

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(office.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; the address is visible to copy by hand.
    }
  }

  return (
    <div className="mt-10 lg:mt-14">
      {/* Office tabs */}
      <div role="tablist" aria-label="Our offices" className="flex flex-wrap gap-2">
        {offices.map(({ name }, i) => (
          <button
            key={name}
            role="tab"
            type="button"
            aria-selected={i === active}
            aria-controls="office-panel"
            onClick={() => {
              setActive(i);
              setCopied(false);
            }}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
              i === active
                ? "bg-ink text-white shadow-md"
                : "bg-white text-ink/65 ring-1 ring-ink/[0.07] hover:text-brand-violet hover:ring-brand-violet/30"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <div
        id="office-panel"
        role="tabpanel"
        className="relative mt-5 overflow-hidden rounded-[2rem] rounded-tr-[4rem] bg-tint-100 shadow-[0_40px_80px_-40px_rgba(43,5,146,0.5)] ring-1 ring-ink/[0.06]"
      >
        <iframe
          key={office.query}
          title={`Map of ${office.name}`}
          src={embedSrc(office.query)}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[22rem] w-full border-0 sm:h-[28rem] lg:h-[34rem]"
        />

        {/* Address card: floats over the map on desktop, sits under it on phones */}
        <div className="relative bg-white p-5 sm:p-6 lg:absolute lg:top-6 lg:left-6 lg:w-96 lg:rounded-3xl lg:shadow-[0_24px_50px_-24px_rgba(43,5,146,0.5)] lg:ring-1 lg:ring-ink/[0.06]">
          <p className="font-mono text-[11px] font-medium tracking-wider text-brand-violet uppercase">Visit us</p>
          <h3 className="mt-1.5 text-xl font-semibold tracking-tight">{office.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink/65">{office.address}</p>

          <a
            href={office.phone.href}
            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold hover:text-brand-violet"
          >
            <Phone className="h-4 w-4 text-brand-violet" aria-hidden />
            {office.phone.display}
          </a>

          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href={directionsUrl(office.query)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-brand-orchid to-brand-violet px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(83,20,214,0.6)] transition hover:brightness-110"
            >
              <Navigation className="h-4 w-4" aria-hidden />
              Get directions
              <span className="sr-only">(opens Google Maps in a new tab)</span>
            </a>
            <a
              href={office.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-paper px-4 py-2.5 text-sm font-semibold ring-1 ring-ink/[0.07] transition hover:text-brand-violet"
            >
              Open in Maps
              <ArrowUpRight className="h-4 w-4" aria-hidden />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <button
              type="button"
              onClick={copyAddress}
              className="inline-flex items-center gap-1.5 rounded-full bg-paper px-4 py-2.5 text-sm font-semibold ring-1 ring-ink/[0.07] transition hover:text-brand-violet"
            >
              {copied ? (
                <Check className="h-4 w-4 text-brand-violet" aria-hidden />
              ) : (
                <Copy className="h-4 w-4" aria-hidden />
              )}
              <span aria-live="polite">{copied ? "Copied" : "Copy address"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
