/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eaedf3',
          100: '#d0d8e6',
          200: '#aab8d2',
          300: '#7a91b9',
          400: '#516c9d',
          500: '#385081',
          600: '#2b3f68',
          700: '#233254',
          800: '#1e2b46',
          900: '#0a1128', // Dark Navy
        },
        gold: {
          100: '#fcf3d9',
          200: '#f7e1a3',
          300: '#f2cd6d',
          400: '#ecb736',
          500: '#d99d19',
          600: '#b87c0e', // Primary Gold
          700: '#945b0a',
          800: '#7a480d',
          900: '#673c10',
        },
        subtle: '#f8fafc',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}
