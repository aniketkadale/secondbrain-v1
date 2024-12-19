/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          200: "#eeeeef",
          400: "#e6e9ed",
          600: "#95989c"
        },
        purple: {
          300: "#e0e7fe",
          500: "#3e38a7",
          600: "#5046e4"
        }
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
}