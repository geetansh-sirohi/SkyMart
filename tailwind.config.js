/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Cabinet Grotesk', 'Clash Display', 'Syne', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
      colors: {
        volt: {
          DEFAULT: '#c8f400',
          hover: '#b5dc00',
          light: '#d6ff1a',
        },
        ink: {
          DEFAULT: '#0a0a0a',
          card: '#141414',
          input: '#1a1a1a',
        },
        brand: {
          50: '#f0f3ff',
          100: '#e0e7ff',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          900: '#1e1b4b',
        }
      }
    },
  },
  plugins: [],
}
