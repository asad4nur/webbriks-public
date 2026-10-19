import {
  ArrowRight,
  ArrowUpRight,
  Camera,
  Check,
  CreditCard,
  LayoutDashboard,
  type LucideIcon,
  ShoppingBag,
  Store,
  TrendingUp,
  Truck,
} from "lucide-react";
import Link from "next/link";

type Capability = { icon: LucideIcon; title: string; description: string };

const capabilities: Capability[] = [
  {
    icon: Store,
    title: "Store design & build",
    description: "A fast, mobile-first storefront designed to turn visitors into buyers.",
  },
  {
    icon: Camera,
    title: "Product photos & listing",
    description: "Shoots, retouching and listings that make every product look its best.",
  },
  {
    icon: CreditCard,
    title: "Payments & checkout",
    description: "Secure online payments, mobile wallets and cash on delivery.",
  },
  {
    icon: Truck,
    title: "Courier & delivery",
    description: "Courier integration and order tracking your customers can follow.",
  },
  {
    icon: LayoutDashboard,
    title: "Orders & inventory",
    description: "One dashboard for orders, stock, customers and wholesale buyers.",
  },
  {
    icon: TrendingUp,
    title: "Ads & growth",
    description: "Meta and Google ads, with pixel and Conversion API tracking every sale.",
  },
];

// The journey of one order through a store we build. Illustrative only: no real order data.
const journey = [
  { label: "Order placed", detail: "Checkout on mobile", state: "done" },
  { label: "Payment confirmed", detail: "Online payment or COD", state: "done" },
  { label: "Packed", detail: "Stock updated automatically", state: "done" },
  { label: "Out for delivery", detail: "Booked with the courier", state: "current" },
  { label: "Delivered", detail: "Customer notified", state: "next" },
] as const;

// Live online stores from Our Work.
const stores = [
  { name: "Flexzon", industry: "Fashion", url: "https://flexzonbd.com/" },
  { name: "Wild", industry: "Menswear", url: "https://wildbd.com/" },
  { name: "Trenzo", industry: "Wallets", url: "https://trenzobd.com/" },
  { name: "Pannas Collection", industry: "Modest fashion", url: "https://pannascollection.com/" },
  { name: "TrueSense", industry: "Medical equipment", url: "https://truesensebd.com/" },
];

export default function Ecommerce() {
  return (
    <section
      id="ecommerce"
      aria-labelledby="ecommerce-heading"
      className="relative isolate overflow-hidden bg-tint-50 py-16 text-ink sm:py-24 lg:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full bg-tint-orchid blur-[130px]" />
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-violet ring-1 ring-brand-violet/10">
              <ShoppingBag className="h-3.5 w-3.5" aria-hidden />
              End-to-End Ecommerce
            </span>
            <h2
              id="ecommerce-heading"
              className="mt-5 text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
            >
              Everything your online store needs,{" "}
              <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
                under one roof
              </span>
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/60 sm:text-lg">
              From the first product photo to the parcel at your customer&rsquo;s door, we build, run and grow your
              store, so you never juggle five different vendors.
            </p>
          </div>
          <Link
            href="#contact"
            className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-linear-to-r from-brand-orchid to-brand-violet px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_28px_-10px_rgba(83,20,214,0.55)] transition hover:brightness-110 lg:self-auto"
          >
            Start your online store
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>

        {/* Bento: order journey (2×2), six capabilities, then live stores */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:grid-cols-4">
          <article className="relative isolate overflow-hidden rounded-3xl rounded-tr-[4rem] bg-linear-to-br from-brand-orchid via-brand-violet to-brand-indigo p-6 text-white shadow-[0_24px_60px_-24px_rgba(83,20,214,0.7)] sm:col-span-2 sm:p-8 lg:row-span-2">
            <div
              aria-hidden
              className="absolute -right-20 -bottom-20 -z-10 h-72 w-72 rounded-full bg-white/10 blur-3xl"
            />
            <h3 className="text-2xl leading-tight font-semibold tracking-tight sm:text-3xl">
              Every order, handled from click to doorstep
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75 sm:text-base">
              Payments, stock and delivery are connected, so orders move on their own and you always know where each one
              is.
            </p>

            {/* Illustration of an order moving through the store */}
            <div
              role="img"
              aria-label="Illustration: an order moving from placed, to paid, packed, out for delivery and delivered"
              className="mt-7 rounded-2xl bg-white p-5 text-ink shadow-[0_18px_40px_-20px_rgba(7,4,26,0.5)] sm:p-6"
            >
              <div className="flex items-center justify-between gap-4 border-b border-ink/[0.06] pb-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-tint-100 text-brand-violet">
                    <ShoppingBag className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">New order</p>
                    <p className="text-xs text-ink/50">2 items · Paid</p>
                  </div>
                </div>
                <span className="rounded-full bg-tint-100 px-2.5 py-1 text-[11px] font-semibold text-brand-violet">
                  On its way
                </span>
              </div>

              <ol className="mt-4">
                {journey.map(({ label, detail, state }, i) => (
                  <li key={label} className="relative flex gap-3.5 pb-4 last:pb-0">
                    {i < journey.length - 1 && (
                      <span
                        className={`absolute top-6 bottom-0 left-3 w-0.5 -translate-x-1/2 rounded-full ${
                          state === "done" ? "bg-brand-violet/60" : "bg-ink/10"
                        }`}
                      />
                    )}
                    <span className="relative flex h-6 w-6 shrink-0 items-center justify-center">
                      {state === "done" && (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-br from-brand-orchid to-brand-violet text-white">
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        </span>
                      )}
                      {state === "current" && (
                        <>
                          <span className="absolute h-6 w-6 animate-ping rounded-full bg-brand-orchid/40 motion-reduce:animate-none" />
                          <span className="relative h-3.5 w-3.5 rounded-full bg-brand-violet ring-4 ring-tint-100" />
                        </>
                      )}
                      {state === "next" && <span className="h-3 w-3 rounded-full ring-2 ring-ink/15" />}
                    </span>
                    <span className="min-w-0 -mt-0.5">
                      <span
                        className={`block text-sm font-semibold ${state === "next" ? "text-ink/40" : ""} ${
                          state === "current" ? "text-brand-violet" : ""
                        }`}
                      >
                        {label}
                      </span>
                      <span className="block text-xs text-ink/50">{detail}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </article>

          {capabilities.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="group flex flex-col rounded-3xl bg-white p-6 ring-1 ring-ink/[0.06] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(83,20,214,0.45)] hover:ring-brand-violet/20"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl rounded-br-md bg-tint-100 text-brand-violet transition duration-300 group-hover:bg-linear-to-br group-hover:from-brand-orchid group-hover:to-brand-violet group-hover:text-white">
                <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden />
              </span>
              <h3 className="mt-auto pt-6 text-lg font-semibold tracking-tight">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{description}</p>
            </article>
          ))}

          {/* Proof: stores that are live today */}
          <article className="flex flex-col justify-between gap-5 rounded-3xl rounded-br-[4rem] bg-ink p-6 text-white sm:col-span-2 sm:p-7">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs tracking-wider text-brand-orchid uppercase">Live stores we built</p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight sm:text-xl">Selling online today</h3>
              </div>
              <Link
                href="#work"
                className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-white/70 transition hover:text-white"
              >
                See our work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </div>
            <ul className="flex flex-wrap gap-2">
              {stores.map(({ name, industry, url }) => (
                <li key={name}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full bg-white/[0.07] py-2 pr-3 pl-4 text-sm ring-1 ring-white/10 transition hover:bg-white/15"
                  >
                    <span className="font-medium">{name}</span>
                    <span className="text-xs text-white/45">{industry}</span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 text-white/50 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                      aria-hidden
                    />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
