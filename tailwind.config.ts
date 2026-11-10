import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        cobalt: "#172554",
        "deep-blue": "#0f172a",
        cream: "#f6f3ee",
        orange: "#ff7a2f",
        ink: "#14153a",
        "dark-cobalt": "#0b1124",
      },
      fontFamily: {
        grotesque: ["var(--font-bricolage)", "sans-serif"],
        serif: ["var(--font-newsreader)", "serif"],
      },
      boxShadow: {
        "hard-sm": "3px 3px 0px #0f172a",
        hard: "6px 6px 0px #0f172a",
        "hard-lg": "8px 8px 0px #0f172a",
        "hard-ink": "5px 5px 0px #14153a",
        "hard-orange": "5px 5px 0px #ff7a2f",
      },
      borderRadius: {
        "3xl": "26px",
      },
    },
  },
  plugins: [],
};

export default config;
