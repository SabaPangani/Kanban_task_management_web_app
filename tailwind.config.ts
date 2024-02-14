import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        purple: "#635FC7",
        "purple-hover": "#A8A4FF",
        dark: "#000112",
        "very-dark-gray": "#20212C",
        "dark-gray": "#2B2C37",
        gray: "#3E3F4E",
        "medium-gray": "#828FA3",
        "gray-hover": "#E4EBFA",
        "light-gray": "#F4F7FD",
        red: "#EA5555",
        "red-hover": "#FF9898",
      },
    },
  },
  plugins: [],
};

export default config;
