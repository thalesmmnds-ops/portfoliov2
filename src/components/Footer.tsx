import Reveal from "./Reveal";
import { ArrowDownRightIcon, ArrowUpRightIcon } from "./icons";

const socials = [
  { label: "GitHub", href: "https://github.com/thalesmmnds-ops" },
  { label: "Linkedin", href: "https://www.linkedin.com/in/thalesmnds/" },
  { label: "Behance", href: "https://www.behance.net/thalesmmendes" },
];

export default function Footer() {
  return (
    <footer className="bg-[#e8731a] px-6 pb-10 pt-[100px]">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className="font-mono text-[56px] font-medium tracking-tight text-white">
            Let&apos;s work together
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-8 flex flex-col items-start gap-3">
          <ArrowDownRightIcon className="h-6 w-6 text-white" />
          <a
            href="mailto:thalesmmnds@gmail.com"
            className="font-sans text-[24px] text-white transition-all duration-200 hover:font-bold hover:opacity-80"
          >
            thalesmmnds@gmail.com
          </a>
        </Reveal>

        <div className="mt-20 flex flex-col gap-6 border-t border-white/10 pt-6 font-mono text-xs text-white md:flex-row md:items-center md:justify-between">
          <span>© Built by Thales</span>
          <div className="flex items-center gap-6">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-white transition-all duration-200 hover:font-bold hover:opacity-80"
              >
                {social.label}
                <ArrowUpRightIcon className="h-3 w-3" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
