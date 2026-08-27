import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Inter, Rubik } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic", "normal"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Your Name — Product Designer Portfolio",
  description: "Bridging user needs & business goals.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${inter.variable} ${rubik.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white">
        <SmoothScroll>{children}</SmoothScroll>
        <SpeedInsights />
      </body>
    </html>
  );
}
