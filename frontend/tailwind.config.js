/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        "glow-blue": "0 0px 5em rgba(56, 190, 248, 0.3)"
      }
    },
  },
  plugins: [],
}
