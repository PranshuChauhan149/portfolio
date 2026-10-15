import type { Metadata } from "next";
import ContactSection from "@/app/components/ContactSection";

export const metadata: Metadata = {
  title: "Contact | Pranshu Chauhan",
  description:
    "Get in touch with Pranshu Chauhan — open to full-time roles, freelance projects, and exciting collaborations. Usually replies within 24 hours.",
  openGraph: {
    title: "Contact | Pranshu Chauhan",
    description:
      "Open to full-time roles, freelance projects, and collaborations. Drop a message!",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactSection />;
}
