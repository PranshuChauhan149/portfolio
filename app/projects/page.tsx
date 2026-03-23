import type { Metadata } from "next";
import ProjectsSection from "@/app/components/ProjectsSection";

export const metadata: Metadata = {
  title: "Projects | Pranshu Chauhan",
  description: "Explore web, mobile, and AI/ML projects with implementation details and outcomes.",
};

export default function ProjectsPage() {
  return (
    <ProjectsSection
      variant="showcase"
      introCentered
      title="Featured Projects"
      subtitle="A collection of my recent work, experiments, and products across web, mobile, and AI engineering."
    />
  );
}
