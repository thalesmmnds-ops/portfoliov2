import Image from "next/image";
import { ArrowUpRightIcon } from "./icons";
import type { Experiment } from "@/lib/experiments";

export default function PlaygroundCard({ experiment }: { experiment: Experiment }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-zinc-100">
        <Image
          src={experiment.image}
          alt={experiment.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {!experiment.live && (
          <span className="absolute right-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wide text-zinc-500">
            Soon
          </span>
        )}
      </div>

      <div>
        <p className="flex items-center gap-1.5 font-mono text-base font-medium text-zinc-900">
          {experiment.title}
          {experiment.live && <ArrowUpRightIcon className="h-3.5 w-3.5 shrink-0 text-zinc-400" />}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-zinc-600">{experiment.tagline}</p>
      </div>
    </div>
  );
}
