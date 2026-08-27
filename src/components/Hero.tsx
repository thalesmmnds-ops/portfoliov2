"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import FallingDecor from "./FallingDecor";

export default function Hero() {
  const [textEl, setTextEl] = useState<HTMLDivElement | null>(null);

  return (
    <section className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 py-16">
      <FallingDecor avoidEl={textEl} />

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
