"use client";

import { useState } from "react";
import FallingDecor, { type FallingDecorItem } from "./FallingDecor";
import Reveal from "./Reveal";

// Same falling/parallax effect as the Hero (see FallingDecor.tsx), just
// without photos yet. Populate this the same way Hero.tsx's heroItems is
// built — each entry needs a unique key, its natural width/height, a depth
// (parallax strength — roughly 1 to 2.5 reads well), and the image node
// itself, e.g.:
//
// {
//   key: "some-photo",
//   width: 320,
//   height: 400,
//   depth: 1.5,
//   node: (
//     <div className="relative h-full w-full drop-shadow-md">
//       <Image src="/about/some-photo.png" alt="" fill className="object-contain" sizes="320px" />
//     </div>
//   ),
// },
const aboutItems: FallingDecorItem[] = [];

export default function AboutIntro() {
  const [textEl, setTextEl] = useState<HTMLDivElement | null>(null);

  return (
    <section className="relative mx-auto flex max-w-[525px] flex-col items-center gap-8 px-6 pb-[144px] pt-[120px]">
      <FallingDecor items={aboutItems} avoidEl={textEl} />

      <div ref={setTextEl} className="relative z-10 space-y-6 text-base leading-relaxed text-zinc-600">
        <Reveal delay={0.05}>
          <p>
            I am a Product Designer based in Calgary with{" "}
            <strong className="font-semibold text-neutral-800">5+ years of experience</strong>{" "}
            crafting user-centric digital products.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p>
            I originally started as an Industrial Designer in Brazil and I bring a unique{" "}
            <strong className="font-semibold text-neutral-800">&ldquo;builder&rsquo;s mindset&rdquo;</strong>{" "}
            to UX, focusing on functionality, feasibility. I have a proven track record of
            working end-to-end with Product Managers and Engineers to translate complex
            requirements into intuitive, high-fidelity interfaces.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="font-medium text-zinc-800">
            Currently looking for opportunities to apply my cross-functional expertise in the
            Canadian tech landscape.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
