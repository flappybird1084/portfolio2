import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light / sterile palette — white background, dark ink text, blue accent
        ink: "#ffffff", // page background
        panel: "rgba(248,249,251,0.7)", // frosted section background
        accent: "#2f6bff",
        "accent-bright": "#1b4fd6", // darker hover, reads on white
        "accent-deep": "#2f6bff",
        paper: "#16181d", // primary text
        muted: "#5b6470", // secondary text
        faint: "#9aa2ad", // tertiary / labels
        soft: "#3b424d", // body copy
      },
      fontFamily: {
        display: ["var(--font-archivo)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      maxWidth: {
        content: "680px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease forwards",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
