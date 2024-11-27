/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'text-indigo-800', // Safelist for indigo text color
    'hover:bg-indigo-100', // Safelist for indigo hover background
    'text-red-800', // Safelist for red text color
    'hover:bg-red-100', // Safelist for red hover background
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
