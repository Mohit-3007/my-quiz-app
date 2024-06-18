/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        quiz: {
          50: "#f7f0f7",
          100: "#f0dfef",
          200: "#d6b4d4",
          300: "#bd8cb9",
          400: "#8c4c87",
          500: "#5d2057",
          600: "#521949",
          700: "#45113a",
          800: "#380b2b",
          900: "#29061d",
          950: "#1a0310",
        },
      },
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      quicksand: ["Quicksand", "sans-serif"],
    },
  },
  plugins: [require("flowbite/plugin")],
};
