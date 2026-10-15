import type { Metadata } from "next";
import HomeHero from "@/app/components/home/HomeHero";
import TechCredibilityStrip from "@/app/components/home/TechCredibilityStrip";
import FeaturedWork from "@/app/components/home/FeaturedWork";
import AboutTeaser from "@/app/components/home/AboutTeaser";
import ClosingCTA from "@/app/components/home/ClosingCTA";

export const metadata: Metadata = {
  title: "Pranshu Chauhan | Full Stack Developer",
  description:
    "Full Stack Developer & CS student building modern, scalable web applications with React, Next.js, Node.js, and TypeScript. Open to opportunities.",
  openGraph: {
    title: "Pranshu Chauhan | Full Stack Developer",
    description:
      "Full Stack Developer & CS student building modern, scalable web applications. Open to opportunities.",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <HomeHero />
      <TechCredibilityStrip />
      <FeaturedWork />
      <AboutTeaser />
      <ClosingCTA />
    </>
  );
}
