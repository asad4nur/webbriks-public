// TEMPORARY stock photos (free Unsplash licence) so the page looks finished.
// Replace with real Webbriks office and team photos: save them in /public/about/ and use "/about/<file>.jpg".
const u = (id: string) => `https://images.unsplash.com/photo-${id}?w=1200&q=80`;

export const heroPhotos = {
  main: { src: u("1522202176988-66273c2fd55f"), alt: "Team members laughing together around a table" },
  planning: { src: u("1552664730-d307ca884978"), alt: "Team planning a project with sticky notes on the wall" },
  celebrate: { src: u("1600880292203-757bb62b4baf"), alt: "Two colleagues celebrating with a high five" },
};

export const culturePhotos = [
  { src: u("1521737604893-d14cc237f11d"), alt: "Team working together at long office desks", label: "Everyday work" },
  { src: u("1528605248644-14dd04022da1"), alt: "Team sharing a meal together", label: "Team dinners" },
  { src: u("1556761175-5973dc0f32e7"), alt: "Team member presenting ideas to colleagues", label: "Knowledge sharing" },
  { src: u("1543269865-cbf427effbad"), alt: "Colleagues smiling while looking at a phone", label: "Good vibes" },
  { src: u("1527689368864-3a821dbccc34"), alt: "Designer working on a website on a laptop", label: "Deep work" },
  { src: u("1542744173-8e7e53415bb0"), alt: "Team meeting around a table with laptops", label: "Planning sessions" },
  { src: u("1556761175-b413da4baf72"), alt: "Open office with people collaborating", label: "Open office" },
  { src: u("1515187029135-18ee286d815b"), alt: "Group workshop in a creative space", label: "Workshops" },
];
