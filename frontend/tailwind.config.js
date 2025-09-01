// tailwind.config.ts

// import { Config } from "tailwindcss"; // Type imports are not supported in JS files
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import aspect from '@tailwindcss/aspect-ratio';

const config = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
  ],

  plugins: [
    forms,
    typography,
    aspect,
    require("tailwindcss-animate")
  ],
};

export default config;
