"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FolderIcon } from "./icons";
import Reveal from "./Reveal";
import type { Project } from "@/lib/projects";

export default function FeaturedProjects({ projects }: { projects: Project[] }) {
  return (
    <section id="work" className="mx-auto max-w-5xl px-6 pb-28">
      <Reveal>
        <h2 className="font-mono text-lg font-semibold text-neutral-900 md:text-xl">
          Featured Projects
        </h2>
      </Reveal>

      <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-3">
        {projects.map((project, i) => {
          const card = (
            <motion.div
              whileHover={project.live ? { y: -6 } : undefined}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col items-center text-center"
            >
              <motion.div
                whileHover={project.live ? { rotate: -3, scale: 1.04 } : undefined}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <FolderIcon className="h-20 w-24 drop-shadow-sm" />
                {!project.live && (
                  <span className="absolute -top-2 -right-3 rounded-full bg-neutral-900 px-2 py-0.5 text-[10px] font-mono text-white">
                    soon
                  </span>
                )}
              </motion.div>
              <p className="mt-3 max-w-[10rem] font-mono text-sm text-neutral-700">
                {project.title}
              </p>
            </motion.div>
          );

          return (
            <Reveal key={project.slug} delay={i * 0.08}>
              {project.live ? (
                <Link href={`/work/${project.slug}`}>{card}</Link>
              ) : (
                <div className="cursor-default opacity-70">{card}</div>
              )}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
