import type { Config } from 'tailwindcss'
const defaultTheme = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    './slices/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.5rem" }],
        base: ["1rem", { lineHeight: "1.75rem" }],
        lg: ["1.125rem", { lineHeight: "2rem" }],
        xl: ["1.25rem", { lineHeight: "2rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["2rem", { lineHeight: "2.5rem" }],
        "4xl": ["2.5rem", { lineHeight: "3.5rem" }],
        "5xl": ["3rem", { lineHeight: "3.5rem" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
        "7xl": ["4.5rem", { lineHeight: "1.1" }],
        "8xl": ["6rem", { lineHeight: "1" }],
        "9xl": ["8rem", { lineHeight: "1" }],
      },
      colors: {
        primary: {
          orange: "#ED6B22",
          pink: "#F97289",
          green: "#3BBB96",
          purple: "#8E44EC",
          blue: "#59B5F8"
        },
        secondary: {
          orange: "#F39A68",
          pink: "#F7A1B0",
          green: "#75DCC0",
          purple: "#B382F2",
          blue: "#87D9FD"
        },
        tertiary: {
          orange: "#FCDAC4",
          pink: "#FFD6DE",
          green: "#D4F2E9",
          purple: "#E8C7FF",
          blue: "#C3EEFE"
        },
        quaternary: {
          orange: "#FEF1E9",
          pink: "#FFE5EA",
          green: "#D4F2E9",
          purple: "#F5E6FF",
          blue: "#E6F7FE"
        },
        gray: {
          darker: "#1F1F1F",
          dark: "#303030",
          base: "#505050",
        },
        silver: {
          darker: "#A4A4A4",
          dark: "#ACACAC",
          base: "#EEEEEE",
          light: "#F7F7F7"
        },
        white: "#FFFFFF",
        black: "#000000",
        transparent: "transparent"
      },
      maxWidth: {
        "2xl": "40rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        display: ["Lexend", ...defaultTheme.fontFamily.sans],
        code: ["ui-monospace", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
}
export default config
