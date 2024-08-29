/** @type {import('tailwindcss').Config} */
export default {
  content: ['./**/index.html', './src/**/*.{js,ts,jsx,tsx,mjs,cjs}'],
  theme: {
    extend: {
      colors: {
        primary: '#BE1D1D',
        grayLight: '#D9D9D9',
        grayLighter: '#E9ECED',
        dark: '#111111',
        dark92: '#111111E9', // 92% opacity
        red: '#DA2828',
      },
      fontFamily: {
        sans: ['Jura', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
