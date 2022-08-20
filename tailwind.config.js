/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2148C0",
        secondary: "#3D61CE",
      },
      fontFamily: {
        Montserrat: ["Montserrat", "sans-serif"],
        Raleway: ["Raleway", "sans-serif"],
        Recursive: ["Recursive", "sans-serif"],
      }, //end of fontFamily
    },
  },
  plugins: [],
};
