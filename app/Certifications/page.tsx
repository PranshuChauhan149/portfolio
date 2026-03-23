import type { Metadata } from "next";
import CertificationsSection from "@/app/components/CertificationsSection";

export const metadata: Metadata = {
	title: "Certifications | Pranshu Chauhan",
	description: "Professional certifications and credentials in web, cloud, and AI engineering.",
};

export default function CertificationsPage() {
	return <CertificationsSection />;
}
