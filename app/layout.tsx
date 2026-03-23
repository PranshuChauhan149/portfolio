import type { Metadata } from "next";
import { Inter, Poppins, Geist } from "next/font/google";
import BackgroundGrid from "@/app/components/BackgroundGrid";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import RouteEffects from "@/app/components/RouteEffects";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Pranshu Chauhan | Full Stack Engineer Portfolio",
  description:
    "Premium full stack portfolio showcasing web, mobile, and AI/ML engineering projects.",
  metadataBase: new URL("https://example.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        <BackgroundGrid />
        <RouteEffects />
        <Navbar />
        <main className="relative z-10 pb-10 pt-26 sm:pt-28">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
