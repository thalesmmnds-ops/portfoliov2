import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
import WhatIBring from "@/components/WhatIBring";
import Footer from "@/components/Footer";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <>
      <div className="flex min-h-dvh flex-col">
        <Header />
        <Hero />
      </div>
      <FeaturedProjects projects={projects} />
      <WhatIBring />
      <Footer />
    </>
  );
}
