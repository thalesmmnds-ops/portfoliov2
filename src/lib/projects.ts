export type Project = {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  live: boolean;
  previewImages: string[];
};

export const projects: Project[] = [
  {
    slug: "from-confusion-to-clarity",
    title: "From Confusion to Clarity",
    tagline: "Turning a tangled fund-selection flow into something Onze users could trust",
    year: "2026",
    live: true,
    previewImages: [
      "/work/from-confusion-to-clarity/hero-hand.png",
      "/work/from-confusion-to-clarity/before-after.jpg",
      "/work/from-confusion-to-clarity/hero-card.jpg",
    ],
  },
  {
    slug: "the-new-face-of-onze",
    title: "The New Face of Onze",
    tagline: "A visual identity refresh with a system to back it up",
    year: "2026",
    live: false,
    previewImages: [],
  },
  {
    slug: "managing-fleets-with-ease",
    title: "Managing Fleets with Ease",
    tagline: "Simplifying a complex fleet operations dashboard",
    year: "2026",
    live: false,
    previewImages: [],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
