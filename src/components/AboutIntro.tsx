"use client";

import { useState } from "react";
import Image from "next/image";
import FallingDecor, { type FallingDecorItem } from "./FallingDecor";
import Reveal from "./Reveal";

// Same falling/parallax effect as the Hero (see FallingDecor.tsx), now with
// real photos (see /public/about, from AboutImages/). Unlike Hero's cutout
// PNGs, these are plain rectangular photos, so each gets a small white
// "photo card" border/shadow instead of a drop-shadow on bare artwork.
const aboutItems: FallingDecorItem[] = [
  {
    key: "stampede",
    width: 170,
    height: 227,
    depth: 1.3,
    node: (
      <div className="relative h-full w-full overflow-hidden rounded-lg border-4 border-white bg-white shadow-lg">
        <Image src="/about/stampede.webp" alt="" fill className="object-cover" sizes="170px" />
      </div>
    ),
  },
  {
    key: "banff-lake",
    width: 140,
    height: 187,
    depth: 1.9,
    node: (
      <div className="relative h-full w-full overflow-hidden rounded-lg border-4 border-white bg-white shadow-lg">
        <Image src="/about/banff-lake.webp" alt="" fill className="object-cover" sizes="140px" />
      </div>
    ),
  },
  {
    key: "dino-museum",
    width: 150,
    height: 200,
    depth: 1.5,
    node: (
      <div className="relative h-full w-full overflow-hidden rounded-lg border-4 border-white bg-white shadow-lg">
        <Image src="/about/dino-museum.webp" alt="" fill className="object-cover" sizes="150px" />
      </div>
    ),
  },
  {
    key: "autumn-hike",
    width: 130,
    height: 173,
    depth: 2.2,
    node: (
      <div className="relative h-full w-full overflow-hidden rounded-lg border-4 border-white bg-white shadow-lg">
        <Image src="/about/autumn-hike.webp" alt="" fill className="object-cover" sizes="130px" />
      </div>
    ),
  },
  {
    key: "sunset-park",
    width: 155,
    height: 207,
    depth: 1.6,
    node: (
      <div className="relative h-full w-full overflow-hidden rounded-lg border-4 border-white bg-white shadow-lg">
        <Image src="/about/sunset-park.webp" alt="" fill className="object-cover" sizes="155px" />
      </div>
    ),
  },
  {
    key: "northern-lights",
    width: 145,
    height: 193,
    depth: 2,
    node: (
      <div className="relative h-full w-full overflow-hidden rounded-lg border-4 border-white bg-white shadow-lg">
        <Image src="/about/northern-lights.webp" alt="" fill className="object-cover" sizes="145px" />
      </div>
    ),
  },
];

export default function AboutIntro() {
  const [textEl, setTextEl] = useState<HTMLDivElement | null>(null);

  return (
    <section className="relative mx-auto flex max-w-[473px] flex-col items-center gap-8 px-6 pb-[144px] pt-[120px]">
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
