import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B0F19",
        secondary: "#111827",
        accent: "#6366F1",
        highlight: "#22C55E",
        textPrimary: "#E5E7EB",
        textSecondary: "#9CA3AF",
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
