"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const links = [
  { label: "Work", href: "/#work" },
  { label: "Playground", href: "/playground" },
  { label: "About", href: "/about" },
  { label: "CV", href: "/cv.pdf" },
];

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 flex justify-center px-6 pt-6"
    >
      <nav className="flex items-center gap-1 rounded-full border border-black/10 bg-white/70 px-2 py-2 font-mono text-sm backdrop-blur-md shadow-sm">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="rounded-full px-4 py-1.5 text-neutral-700 transition-colors hover:bg-black/5 hover:text-black"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </motion.header>
  );
}
