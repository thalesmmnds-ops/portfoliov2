import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutIntro from "@/components/AboutIntro";

export const metadata: Metadata = {
  title: "About — Thales Mendes de Medeiros",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <AboutIntro />
      <Footer />
    </>
  );
}
