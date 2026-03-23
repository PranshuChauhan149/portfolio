import type { Metadata } from "next";
import ContactSection from "@/app/components/ContactSection";

export const metadata: Metadata = {
  title: "Contact | Pranshu Chauhan",
  description: "Get in touch for full-time roles, collaborations, and freelance opportunities.",
};

export default function ContactPage() {
  return <ContactSection />;
}
