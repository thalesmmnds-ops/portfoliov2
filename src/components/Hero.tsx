"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import FallingDecor, { type FallingDecorItem } from "./FallingDecor";

const heroItems: FallingDecorItem[] = [
  {
    key: "calgary-tower",
    width: 327,
    height: 447,
    depth: 1.5,
    node: (
      <div className="relative h-full w-full drop-shadow-md">
        <Image src="/hero/calgary-tower.jpg" alt="" fill className="object-contain" sizes="327px" />
      </div>
    ),
  },
  {
    key: "figma-logo",
    width: 93,
    height: 141,
    depth: 1,
    node: (
      <div className="relative h-full w-full drop-shadow-md">
        <Image src="/hero/figma-logo.webp" alt="" fill className="object-contain" sizes="93px" />
      </div>
    ),
  },
  {
    key: "macbook",
    width: 362,
    height: 304,
    depth: 2,
    node: (
      <div className="relative h-full w-full drop-shadow-md">
        <Image src="/hero/macbook.png" alt="" fill className="object-contain" sizes="362px" />
      </div>
    ),
  },
  {
    key: "coffee",
    width: 338,
    height: 338,
    depth: 2.5,
    node: (
      <div className="relative h-full w-full drop-shadow-md">
        <Image src="/hero/coffee.png" alt="" fill className="object-contain" sizes="338px" />
      </div>
    ),
  },
  {
    key: "open-to-work",
    width: 259,
    height: 259,
    depth: 1.8,
    node: (
      <div className="relative h-full w-full drop-shadow-md">
        <Image src="/hero/open-to-work.png" alt="" fill className="object-contain" sizes="259px" />
      </div>
    ),
  },
  {
    key: "controller",
    width: 316,
    height: 178,
    depth: 2.2,
    node: (
      <div className="relative h-full w-full drop-shadow-md">
        <Image src="/hero/controller.png" alt="" fill className="object-contain" sizes="316px" />
      </div>
    ),
  },
  {
    key: "dinosaur",
    width: 498,
    height: 331,
    depth: 1.3,
    node: (
      <div className="relative h-full w-full drop-shadow-md">
        <Image src="/hero/dinosaur.png" alt="" fill className="object-contain" sizes="498px" />
      </div>
    ),
  },
  {
    key: "banff-postcard",
    width: 352,
    height: 515,
    depth: 1.6,
    node: (
      <div className="relative h-full w-full drop-shadow-md">
        <Image src="/hero/banff-postcard.png" alt="" fill className="object-contain" sizes="352px" />
      </div>
    ),
  },
  {
    key: "florianopolis-postcard",
    width: 394,
    height: 394,
    depth: 2.1,
    node: (
      <div className="relative h-full w-full drop-shadow-md">
        <Image src="/hero/florianopolis-postcard.png" alt="" fill className="object-contain" sizes="394px" />
      </div>
    ),
  },
];

export default function Hero() {
  const [textEl, setTextEl] = useState<HTMLDivElement | null>(null);

  return (
    <section className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 py-16">
      <FallingDecor items={heroItems} avoidEl={textEl} />

      <div ref={setTextEl} className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-4xl font-medium leading-[1.1] tracking-[-0.03em] text-zinc-950 sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Bridging user needs
          <br />& business goals
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-6 text-base text-zinc-600 sm:text-lg md:text-xl lg:text-2xl"
        >
          Step inside to explore my work, and get to know the person behind it.
        </motion.p>
      </div>
    </section>
  );
}
