const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx,mdx}',
    './lib/**/*.{ts,tsx}',
    './content/**/*.{mdx,md}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#050816',
        surface: '#0b1223',
        accent: {
          DEFAULT: '#0bd1c5',
          soft: '#22d3ee',
          muted: '#6ee7e1',
        },
      },
      boxShadow: {
        glass: '0 30px 80px -40px rgba(0,0,0,0.75)',
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('rtl', '[dir="rtl"] &');
      addVariant('ltr', '[dir="ltr"] &');
    }),
  ],
};
