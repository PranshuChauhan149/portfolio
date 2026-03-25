import type { Metadata } from "next";
import { Inter, Poppins, Geist } from "next/font/google";
import BackgroundGrid from "@/app/components/BackgroundGrid";
import Footer from "@/app/components/Footer";
import Chatbot from "@/app/components/Chatbot";
import MouseGlow from "@/app/components/MouseGlow";
import Navbar from "@/app/components/Navbar";
import RouteEffects from "@/app/components/RouteEffects";
import ThemeProvider from "@/app/components/ThemeProvider";
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
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: ["/icon.svg"],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={`${inter.variable} ${poppins.variable} antialiased bg-background-light dark:bg-background-dark text-textPrimary-light dark:text-textPrimary-dark transition-colors duration-300`}>
        <ThemeProvider>
          <MouseGlow />
          <BackgroundGrid />
          <RouteEffects />
          <Navbar />
          <main className="relative z-10 overflow-x-clip pb-10 pt-24 sm:pt-26 lg:pt-28">{children}</main>
          <Chatbot />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
