/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bgLogin': "url('/src/assets/resort.jpg')",
        'bgSm': "url('/src/assets/mobile.png')"
      },
      colors: {
        "dark-alta": "#19345E",
        "orange-alta": "#F47522",
      },
    },
  },
  plugins: [require('daisyui')]

  ,
  daisyui: {
    base: false,
    darkTheme: "light",
  }
})
