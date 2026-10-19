import LogoMarquee from "@/components/LogoMarquee";

export type Client = {
  name: string;
  /** Path under /public/client-logos. */
  logo: string;
  /** Light artwork (white or pale) — flipped dark so it reads on the light plate, keeping its hues. */
  invert?: boolean;
  /** Zooms logos whose file has empty padding around the artwork. */
  scale?: number;
};

const clients: Client[] = [
  { name: "AyurLife", logo: "/client-logos/ayurlif.png" },
  { name: "Flexzon", logo: "/client-logos/flexzonlogo.png" },
  { name: "Hossain Furniture", logo: "/client-logos/hossain-furniture.png" },
  { name: "Kinobd", logo: "/client-logos/kinobdlogo.svg" },
  { name: "Pannas", logo: "/client-logos/pannas.png", invert: true, scale: 2.2 },
  { name: "REDCon Ltd.", logo: "/client-logos/red-con.png", invert: true },
  { name: "Trenzo", logo: "/client-logos/trenzo.svg", invert: true },
  { name: "ViscosiTee", logo: "/client-logos/viscositee.svg" },
  { name: "Wild", logo: "/client-logos/Wild_Logo.svg" },
];

// White cards with a soft violet shadow; phones get smaller cards in two rows moving in opposite directions.
const card =
  "h-16 w-36 rounded-2xl bg-white shadow-[0_1px_2px_rgba(7,4,26,0.04),0_8px_24px_-14px_rgba(43,5,146,0.18)] ring-1 ring-ink/[0.06] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_-18px_rgba(43,5,146,0.3)] hover:ring-brand-violet/20 md:h-[88px] md:w-52";
const logo = "inset-x-5 inset-y-3.5 md:inset-x-7 md:inset-y-5";

export default function ClientLogos() {
  return (
    <section aria-labelledby="clients-heading" className="relative bg-paper py-14 text-ink sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="clients-heading"
            className="text-[1.75rem] leading-tight font-semibold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Brands we&rsquo;ve{" "}
            <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text whitespace-nowrap text-transparent">
              worked with
            </span>
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink/60 sm:mt-4 sm:text-lg">
            From fashion labels to furniture makers, growing businesses across Bangladesh trust us to build their
            websites and bring them customers.
          </p>
        </div>

        <div className="mt-8 space-y-1 py-3 sm:mt-12 md:hidden">
          <LogoMarquee className="py-1" items={clients.slice(0, 5)} cardClassName={card} logoClassName={logo} reverse />
          <LogoMarquee className="py-1" items={clients.slice(5)} cardClassName={card} logoClassName={logo} />
        </div>
        <LogoMarquee
          className="mt-12 hidden py-4 md:block"
          items={clients}
          cardClassName={card}
          logoClassName={logo}
          reverse
        />
      </div>
    </section>
  );
}
