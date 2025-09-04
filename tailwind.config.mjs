// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './styles/**/*.{css}',
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