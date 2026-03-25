import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: {
          light: "#FFFFFF",
          dark: "#0B0F19",
          DEFAULT: "#0B0F19",
        },
        secondary: {
          light: "#F3F4F6",
          dark: "#111827",
          DEFAULT: "#111827",
        },
        accent: "#6366F1",
        highlight: "#22C55E",
        textPrimary: {
          light: "#1F2937",
          dark: "#E5E7EB",
          DEFAULT: "#E5E7EB",
        },
        textSecondary: {
          light: "#6B7280",
          dark: "#9CA3AF",
          DEFAULT: "#9CA3AF",
        },
      },
      borderRadius: {
        xl: "0.9rem",
        "2xl": "1.2rem",
      },
      boxShadow: {
        glow: "0 0 35px rgba(99, 102, 241, 0.2)",
      },
    },
  },
};

export default config;
