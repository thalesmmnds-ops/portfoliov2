"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

type Pill = {
  label: string;
  top: string;
  left: string;
  rotate: number;
  color: string;
};

const pills: Pill[] = [
  { label: "Product Design", top: "6%", left: "42%", rotate: -3, color: "bg-blue-100 text-blue-900" },
  { label: "User Experience Design", top: "16%", left: "68%", rotate: 2, color: "bg-sky-100 text-sky-900" },
  { label: "Design Systems", top: "18%", left: "12%", rotate: -2, color: "bg-indigo-100 text-indigo-900" },
  { label: "User Research", top: "44%", left: "2%", rotate: 3, color: "bg-cyan-100 text-cyan-900" },
  { label: "User Interface Design", top: "48%", left: "78%", rotate: -2, color: "bg-blue-100 text-blue-900" },
  { label: "Pitch Deck Design", top: "72%", left: "10%", rotate: 2, color: "bg-purple-100 text-purple-900" },
  { label: "Branding", top: "78%", left: "80%", rotate: -3, color: "bg-pink-100 text-pink-900" },
  { label: "Visual Design", top: "92%", left: "58%", rotate: 2, color: "bg-rose-100 text-rose-900" },
  { label: "Framer Development", top: "92%", left: "26%", rotate: -2, color: "bg-violet-100 text-violet-900" },
];

export default function WhatIBring() {
  return (
    <section className="bg-[#F4EFE7] px-6 py-28">
      <div className="relative mx-auto min-h-[560px] max-w-4xl md:min-h-[520px]">
        <div className="flex flex-col items-center gap-3 pt-10 text-center md:absolute md:inset-0 md:justify-center md:pt-0">
          <Reveal className="text-3xl">🛹</Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-serif text-3xl italic text-blue-950 md:text-4xl">
              What I bring
              <br />
              to the table
            </h2>
          </Reveal>
          <Reveal delay={0.2} className="max-w-xs text-sm text-neutral-500">
            Digital experiences that engage users and help your startup stand out from day one
          </Reveal>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3 md:hidden">
          {pills.map((pill) => (
            <span
              key={pill.label}
              className={`rounded-full px-4 py-1.5 text-xs font-medium ${pill.color}`}
            >
              {pill.label}
            </span>
          ))}
        </div>

        <div className="hidden md:block">
          {pills.map((pill, i) => (
            <motion.span
              key={pill.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              whileHover={{ scale: 1.08, rotate: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              style={{ top: pill.top, left: pill.left, rotate: pill.rotate }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium shadow-sm ${pill.color}`}
            >
              {pill.label}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
