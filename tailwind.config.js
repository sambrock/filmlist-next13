const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        logo: ['var(--font-logo)'],
      },
      colors: {
        black: {
          DEFAULT: '#000000',
          900: '#0d0d0d',
          800: '#171717',
          700: '#212121',
          600: '#2a2a2a',
          500: '#343434',
          400: '#3e3e3e',
          300: '#484848',
          200: '#525252',
          100: '#5b5b5b',
        },

        'white-text': '#efebea',
      },
      aspectRatio: {
        poster: '1 / 1.5',
      },
    },
  },
  plugins: [],
};
