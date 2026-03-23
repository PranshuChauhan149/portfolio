import type { Metadata } from "next";
import ExperienceSection from "@/app/components/ExperienceSection";

export const metadata: Metadata = {
  title: "Experience | Pranshu Chauhan",
  description: "Professional timeline with engineering roles, achievements, and impact.",
};

export default function ExperiencePage() {
  return <ExperienceSection />;
}
