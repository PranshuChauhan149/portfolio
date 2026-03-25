import type { Metadata } from "next";
import AboutSection from "@/app/components/AboutSection";

export const metadata: Metadata = {
  title: "About | Pranshu Chauhan",
  description: "Know the journey, mindset, and story behind my full stack engineering work.",
};

export default function AboutPage() {
  return (
    <>
      <AboutSection />
      
    </>
  );
}
