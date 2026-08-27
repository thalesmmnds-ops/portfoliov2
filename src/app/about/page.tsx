import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About — Thales Mendes de Medeiros",
};

export default function AboutPage() {
  return (
    <>
      <Header />

      <section className="mx-auto flex max-w-[700px] flex-col items-center gap-8 px-6 pb-24 pt-20">
        <div className="space-y-6 text-base leading-relaxed text-zinc-600">
          <Reveal delay={0.05}>
            <p>
              I am a Product Designer based in Calgary (Permanent Resident) with{" "}
              <strong className="font-semibold text-neutral-800">5+ years of experience</strong>{" "}
              crafting user-centric digital products.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p>
              Originally started as an Industrial Designer in Brazil, I bring a unique{" "}
              <strong className="font-semibold text-neutral-800">&ldquo;builder&rsquo;s mindset&rdquo;</strong>{" "}
              to UX, focusing on functionality, feasibility. I have a proven track record of
              working end-to-end with Product Managers and Engineers to translate complex
              requirements into intuitive, high-fidelity interfaces.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="font-medium text-zinc-800">
              Currently looking for opportunities to apply my cross-functional expertise in the
              Canadian tech landscape.
            </p>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
