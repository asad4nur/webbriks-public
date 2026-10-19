import { site } from "@/lib/site";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";

// Offices from lib/site. Bangladesh offices share the BD number; the USA office uses the US number.
export default function AboutOffices() {
  const bd = site.phones[0];
  const us = site.phones[1];

  return (
    <section
      id="offices"
      aria-labelledby="offices-heading"
      className="relative isolate bg-white py-16 text-ink sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-tint-100 px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-violet">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orchid" />
            Our Offices
          </span>
          <h2
            id="offices-heading"
            className="mt-5 text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
          >
            Come and{" "}
            <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
              say hello
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/60 sm:text-lg">
            Two offices in Bangladesh and one in the USA, serving clients at home and around the world.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 md:grid-cols-3 lg:mt-16">
          {site.offices.map(({ city, address }, i) => {
            const phone = city.startsWith("USA") ? us : bd;
            const featured = i === 0;
            return (
              <li
                key={city}
                className={`flex flex-col rounded-3xl p-6 transition duration-500 hover:-translate-y-1 sm:p-7 ${
                  featured
                    ? "rounded-tr-[4rem] bg-linear-to-br from-brand-violet to-brand-orchid text-white shadow-[0_24px_50px_-24px_rgba(83,20,214,0.6)]"
                    : "bg-tint-50 ring-1 ring-brand-violet/10"
                }`}
              >
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-xl rounded-br-md ${
                    featured ? "bg-white/15 ring-1 ring-white/25" : "bg-white text-brand-violet shadow-sm"
                  }`}
                >
                  <MapPin className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-5 text-xl font-semibold tracking-tight">{city}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${featured ? "text-white/80" : "text-ink/60"}`}>
                  {address}
                </p>
                <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6 text-sm font-semibold">
                  <a href={phone.href} className="inline-flex items-center gap-1.5 hover:underline">
                    <Phone className="h-4 w-4" aria-hidden />
                    {phone.display}
                  </a>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:underline"
                  >
                    Get directions
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                    <span className="sr-only">(opens Google Maps in a new tab)</span>
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
