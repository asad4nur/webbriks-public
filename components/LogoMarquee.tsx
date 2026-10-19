import type { Client } from "@/app/(home)/_sections/ClientLogos";
import Image from "next/image";

type Props = {
  items: Client[];
  /** Size + look of each logo card (theme-specific). */
  cardClassName: string;
  /** Inset of the logo inside its card. */
  logoClassName: string;
  /** Move left-to-right instead of right-to-left. */
  reverse?: boolean;
  className?: string;
};

// Endless logo strip: the list is rendered twice and slid by -50%, so the loop is seamless.
export default function LogoMarquee({ items, cardClassName, logoClassName, reverse = false, className = "" }: Props) {
  return (
    <div
      className={`group/marquee relative overflow-hidden mask-[linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] md:mask-[linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)] ${className}`}
    >
      <div
        className={`flex w-max animate-marquee [animation-duration:24s] group-hover/marquee:[animation-play-state:paused] md:[animation-duration:40s] ${
          reverse ? "[animation-direction:reverse]" : ""
        }`}
      >
        <LogoRow items={items} cardClassName={cardClassName} logoClassName={logoClassName} />
        <LogoRow items={items} cardClassName={cardClassName} logoClassName={logoClassName} hidden />
      </div>
    </div>
  );
}

function LogoRow({ items, cardClassName, logoClassName, hidden = false }: Omit<Props, "reverse" | "className"> & { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-3 pr-3 md:gap-5 md:pr-5">
      {items.map((client) => (
        <li key={client.name} title={client.name} className={`relative shrink-0 ${cardClassName}`}>
          <div className={`absolute ${logoClassName}`}>
            <Image
              src={client.logo}
              alt={hidden ? "" : client.name}
              fill
              sizes="(min-width: 768px) 208px, 144px"
              className={`object-contain ${client.invert ? "invert hue-rotate-180" : ""}`}
              style={client.scale ? { transform: `scale(${client.scale})` } : undefined}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
