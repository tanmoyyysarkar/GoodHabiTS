/** @type {import('tailwindcss').Config} */
const { tailwindColors } = require('./src/theme/tokens');

module.exports = {
  content: ['./App.{js,ts,tsx}', './src/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: tailwindColors,
      backdropBlur: {
        'glass-sm': '8px',  // cards
        'glass-md': '12px', // screen surface
        'glass-lg': '20px', // tab bar
      },
    },
  },
  plugins: [],
};
