import { ArrowRight, Check, CreditCard, Heart, PackageCheck, Search, ShoppingBag, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SiMastercard, SiVisa } from "react-icons/si";

const proof = [
  "Live stores in fashion, furniture & more",
  "Payments & courier connected",
  "Fixed quote, no hidden costs",
];

const checkout = ["Cards", "Mobile wallets", "Cash on delivery"];

// Illustrative storefront. Product photos are Unsplash placeholders (same as the Creatives section).
const u = (id: string) => `https://images.unsplash.com/photo-${id}?w=400&q=80`;
const products = [
  { name: "Leather backpack", price: "৳4,200", image: u("1622560480605-d83c853bc5c3") },
  { name: "Classic sunglasses", price: "৳1,850", image: u("1572635196237-14b3f281503f") },
  { name: "Wireless headphones", price: "৳3,600", image: u("1505740420928-5e560c06d30e") },
  { name: "Smart watch", price: "৳5,900", image: u("1523275335684-37898b6baf30") },
];

export default function EcommerceHero() {
  return (
    <section
      id="ecommerce-hero"
      aria-labelledby="ecommerce-hero-heading"
      className="relative isolate flex min-h-svh items-center overflow-hidden bg-paper text-ink"
    >
      <Backdrop />

      <div className="mx-auto grid w-full max-w-[1440px] items-center gap-14 px-4 pt-28 pb-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12 lg:px-10 lg:pt-32 lg:pb-20">
        {/* Left: copy */}
        <div className="min-w-0">
          <nav aria-label="Breadcrumb" className="animate-fade-up">
            <ol className="flex flex-wrap items-center gap-2 text-xs font-medium text-ink/45">
              <li>
                <Link href="/" className="transition-colors hover:text-brand-violet">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/#services" className="transition-colors hover:text-brand-violet">
                  Services
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="rounded-full bg-tint-100 px-3 py-1 text-brand-violet">
                End-to-End Ecommerce
              </li>
            </ol>
          </nav>

          <h1
            id="ecommerce-hero-heading"
            className="mt-6 max-w-2xl animate-fade-up text-[clamp(2.25rem,6.5vw,4.25rem)] leading-[1.05] font-semibold tracking-tight [animation-delay:100ms]"
          >
            Your complete online store,{" "}
            <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">
              handled for you
            </span>
          </h1>

          <p className="mt-5 max-w-xl animate-fade-up text-base leading-relaxed text-ink/60 [animation-delay:200ms] lg:text-[1.0625rem]">
            Juggling a developer, a photographer, a payment gateway and a courier is exhausting. We set up your store,
            products, payments and delivery, then run the ads that bring buyers, all with one team.
          </p>

          <div className="mt-8 flex animate-fade-up flex-wrap gap-3 [animation-delay:300ms]">
            <Link
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-brand-orchid to-brand-violet px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_28px_-10px_rgba(83,20,214,0.55)] transition hover:brightness-110 sm:px-7"
            >
              Start your store
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
            <Link
              href="#work"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/10 bg-white px-6 py-3.5 text-sm font-semibold text-ink shadow-sm transition hover:border-brand-violet/30 hover:text-brand-violet sm:px-7"
            >
              See stores we&rsquo;ve built
            </Link>
          </div>

          <ul className="mt-8 flex animate-fade-up flex-col gap-2.5 [animation-delay:400ms] sm:flex-row sm:flex-wrap sm:gap-x-6">
            {proof.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-ink/65">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-tint-100 text-brand-violet">
                  <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex animate-fade-up flex-wrap items-center gap-x-4 gap-y-3 border-t border-ink/[0.08] pt-6 [animation-delay:500ms]">
            <span className="text-xs font-medium tracking-wide text-ink/45 uppercase">Checkout with</span>
            <ul className="flex flex-wrap gap-2">
              {checkout.map((method) => (
                <li
                  key={method}
                  className="rounded-full bg-white px-3 py-1 text-xs font-medium text-ink/65 ring-1 ring-ink/[0.07]"
                >
                  {method}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: the store and what happens behind it */}
        <StoreScene />
      </div>
    </section>
  );
}

function StoreScene() {
  const float =
    "absolute z-20 flex items-center gap-3 rounded-2xl bg-white/95 p-2.5 pr-4 shadow-[0_18px_40px_-18px_rgba(43,5,146,0.45)] ring-1 ring-ink/[0.06] backdrop-blur";
  return (
    <div
      role="img"
      aria-label="Illustration: an online store on a phone, with a new paid order, card and cash-on-delivery payments, a courier delivery and automatic stock updates"
      className="relative mx-auto h-[34rem] w-full max-w-xl animate-fade-up [animation-delay:250ms] sm:h-[38rem]"
    >
      {/* Arch behind the phone */}
      <div className="absolute inset-x-[12%] top-[8%] bottom-0 rounded-t-full bg-linear-to-b from-brand-violet via-brand-orchid/70 to-tint-200/0" />
      <div className="absolute inset-x-[20%] top-[16%] bottom-0 rounded-t-full border border-white/30" />

      {/* Phone with storefront */}
      <div className="absolute top-[4%] left-1/2 z-10 w-[15.5rem] -translate-x-1/2 rounded-[2.4rem] bg-ink p-2 shadow-[0_40px_80px_-30px_rgba(7,4,26,0.7)] sm:w-[17rem]">
        <div className="overflow-hidden rounded-[2rem] bg-white">
          <div className="mx-auto mt-2 h-1.5 w-16 rounded-full bg-ink/90" />
          <div className="px-3.5 pt-3 pb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold tracking-tight">
                your<span className="text-brand-violet">store</span>
              </span>
              <span className="flex items-center gap-2 text-ink/60">
                <Search className="h-3.5 w-3.5" />
                <span className="relative">
                  <ShoppingBag className="h-3.5 w-3.5" />
                  <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-brand-orchid text-[7px] font-bold text-white">
                    2
                  </span>
                </span>
              </span>
            </div>

            <div className="relative mt-3 overflow-hidden rounded-xl bg-linear-to-br from-brand-violet to-brand-orchid p-3 text-white">
              <span className="absolute -right-5 -bottom-6 h-20 w-20 rounded-full bg-white/15" />
              <p className="text-[9px] font-semibold tracking-wider uppercase opacity-80">New season</p>
              <p className="mt-0.5 text-sm leading-tight font-semibold">Up to 30% off</p>
              <span className="mt-2 inline-block rounded-full bg-white px-2.5 py-0.5 text-[9px] font-semibold text-brand-violet">
                Shop now
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              {products.map(({ name, price, image }) => (
                <div key={name}>
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-tint-50">
                    <Image src={image} alt="" fill sizes="120px" className="object-cover" />
                    <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white/90 text-ink/50">
                      <Heart className="h-2.5 w-2.5" />
                    </span>
                  </div>
                  <p className="mt-1 truncate text-[9px] font-medium text-ink/70">{name}</p>
                  <p className="text-[10px] font-bold">{price}</p>
                </div>
              ))}
            </div>

            <span className="mt-3 flex items-center justify-center gap-1.5 rounded-full bg-ink py-2 text-[10px] font-semibold text-white">
              <ShoppingBag className="h-3 w-3" />
              Checkout · 2 items
            </span>
          </div>
        </div>
      </div>

      {/* Events around the store */}
      <div className={`${float} top-[17%] left-0 animate-float [animation-delay:0s] motion-reduce:animate-none`}>
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-brand-orchid to-brand-violet text-white">
          <ShoppingBag className="h-4 w-4" />
        </span>
        <span className="leading-tight">
          <span className="block text-sm font-semibold">New order</span>
          <span className="block text-xs text-ink/50">2 items · Paid online</span>
        </span>
      </div>

      <div className={`${float} top-[30%] right-0 animate-float-slow motion-reduce:animate-none`}>
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-tint-100 text-brand-violet">
          <CreditCard className="h-4 w-4" />
        </span>
        <span className="leading-tight">
          <span className="block text-sm font-semibold">Payment confirmed</span>
          <span className="mt-1 flex items-center gap-1.5 text-ink/50">
            <SiVisa className="h-3.5 w-5 text-[#1a1f71]" />
            <SiMastercard className="h-3.5 w-3.5 text-[#eb001b]" />
            <span className="text-[10px] font-semibold">COD</span>
          </span>
        </span>
      </div>

      <div className={`${float} bottom-[22%] left-0 hidden animate-float-slow sm:flex motion-reduce:animate-none`}>
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-tint-100 text-brand-violet">
          <Truck className="h-4 w-4" />
        </span>
        <span className="w-32 leading-tight">
          <span className="block text-sm font-semibold">Out for delivery</span>
          <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-tint-100">
            <span className="block h-full w-3/4 rounded-full bg-linear-to-r from-brand-orchid to-brand-violet" />
          </span>
        </span>
      </div>

      <div className={`${float} right-[4%] bottom-[8%] animate-float motion-reduce:animate-none`}>
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink text-white">
          <PackageCheck className="h-4 w-4" />
        </span>
        <span className="leading-tight">
          <span className="block text-sm font-semibold">Stock updated</span>
          <span className="block text-xs text-ink/50">Automatically, every sale</span>
        </span>
      </div>
    </div>
  );
}

function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(83,20,214,0.13)_1px,transparent_1px)] mask-[radial-gradient(ellipse_at_70%_45%,#000_15%,transparent_70%)] bg-size-[22px_22px]" />
      <div className="absolute top-1/4 -right-40 h-[560px] w-[560px] rounded-full bg-tint-200/70 blur-[140px]" />
      <div className="absolute -bottom-40 -left-32 h-[420px] w-[420px] rounded-full bg-tint-orchid blur-[130px]" />
    </div>
  );
}
