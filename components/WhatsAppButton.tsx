import { FaWhatsapp } from "react-icons/fa6";

import { site } from "@/lib/site";

const href = `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(site.whatsapp.message)}`;

// Floating WhatsApp button, always visible in the bottom-right corner. BackToTop sits just above it.
export default function WhatsAppButton() {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed right-4 bottom-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-10px_rgba(18,140,126,0.7)] ring-4 ring-white/70 transition-all duration-300 hover:-translate-y-1 hover:brightness-105 focus-visible:ring-[#25D366]/40 sm:right-6 sm:bottom-6 sm:h-14 sm:w-14"
    >
      <span
        aria-hidden
        className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40 [animation-duration:2.5s] motion-reduce:hidden"
      />
      <FaWhatsapp className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden />

      {/* Label slides out on hover, desktop only */}
      <span className="pointer-events-none absolute right-full mr-3 hidden translate-x-2 rounded-full bg-white px-4 py-2 text-sm font-medium whitespace-nowrap text-ink opacity-0 shadow-[0_10px_30px_-12px_rgba(7,4,26,0.35)] ring-1 ring-ink/[0.07] transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 lg:block">
        Chat with us on WhatsApp
      </span>
    </a>
  );
}
