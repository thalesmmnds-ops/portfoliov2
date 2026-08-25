"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { TableIcon } from "./icons";

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

// Approximate size of the scatter container, used to translate each pill's
// resting position into a "distance from center" offset for the entrance.
const FIELD_W = 700;
const FIELD_H = 480;

function centerOffset(pill: Pill) {
  const leftPct = parseFloat(pill.left);
  const topPct = parseFloat(pill.top);
  return {
    x: ((50 - leftPct) / 100) * FIELD_W,
    y: ((50 - topPct) / 100) * FIELD_H,
  };
}

export default function WhatIBring() {
  return (
    <section className="bg-white px-6 py-28">
      <div className="relative mx-auto min-h-[560px] max-w-4xl md:min-h-[520px]">
        <div className="relative z-10 flex flex-col items-center gap-3 pt-10 text-center md:absolute md:inset-0 md:justify-center md:pt-0">
          <Reveal>
            <TableIcon className="h-8 w-11 text-blue-950" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-mono text-3xl text-blue-950 md:text-4xl">
              What I bring
              <br />
              to the table
            </h2>
          </Reveal>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3 md:hidden">
          {pills.map((pill) => (
            <span
              key={pill.label}
              className={`rounded-full px-4 py-1.5 font-sans text-xs font-medium ${pill.color}`}
            >
              {pill.label}
            </span>
          ))}
        </div>

        <div className="hidden md:block">
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
                  className={`inline-block whitespace-nowrap rounded-full px-4 py-2 font-sans text-sm font-medium shadow-sm ${pill.color}`}
                >
                  {pill.label}
                </motion.span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
