import Link from "next/link";
import Reveal from "./Reveal";
import FolderCard from "./FolderCard";
import type { Project } from "@/lib/projects";

export default function FeaturedProjects({ projects }: { projects: Project[] }) {
  return (
    <section id="work" className="mx-auto max-w-5xl px-6 pb-28">
      <Reveal>
        <h2 className="font-mono text-[32px] font-semibold text-zinc-900">
          Featured Projects
        </h2>
      </Reveal>

      <div className="mt-[24px] grid grid-cols-1 gap-6 sm:grid-cols-3">
        {projects.map((project, i) => {
          const card = <FolderCard {...project} />;

          return (
            <Reveal key={project.slug} delay={i * 0.08}>
              {project.live ? (
                <Link href={`/work/${project.slug}`}>{card}</Link>
              ) : (
                <div className="cursor-default">{card}</div>
              )}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
