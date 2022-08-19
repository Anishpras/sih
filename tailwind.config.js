/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2148C0",
        secondary: "#3D61CE",
      },
    },
  },
  plugins: [
    require("flowbite/plugin")
  ],
};