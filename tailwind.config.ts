import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        headingXL: ["24px", "30px"], // Heading XL with 30px line height
        headingL: ["18px", "23px"], // Heading L with 23px line height
        headingM: ["15px", "19px"], // Heading M with 19px line height
        headingS: [
          "12px",
          {
            // Heading S with 15px line height and 2.4px letter spacing
            lineHeight: "15px",
            letterSpacing: "2.4px",
          },
        ],
        bodyL: ["13px", "23px"], // Body L with 23px line height
        bodyM: ["12px", "15px"], // Body M with 15px line height
      },
      colors: {
        primary: {
          DEFAULT: "#635FC7", // The primary color
          light: "#A8A4FF", // A lighter shade of the primary color
        },
        neutral: {
          dark: "#000112", // A very dark neutral
          darker: "#20212C", // Darker neutral
          darkGray: "#2B2C37", // Dark gray
          gray: "#3E3F4E", // Neutral gray
          lightGray: "#828FA3", // Light gray
          lightestGray: "#E4EBFA", // Very light gray
        },
        accent: {
          red: "#EA5555", // Red accent
          lightRed: "#FF9898", // Light red accent
        },
        background: {
          light: "#F4F7FD", // Light background
          white: "#FFFFFF", // White
        },
      },
    },
  },
  plugins: [],
};
export default config;
