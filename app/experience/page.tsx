import type { Metadata } from "next";
import ExperienceSection from "@/app/components/ExperienceSection";

export const metadata: Metadata = {
  title: "Experience | Pranshu Chauhan",
  description:
    "Professional timeline of Pranshu Chauhan — TCS Systems Engineer (offer accepted), Full Stack Developer Intern, academic training, and independent full-stack development.",
  openGraph: {
    title: "Experience | Pranshu Chauhan",
    description:
      "Explore Pranshu Chauhan's professional journey — from campus training to a TCS Systems Engineer offer.",
    type: "website",
  },
};

export default function ExperiencePage() {
  return <ExperienceSection />;
}
