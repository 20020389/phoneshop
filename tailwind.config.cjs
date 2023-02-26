const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      ...defaultTheme.screens,
      'screen-2xl': {
        max: '1250px',
      },
      'screen-xl': {
        max: '1000px',
      },
      'screen-lg': {
        max: '750px',
      },
      'screen-md': {
        max: '500px',
      },
      'screen-sm': {
        max: '350px',
      },
    },
  },
  plugins: [],
};
