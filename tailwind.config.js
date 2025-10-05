/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF385C',
        'primary-dark': '#E31C5F',
        secondary: '#00A699',
        'gray-50': '#F7F7F7',
        'gray-100': '#EBEBEB',
        'gray-200': '#DDDDDD',
        'gray-300': '#B0B0B0',
        'gray-700': '#484848',
        'gray-900': '#222222',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}