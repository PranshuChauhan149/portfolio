"use client";

import { usePathname } from "next/navigation";
import SplashCursor from "@/components/SplashCursor";

export default function RouteEffects() {
  const pathname = usePathname();
  const isProjectsRoute = pathname.startsWith("/projects");

  if (!isProjectsRoute) return null;

  return (
    <SplashCursor/>
  );
}
