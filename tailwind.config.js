/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.{html,js,ts}",
    "./pages/**/*.{html,js,ts}"
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          600: '#4f46e5', // Brand Primary Color
        }
      }
    },
  },
  plugins: [],
}
