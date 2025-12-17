/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        glass: "rgba(20, 20, 25, 0.7)",
        glassBorder: "rgba(255, 255, 255, 0.1)",
        neonBlue: "#00f3ff",
        neonPink: "#ff00ff",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
