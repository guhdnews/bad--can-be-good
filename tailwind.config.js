// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'nur-light': '#f8fafc',
        'nur-blue': '#3b82f6',
      },
    },
  },
  plugins: [],
}