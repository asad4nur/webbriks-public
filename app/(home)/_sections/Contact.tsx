import { site } from "@/lib/site";
import { Check, Mail, Phone } from "lucide-react";
import ContactForm from "./ContactForm";

// Promises taken from the contact area on webbriks.com.
const promises = ["Reply within one business day", "Written scope & estimate", "No commitment to talk", "NDA on request"];

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative isolate overflow-hidden bg-white py-16 text-ink sm:py-24 lg:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/3 -right-40 h-[480px] w-[480px] rounded-full bg-tint-100/80 blur-[140px]" />
      </div>

      <div className="mx-auto grid max-w-[1440px] items-start gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20 lg:px-10">
        {/* Left: intro + direct contact */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-tint-100 px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-violet">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orchid" />
            Contact
          </span>
          <h2
            id="contact-heading"
            className="mt-5 text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
          >
            Let&rsquo;s start the{" "}
            <span className="bg-linear-to-r from-brand-violet to-brand-orchid bg-clip-text text-transparent">conversation</span>
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink/60 sm:text-lg">
            Tell us about your project. We&rsquo;ll come back with questions, a rough scope and an honest estimate.
          </p>

          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {promises.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-ink/70">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-tint-100 text-brand-violet">
                  <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10 space-y-3">
            <ContactRow icon={Mail} label="Email us" value={site.email} href={`mailto:${site.email}`} />
            {site.phones.map((phone) => (
              <ContactRow key={phone.href} icon={Phone} label={`Call ${phone.label}`} value={phone.display} href={phone.href} />
            ))}
          </div>
        </div>

        {/* Right: form */}
        <div className="rounded-[2rem] rounded-tr-[4rem] bg-white p-6 shadow-[0_1px_3px_rgba(7,4,26,0.05),0_30px_70px_-34px_rgba(43,5,146,0.4)] ring-1 ring-brand-violet/10 sm:p-10">
          <h3 className="text-xl font-semibold tracking-tight">Tell us what you&rsquo;re building</h3>
          <p className="mt-1 mb-7 text-sm text-ink/55">Fields marked * are required.</p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group flex max-w-md items-center gap-4 rounded-2xl bg-paper p-4 ring-1 ring-ink/[0.05] transition hover:bg-tint-50 hover:ring-brand-violet/20"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl rounded-br-md bg-linear-to-br from-brand-orchid to-brand-violet text-white">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <span>
        <span className="block text-xs font-medium tracking-wide text-ink/45 uppercase">{label}</span>
        <span className="block font-semibold transition-colors group-hover:text-brand-violet">{value}</span>
      </span>
    </a>
  );
}
