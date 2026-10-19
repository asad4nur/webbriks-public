// Team members, from webbriks.com/teams (same names, roles, groups and order).
// Photos: public/team/members/<slug>.webp, normalised from the cut-outs in public/team to a 600×800 canvas.
// `linkedin` is only set for personal profiles; the live site links some people to linkedin.com itself.

export type Member = { name: string; role: string; photo?: string; linkedin?: string };
export type TeamGroup = { title: string; blurb: string; members: Member[] };

const photo = (slug: string) => `/team/members/${slug}.webp`;

export const team: TeamGroup[] = [
  {
    title: "Founder & Operations Lead",
    blurb: "Setting the direction and keeping every project moving.",
    members: [
      {
        name: "Md. Ashaduzzaman",
        role: "CEO and Founder",
        photo: photo("ashaduzzaman"),
        linkedin: "https://www.linkedin.com/in/asad4nur/",
      },
      { name: "Md Ariful Islam", role: "Director", photo: photo("ariful-islam") },
      { name: "Md Kobir Hossain", role: "Director", photo: photo("kobir-hossain") },
      { name: "Md Masum Kamal", role: "Director", photo: photo("masum-kamal") },
      { name: "Arif Rahaman", role: "Director", photo: photo("arif-rahaman") },
    ],
  },
  {
    title: "Design and Development",
    blurb: "The designers and engineers who build your website, store or app.",
    members: [
      {
        name: "Fardin Evan",
        role: "UI/UX Designer",
        photo: photo("fardin-evan"),
        linkedin: "https://www.linkedin.com/in/fardin-evan-limon-0a0306227/",
      },
      {
        name: "Md Golam Sarwar",
        role: "Full Stack Developer",
        photo: photo("golam-sarwar"),
        linkedin: "https://www.linkedin.com/in/glm-sarwar/",
      },
      {
        name: "Ashikur Rahman Bhuiyan",
        role: "Full Stack Developer",
        photo: photo("ashikur-rahman"),
        linkedin: "https://www.linkedin.com/in/ashikurrb",
      },
      {
        name: "Fuyad Hasan Fahim",
        role: "Full Stack Developer",
        photo: photo("fuyad-hasan"),
        linkedin: "https://www.linkedin.com/in/fuyadhasanfahim0/",
      },
      {
        name: "Md. Ruhul Amin",
        role: "Full Stack Developer",
        photo: photo("ruhul-amin"),
        linkedin: "https://www.linkedin.com/in/md-ruhul-amin-b44528202/",
      },
      {
        name: "Md. Al Imran",
        role: "UI/UX Designer",
        photo: photo("al-imran"),
        linkedin: "https://www.linkedin.com/in/imranpanna/",
      },
    ],
  },
  {
    title: "Brand & Marketing Hub",
    blurb: "Ads, content and growth: the people who bring you customers.",
    members: [
      {
        name: "Mamun Hasan",
        role: "Lead Marketer",
        photo: photo("mamun-hasan"),
        linkedin: "https://linkedin.com/in/mamunbhasan/",
      },
      {
        name: "Md. Sadaf Islam",
        role: "Marketing Executive",
        photo: photo("sadaf-islam"),
        linkedin: "https://linkedin.com/in/engr-sadaf-islam",
      },
      // The live site uses Sandra.png for Somaiya; public/team/Somaiya.png is a different photo.
      { name: "Somaiya Akter", role: "Marketing Executive", photo: photo("somaiya-akter") },
      {
        name: "Nowshin Jahan Tisha",
        role: "Marketing Executive",
        photo: photo("nowshin-tisha"),
        linkedin: "https://linkedin.com/in/nowshin-jahan-tisha-4b0930399/",
      },
      {
        name: "Farhana Hossan Orpita",
        role: "Marketing Executive",
        photo: photo("farhana-orpita"),
        linkedin: "https://linkedin.com/in/farhana-hassan-orpita-52138639a/",
      },
      // No photo in public/team yet; the card shows initials.
      {
        name: "MAR Zihad",
        role: "Marketing Executive",
        linkedin: "https://www.linkedin.com/in/m-a-r-zihad-466a3340a",
      },
    ],
  },
];

export const teamSize = team.reduce((n, group) => n + group.members.length, 0);
