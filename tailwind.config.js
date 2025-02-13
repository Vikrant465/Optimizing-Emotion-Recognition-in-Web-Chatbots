/** @type {import('tailwindcss').Config} */
import {heroui} from "@heroui/react"

export default  {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        response : "#f7b750",
        a : "#d4d4d4"
        
      },
      backgroundImage: {
        
        'about1': "url('/about.jpg')",
        'bot1' : "url('/bot1.png')",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
