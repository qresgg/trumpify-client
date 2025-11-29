/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        selectedColor: "#2A2A2A",
        prodGreenColor: "#1ED760",
        errorColor: "#DC3545"
      }
    },
  },
  plugins: [],
}