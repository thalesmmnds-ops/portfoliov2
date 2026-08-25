import Image from "next/image";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import RichText from "@/components/RichText";

export const metadata: Metadata = {
  title: "From Confusion to Clarity — Case Study",
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[13px] font-semibold uppercase tracking-wide text-[#114666]">
      {children}
    </p>
  );
}

function TextSection({
  label,
  heading,
  headingFont = "mono",
  children,
}: {
  label: string;
  heading: string;
  headingFont?: "mono" | "editorial";
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-[700px] flex-col gap-6 px-6">
      <Reveal>
        <SectionLabel>{label}</SectionLabel>
      </Reveal>
      <Reveal delay={0.05}>
        <h2
          className={
            headingFont === "mono"
              ? "font-mono text-3xl leading-tight text-zinc-950 md:text-[40px]"
              : "font-[family-name:var(--font-editorial)] text-3xl leading-tight text-zinc-950 md:text-[40px]"
          }
        >
          {heading}
        </h2>
      </Reveal>
      <Reveal delay={0.1} className="space-y-4 text-base leading-relaxed text-zinc-600">
        {children}
      </Reveal>
    </div>
  );
}

function CaseImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Reveal className="mx-auto max-w-4xl px-6">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-zinc-100">
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 896px) 100vw, 896px" />
      </div>
    </Reveal>
  );
}

const base = "/work/from-confusion-to-clarity";

export default function Page() {
  return (
    <>
      <div
        style={{
          background: "linear-gradient(180deg, #ABE4FF 0%, #ffffff 100%)",
        }}
      >
        <Header />

        <section className="mx-auto max-w-3xl px-6 pb-20 pt-16 text-center">
          <Reveal>
            <h1 className="font-mono text-4xl leading-tight text-zinc-950 md:text-5xl">
              From confusion
              <br />
              to clarity.
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-14 grid grid-cols-3 gap-4 text-center sm:gap-6">
              {[
                { label: "Role", value: "Product Designer" },
                { label: "Duration", value: "3 Weeks" },
                { label: "Company", value: "Onze" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="font-mono text-xs font-semibold uppercase tracking-wide text-[#114666]">
                    {item.label}
                  </p>
                  <p className="mt-2 rounded-full border border-[#d0d0d0] bg-white/60 px-4 py-1.5 text-sm text-zinc-800">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>
      </div>

      <section className="mx-auto max-w-3xl px-6 pb-16 pt-16 text-center">
        <Reveal delay={0.2} className="space-y-4 text-left text-base leading-relaxed text-zinc-600">
          <SectionLabel>Intro</SectionLabel>
          <p>
            The fund selection step is the &ldquo;point of no return&rdquo; in the pension
            enrollment flow. It is where users commit their money.
          </p>
          <p>
            During the project, I was the only Product Designer working along with one PM
            and four developers.
          </p>
        </Reveal>
      </section>

      <Reveal className="mx-auto max-w-5xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {[
            {
              title: "Problems",
              items: [
                "**High Drop-Off** Rates at a Critical Step",
                "**Lost Revenue**, directly resulted in lost (AUM) for the company.",
                "Confused users flooded the CS team with basic questions",
              ],
            },
            {
              title: "Solution",
              items: [
                "**Designed a new component** applied in the DS",
                "**Addressed core user question** by defaulting profitability",
                "Enhanced Cards with Clear CTAs: Displayed crucial info (taxes, risk)",
              ],
            },
            {
              title: "Results",
              items: [
                "**23% decrease** in the number of people exiting the flow",
                "**42% reduction in questions** to the customer success team",
                "Empowered Decision, allowing users to choose confidently",
              ],
            },
          ].map((col) => (
            <div key={col.title} className="rounded-lg border border-[#d0d0d0] p-8">
              <h3 className="font-mono text-[28px] text-[#114666]">{col.title}</h3>
              <ul className="mt-4 space-y-4">
                {col.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-zinc-600">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#114666]" />
                    <span>
                      <RichText text={item} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>

      <section className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 pb-28 md:flex-row">
        <Reveal delay={0} className="relative aspect-[536/683] flex-1 overflow-hidden rounded-2xl">
          <Image
            src={`${base}/hero-hand.png`}
            alt="Onze fund selection screen shown on a phone held in hand"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 45vw"
          />
        </Reveal>
        <Reveal delay={0.15} className="relative aspect-[540/683] flex-1 overflow-hidden rounded-2xl">
          <Image
            src={`${base}/hero-card.jpg`}
            alt="Annotated breakdown of the redesigned fund card"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 45vw"
          />
        </Reveal>
      </section>

      <div className="space-y-24 pb-24">
        <TextSection label="Overview" heading={'"I don’t know which fund is safe, so I just stopped."'} headingFont="editorial">
          <p>
            The fund selection screen had become the primary bottleneck for Onze&rsquo;s
            growth. Users were arriving at this step interested, but leaving confused.
          </p>
          <p>This friction created a dual failure mode:</p>
          <ol className="list-decimal space-y-2 pl-6">
            <li>
              <RichText text="**Lost Revenue (AUM):** Users abandoning the flow meant lost Assets Under Management." />
            </li>
            <li>
              <RichText text="**Operational Drain:** Confused users who didn't quit were flooding the CS team with basic questions about fees and risks." />
            </li>
          </ol>
        </TextSection>

        <Reveal className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-[#d0d0d0] p-6">
              <p className="font-mono text-base font-semibold text-zinc-800">
                Company objective:
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                Reduce drop-offs at this step and lower support volume. Primary metrics:
                exit rate at this screen + CS tickets mentioning fund selection.
              </p>
            </div>
            <div className="rounded-xl border border-[#d0d0d0] p-6">
              <p className="font-mono text-base font-semibold text-zinc-800">
                User objective:
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                Ensure that users have sufficient information to choose their investment
                funds, understand why they are seeing those funds, and optimize usability.
              </p>
            </div>
          </div>
        </Reveal>

        <CaseImage src={`${base}/why-matters.jpg`} alt="Why this problem mattered to Onze" />

        <TextSection label="Process" heading="A research deep dive into how users choose a fund.">
          <p>
            Working alongside the CS and implementation teams, I mapped the most common
            failure points, cross-referencing session recordings with the top support
            request categories. Seven distinct painpoints emerged, falling into two
            clusters: <RichText text="**missing information and broken affordances.**" />
          </p>
          <p>
            After the analysis, I started a Benchmarking, focused on one question:{" "}
            <RichText text="**what information do users expect when choosing a fund, and in what order?**" />{" "}
            Across every app I studied — Rico, Nubank, Warren, BTG — the pattern was
            consistent.
          </p>
          <p>
            <RichText text="**Users scan profitability before they read fund descriptions**" />
            . Risk is best shown as a badge, not a slider. And{" "}
            <RichText text="**trust isn't built through information volume**" />, it&rsquo;s
            built through one line that explains why they&rsquo;re seeing these options.
            That reframing changed the entire card hierarchy.
          </p>
        </TextSection>

        <CaseImage src={`${base}/funds-analysis.jpg`} alt="Funds analysis and benchmarking research" />

        <TextSection label="Process" heading="Prototyping & Validation: From Wireframes to User Testing">
          <p>
            With the new card hierarchy defined by the benchmarking,{" "}
            <RichText text="**I moved into high-fidelity wireframes using the existing Onze** design system." />{" "}
            <RichText text="**The main challenge wasn't styling, it was information density:**" />{" "}
            how much could a single fund card hold before it became overwhelming again?
          </p>
          <p>
            Each variant was reviewed against the seven pain points identified earlier,
            checking whether it actually resolved the specific &ldquo;missing
            information&rdquo; or &ldquo;broken affordance&rdquo; issues users had flagged,
            not just whether it looked cleaner.{" "}
            <RichText text="**This kept the exploration grounded in the problem rather than aesthetic preference.**" />
          </p>
        </TextSection>

        <CaseImage src={`${base}/wireframes.jpg`} alt="Wireframe explorations for the fund card" />

        <div className="mx-auto max-w-[700px] px-6">
          <Reveal className="space-y-4 text-base leading-relaxed text-zinc-600">
            <p>
              <RichText text="**Usability Testing:** Once the high-fidelity prototype was ready, I wrote a testing script covering realistic decision-making scenarios, for example, asking users to choose a fund for a specific goal (e.g., “pick the option you'd feel comfortable investing your retirement savings into”) rather than just asking them to browse. This surfaced how people actually reasoned through the cards, not just whether they could find information." />
            </p>
            <p>
              I ran the sessions on UserTesting.com with 9 participants, collecting
              qualitative feedback on:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                Whether the card hierarchy matched their natural decision order
                (profitability → risk → fees)
              </li>
              <li>Whether the risk badge was interpreted correctly without additional explanation</li>
              <li>Whether the trust line reduced hesitation or was ignored/misunderstood</li>
              <li>Any moments of confusion, hesitation, or backtracking during the task</li>
            </ul>
            <p>
              The feedback validated the profitability-first sort as the right default and
              confirmed the risk badge communicated faster than the original, but also
              surfaced smaller friction points I refined before handoff to development.
            </p>
          </Reveal>
        </div>

        <CaseImage src={`${base}/usability-testing.png`} alt="Usability testing sessions on UserTesting.com" />

        <div className="mx-auto flex max-w-[700px] flex-col gap-6 px-6">
          <Reveal>
            <SectionLabel>Final Results &amp; Learning</SectionLabel>
          </Reveal>
          <Reveal delay={0.1} className="space-y-4 text-base leading-relaxed text-zinc-600">
            <p className="font-semibold text-zinc-800">Before and After:</p>
            <p>
              Users can now view taxes, profitability, risk level, and other information.
              They can also sort the funds according to their needs. The new card features
              a clear call to action, prompting users to select their desired funds or
              learn more about them.
            </p>
            <p className="pt-2 font-semibold text-zinc-800">Key takeaways:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <RichText text="The most important decision wasn't visual, it was choosing to sort by profitability by default, because **that was the question users were actually asking.**" />
              </li>
              <li>
                <RichText text="Use interaction **models that align with users' mental expectations**, and focus on the core user job." />
              </li>
              <li>Stick to familiar patterns.</li>
            </ul>
          </Reveal>
        </div>

        <CaseImage src={`${base}/before-after.jpg`} alt="Before and after comparison of the fund card" />
      </div>

      <Reveal className="mx-auto max-w-3xl px-6 pb-8 text-center">
        <p className="font-mono text-sm text-zinc-400">Thanks for scrolling all the way</p>
      </Reveal>

      <Footer />
    </>
  );
}
