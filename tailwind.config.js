/** @type {import('tailwindcss').Config} */
import {nextui} from "@nextui-org/react"

export default  {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        response : "#f7b750",

        
      },
      backgroundImage: {
        'hero-pattern': "url('/sp.jpg')",
        'about1': "url('/about.jpg')",
        'bot1' : "url('/bot1.png')",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
