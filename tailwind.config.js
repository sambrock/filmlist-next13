const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        serif: ['var(--font-serif)', ...fontFamily.serif],
        logo: ['var(--font-logo)'],
      },
      colors: {
        neutral: {
          900: '#0d0d0d',
          800: '#151515',
          700: '#1f1f1f',
          600: '#292929',
          500: '#323232',
          400: '#3c3c3c',
          300: '#464646',
          200: '#505050',
          100: '#5a5a5a',
        },

        'off-white': '#efebea',
      },
      aspectRatio: {
        poster: '1 / 1.5',
      },
    },
  },
  plugins: [],
};
