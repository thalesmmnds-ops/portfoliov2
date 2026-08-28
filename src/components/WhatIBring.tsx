"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { StickerPeel } from "./ui/StickerPeel";

type Pill = {
  label: string;
  top: string;
  left: string;
  rotate: number;
  // Real sticker photo (from /public/bring). `ratio` is the cropped image's
  // width/height, used to size each sticker proportionally at a shared
  // display height.
  image: { src: string; ratio: number };
};

// Real sticker photos (see /public/bring, cropped from BringImages/) — one
// per topic we have a sticker for. Positions sit on an 8-point ring around
// the centered heading/photo (evenly spaced at 45°, offset so none land
// directly above/below/beside center) rather than two straight flanks, so
// the topics form a circle around the text like the reference layout. Same
// ring at every breakpoint — only the sticker/photo sizes shrink for mobile
// (see STICKER_HEIGHT_CLASS / the boss-thales photo below) so it still fits.
const pills: Pill[] = [
  { label: "UI Design", top: "11%", left: "34.5%", rotate: -4, image: { src: "/bring/ui-design.webp", ratio: 1039 / 630 } },
  { label: "User Research", top: "11%", left: "65.5%", rotate: 3, image: { src: "/bring/user-research.webp", ratio: 1012 / 615 } },
  { label: "Usability Testing", top: "22%", left: "87%", rotate: -2, image: { src: "/bring/usability-testing.webp", ratio: 1068 / 626 } },
  { label: "Wireframing", top: "80%", left: "87%", rotate: 3, image: { src: "/bring/wireframing.webp", ratio: 1068 / 625 } },
  { label: "Design Systems", top: "89%", left: "65.5%", rotate: -3, image: { src: "/bring/design-systems.webp", ratio: 1068 / 625 } },
  { label: "User Flows", top: "89%", left: "34.5%", rotate: 2, image: { src: "/bring/user-flows.webp", ratio: 1079 / 527 } },
  { label: "Prototyping", top: "80%", left: "13%", rotate: -3, image: { src: "/bring/prototyping.webp", ratio: 1079 / 527 } },
  { label: "Visual Design", top: "22%", left: "13%", rotate: -2, image: { src: "/bring/visual-design.webp", ratio: 1079 / 527 } },
];

// Approximate size of the scatter container, used to translate each pill's
// resting position into a "distance from center" offset for the entrance.
const FIELD_W = 700;
const FIELD_H = 640;

function centerOffset(pill: Pill) {
  const leftPct = parseFloat(pill.left);
  const topPct = parseFloat(pill.top);
  return {
    x: ((50 - leftPct) / 100) * FIELD_W,
    y: ((50 - topPct) / 100) * FIELD_H,
  };
}

// Sticker height per breakpoint — width follows automatically via the
// aspect-ratio style below, so this is the only thing that needs to change
// to resize every sticker at once.
const STICKER_HEIGHT_CLASS = "h-10 md:h-[61px]";

function StickerImage({ pill }: { pill: Pill }) {
  return (
    <div
      style={{ aspectRatio: pill.image.ratio }}
      className={`relative select-none ${STICKER_HEIGHT_CLASS}`}
    >
      <Image
        src={pill.image.src}
        alt={pill.label}
        fill
        className="object-contain drop-shadow-md"
        sizes="(min-width: 768px) 125px, 82px"
      />
    </div>
  );
}

export default function WhatIBring() {
  return (
    <section className="bg-white px-6 pt-[100px] pb-[100px]">
      <div className="relative mx-auto min-h-[560px] max-w-4xl md:min-h-[680px]">
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 text-center">
          <Reveal>
            <div className="relative h-[108px] w-[116px] md:h-[164px] md:w-[176px]">
              <Image src="/bring/boss-thales.webp" alt="Thales" fill className="object-contain" sizes="176px" />
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-[12px] text-zinc-400">Poorly made with AI.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-mono text-[26px] font-semibold text-zinc-950 md:text-[32px]">
              What I bring
              <br />
              to the table
            </h2>
          </Reveal>
        </div>

        {pills.map((pill, i) => {
          const offset = centerOffset(pill);
          return (
            <div
              key={pill.label}
              style={{ top: pill.top, left: pill.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.3, x: offset.x, y: offset.y, rotate: 0 }}
                whileInView={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: pill.rotate }}
                viewport={{ once: true, margin: "-80px" }}
                whileHover={{ scale: 1.08, rotate: 0 }}
                transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
              >
                <StickerPeel peelBackHoverPct={18} peelBackActivePct={26} shadowIntensity={0.5} lightingIntensity={0.15}>
                  <StickerImage pill={pill} />
                </StickerPeel>
              </motion.span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
