/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': {
          primary: '#B371FF',
          accent: '#00F0FF',
        }
      }
    },
  },
  plugins: [],
}
