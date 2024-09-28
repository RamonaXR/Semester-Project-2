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
        customRed: '#DA2828',
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        spin: 'spin 1s linear infinite',
      },
      fontFamily: {
        sans: ['Jura', 'sans-serif'],
      },
      borderColor: {
        topPrimary: '#BE1D1D',
        rightGrayLight: '#D9D9D9',
        bottomCustomRed: '#DA2828',
        leftGrayLighter: '#E9ECED',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.no-scroll': {
          overflow: 'hidden',
        },
      });
    },
  ],
};
