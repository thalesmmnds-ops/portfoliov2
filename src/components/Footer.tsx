"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

export default function Footer() {
  return (
    <footer className="mx-auto max-w-5xl px-6 pb-16 pt-8">
      <Reveal>
        <h2 className="text-center font-mono text-2xl text-neutral-900 md:text-3xl">
          Let&apos;s connect.
          <br />
          <span className="text-neutral-400">I&apos;m always down for a chat.</span>
        </h2>
      </Reveal>

      <div className="mt-10 overflow-hidden border-y border-black/10 py-4">
        <motion.a
          href="mailto:thalesmmnds@gmail.com"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          className="flex w-max shrink-0 whitespace-nowrap font-mono text-sm text-neutral-400 hover:text-neutral-900"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="mx-4">
              CLICK TO MAIL ME —
            </span>
          ))}
        </motion.a>
      </div>

      <div className="mt-10 flex items-center justify-between font-mono text-xs text-neutral-400">
        <span>
          Your
          <br />
          Name
        </span>
        <span>© {new Date().getFullYear()}</span>
        <span>Built with love</span>
      </div>
    </footer>
  );
}
