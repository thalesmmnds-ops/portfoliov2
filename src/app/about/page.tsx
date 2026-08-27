import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About — Thales Mendes de Medeiros",
};

const meta = [
  { label: "Based in", value: "Calgary, Canada" },
  { label: "Status", value: "Permanent Resident" },
  { label: "Experience", value: "5+ Years" },
];

export default function AboutPage() {
  return (
    <>
      <div style={{ background: "linear-gradient(180deg, #ABE4FF 0%, #ffffff 100%)" }}>
        <Header />

        <section className="mx-auto max-w-5xl px-6 pb-20 pt-16">
          <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:gap-14">
            <Reveal className="shrink-0">
              <div className="relative h-[280px] w-[300px] overflow-hidden rounded-2xl bg-white/40 shadow-sm ring-1 ring-black/5 sm:h-[320px] sm:w-[340px]">
                <Image
                  src="/bring/boss-thales.webp"
                  alt="Thales Mendes de Medeiros"
                  fill
                  className="object-cover object-top"
                  sizes="340px"
                  priority
                />
              </div>
            </Reveal>

            <div className="flex flex-1 flex-col items-center gap-6 text-center md:items-start md:text-left">
              <Reveal>
                <h1 className="font-mono text-4xl leading-tight text-zinc-950 md:text-5xl">
                  About me
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="flex flex-wrap justify-center gap-3 md:justify-start">
                  {meta.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-full border border-[#d0d0d0] bg-white/60 px-4 py-1.5 text-sm text-zinc-800"
                    >
                      <span className="font-mono text-xs font-semibold uppercase tracking-wide text-[#114666]">
                        {item.label}:{" "}
                      </span>
                      {item.value}
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </div>

      <section className="mx-auto max-w-[700px] space-y-6 px-6 pb-24 pt-16 text-base leading-relaxed text-zinc-600">
        <Reveal>
          <p>
            I am a Product Designer based in Calgary (Permanent Resident) with{" "}
            <strong className="font-semibold text-neutral-800">5+ years of experience</strong>{" "}
            crafting user-centric digital products.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <p>
            Originally started as an Industrial Designer in Brazil, I bring a unique{" "}
            <strong className="font-semibold text-neutral-800">&ldquo;builder&rsquo;s mindset&rdquo;</strong>{" "}
            to UX, focusing on functionality, feasibility. I have a proven track record of
            working end-to-end with Product Managers and Engineers to translate complex
            requirements into intuitive, high-fidelity interfaces.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="font-medium text-zinc-800">
            Currently looking for opportunities to apply my cross-functional expertise in the
            Canadian tech landscape.
          </p>
        </Reveal>
      </section>

      <Footer />
    </>
  );
}
