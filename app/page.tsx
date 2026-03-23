import type { Metadata } from "next";
import HeroSection from "@/app/components/HeroSection";
import SocialConnectHub from "@/app/components/SocialConnectHub";
import TechStackShowcase from "@/app/components/TechStackShowcase";

export const metadata: Metadata = {
  title: "Home | Pranshu Chauhan",
  description:
    "Full Stack Engineer portfolio featuring web development, mobile apps, and AI/ML projects.",
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <SocialConnectHub />
      <TechStackShowcase />
    </>
  );
}
