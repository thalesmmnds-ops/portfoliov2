"use client";

import { motion } from "framer-motion";
import { FigmaIcon, LaptopIcon, DinoIcon } from "./icons";

export default function Hero() {
  return (
    <section className="relative mx-auto max-w-5xl px-6 pb-24 pt-16 md:pt-24">
      <motion.div
        initial={{ opacity: 0, y: -8, rotate: -8 }}
        animate={{ opacity: 1, y: 0, rotate: -6 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 top-2 hidden h-28 w-24 overflow-hidden rounded-xl border-4 border-white bg-neutral-200 shadow-lg md:block"
      >
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-neutral-300 to-neutral-400 text-[10px] font-mono text-neutral-600">
          photo
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute right-2 top-0 hidden md:block"
      >
        <FigmaIcon className="h-8 w-6" />
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0], rotate: [-6, -3, -6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-4 top-36 hidden text-neutral-800/70 md:block"
      >
        <LaptopIcon className="h-14 w-20" />
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute right-0 top-28 hidden text-neutral-800/70 md:block"
      >
        <DinoIcon className="h-16 w-28" />
      </motion.div>

      <div className="mx-auto max-w-2xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-3xl leading-tight tracking-tight text-neutral-900 md:text-5xl"
        >
          Bridging user needs
          <br />& business goals
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-5 text-sm text-neutral-500 md:text-base"
        >
          I live in Calgary, and yes, I listen to country and love dinosaurs.
        </motion.p>
      </div>
    </section>
  );
}
