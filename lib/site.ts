// Company details, taken from webbriks.com. Contact, CTA and Footer all read from here.
export const site = {
  name: "Webbriks",
  email: "info@webbriks.com",
  phones: [
    { label: "Bangladesh", display: "+880 1977-201923", href: "tel:+8801977201923" },
    { label: "USA", display: "+1 (323) 982-3790", href: "tel:+13239823790" },
  ],
  responseTime: "We reply within one business day.",
  offices: [
    {
      city: "Dhaka Office",
      address:
        "115 Senpara Parbata (3rd floor, Sheltech Rubynur), Begum Rokeya Avenue, Mirpur 10, Dhaka 1216, Bangladesh",
    },
    { city: "Gaibandha Office", address: "House 106, 17/1 ZigZag Road, Gaibandha 5700, Bangladesh" },
    { city: "USA Office", address: "1209 Mountain Road PL NE, STE A, Albuquerque, NM 87110, USA" },
  ],
  socials: [
    { label: "Facebook", href: "https://facebook.com/webbriks" },
    { label: "Instagram", href: "https://www.instagram.com/webbriks/" },
    { label: "LinkedIn", href: "https://linkedin.com/company/webbriks" },
  ],
  services: [
    "End-to-End Ecommerce",
    "Web Design & Development",
    "Performance Marketing",
    "AI Creatives",
    "Product Photography & Video",
    "Photo Editing & Retouching",
  ],
} as const;
