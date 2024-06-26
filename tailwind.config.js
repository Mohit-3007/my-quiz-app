/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    screens: {
      '400-s': '400px',
      '500-s': '500px',
      '830-s': '830px'
    },
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
        corn: {
          '50': '#fffef2', 
          '100': '#fcfae3', 
          '200': '#faf3bb', 
          '300': '#f7ea94', 
          '400': '#f2d649', 
          '500': '#edbd01', 
          '600': '#d6a400', 
          '700': '#b37d00', 
          '800': '#8f5a00', 
          '900': '#6b3e00', 
          '950': '#452400'
        }  
      },
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      quicksand: ["Quicksand", "sans-serif"],
    },
  },
  plugins: [require("flowbite/plugin"),
    require('tailwind-scrollbar-hide'),
    require('daisyui'),
  ],
};
