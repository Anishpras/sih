/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2148C0",
        secondary: "#3D61CE",
        primaryWhite:"#F4F7FE",
        hoverWhite:"#E2E8F0",
        darkSecondary:"#313957",
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
