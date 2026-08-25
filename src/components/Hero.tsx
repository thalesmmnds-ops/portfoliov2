"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import FallingDecor from "./FallingDecor";

export default function Hero() {
  const textRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative mx-auto max-w-5xl px-6 pb-[200px] pt-16 md:pt-[140px]">
      <FallingDecor avoidRef={textRef} />

      <div ref={textRef} className="relative mx-auto max-w-4xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-[72px] font-medium leading-[1.1] tracking-[-0.03em] text-zinc-950"
        >
          Bridging user needs
          <br />& business goals
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-6 text-[24px] text-zinc-600"
        >
          I live in Calgary, and yes, I listen to country and love dinosaurs.
        </motion.p>
      </div>
    </section>
  );
}
