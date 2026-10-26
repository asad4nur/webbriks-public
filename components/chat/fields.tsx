// Form pieces shared by the live-chat details form and the ticket form, styled like the site's contact form.

export const fieldClass =
  "w-full rounded-xl bg-paper px-3.5 py-2.5 text-sm text-ink ring-1 ring-ink/[0.08] transition-[background-color,box-shadow] outline-none placeholder:text-ink/35 focus:bg-white focus:ring-2 focus:ring-brand-violet/40 disabled:cursor-not-allowed disabled:opacity-60";
export const labelClass = "mb-1.5 block text-xs font-medium text-ink/70";

// Press feedback for buttons: a small scale-down on top of the colour change.
export const press = "transition-[scale,filter,background-color,opacity] duration-150 active:scale-[0.96]";

export const primaryButton = `${press} flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-brand-orchid to-brand-violet px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_28px_-10px_rgba(83,20,214,0.8)] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none`;

/** Phone number plus the "is this your WhatsApp?" question, so the team knows how to reach the visitor. */
export function PhoneField({
  id,
  phone,
  onPhone,
  isWhatsapp,
  onWhatsapp,
}: {
  id: string;
  phone: string;
  onPhone: (value: string) => void;
  isWhatsapp: boolean;
  onWhatsapp: (value: boolean) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        Phone number
      </label>
      <input
        id={id}
        type="tel"
        value={phone}
        onChange={(e) => onPhone(e.target.value)}
        placeholder="+880 1XXX-XXXXXX"
        autoComplete="tel"
        required
        pattern="[0-9+()\-\s]{6,20}"
        title="Enter a valid phone number"
        className={fieldClass}
      />
      <label className="mt-2 flex w-fit cursor-pointer items-center gap-2 text-xs text-ink/65 select-none">
        <input
          type="checkbox"
          checked={isWhatsapp}
          onChange={(e) => onWhatsapp(e.target.checked)}
          className="h-4 w-4 rounded accent-brand-violet"
        />
        This number is on WhatsApp
      </label>
    </div>
  );
}
