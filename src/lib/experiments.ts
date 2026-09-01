export type Experiment = {
  slug: string;
  title: string;
  tagline: string;
  image: string;
  // Same idea as Project.live in projects.ts: false renders a "Soon" badge
  // instead of a link. Flip to true once src/app/playground/<slug>/page.tsx
  // actually exists.
  live: boolean;
};

// Each experiment gets its own route at src/app/playground/<slug>/page.tsx —
// same convention as the case studies under src/app/work/. Unlike a case
// study, that page doesn't have to include <Header>/<Footer> at all: it can
// be a fully custom, full-screen little site/toy if that's more fun, since
// nothing here forces the portfolio chrome onto it. A small link back to "/"
// somewhere on the page is enough to keep it feeling connected.
export const experiments: Experiment[] = [];

export function getExperiment(slug: string) {
  return experiments.find((e) => e.slug === slug);
}
