import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import PlaygroundCard from "@/components/PlaygroundCard";
import { experiments } from "@/lib/experiments";

export const metadata: Metadata = {
  title: "Playground — Thales Mendes de Medeiros",
};

export default function PlaygroundPage() {
  return (
    <>
      <Header />

      <section className="mx-auto max-w-5xl px-6 pb-24 pt-16">
        <Reveal>
          <h1 className="font-mono text-[32px] font-semibold text-zinc-950">Playground</h1>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-3 max-w-lg text-base leading-relaxed text-zinc-600">
            A few things I&rsquo;ve built just to see what happens — not client work, just
            experiments.
          </p>
        </Reveal>

        {experiments.length === 0 ? (
          <Reveal delay={0.1}>
            <p className="mt-16 font-mono text-sm text-zinc-400">Nothing here yet — check back soon.</p>
          </Reveal>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2">
            {experiments.map((experiment, i) => {
              const card = <PlaygroundCard experiment={experiment} />;
              return (
                <Reveal key={experiment.slug} delay={0.1 + i * 0.06}>
                  {experiment.live ? (
                    <Link href={`/playground/${experiment.slug}`}>{card}</Link>
                  ) : (
                    <div className="cursor-default">{card}</div>
                  )}
                </Reveal>
              );
            })}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}
