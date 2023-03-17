/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      scale: {
        102: "1.02",
      },
      colors: {
        filmpire: {
          link: "#e5e5e5",
          linkhover: "#b3b3b3",
          black: "#141414",
        },
      },
      backgroundImage: {
        "gradient-to-b":
          "linear-gradient(to bottom,rgba(20,20,20,0) 0,rgba(20,20,20,.10) 15%,rgba(20,20,20,.25) 29%,rgba(20,20,20,.62) 66%,rgba(20,20,20,.7) 75%,rgba(20,20,20,.8) 85%, rgba(20,20,20,.9) 93%,#141414 100%);",
        "mobile-gradient-to-b":
          "linear-gradient(to bottom,rgba(20,20,20,0) 0,rgba(20,20,20,.15) 15%,rgba(20,20,20,.3) 30%,rgba(20,20,20,.45) 45%,rgba(20,20,20,.65) 65%, rgba(20,20,20,.75) 80%, #141414 95%);",
        hero: "url('../public/hero.jpg')",
      },
    },
  },
  variants: {
    textFillColor: ["responsive"],
    textStrokeColor: ["responsive"],
    textStrokeWidth: ["responsive"],
    paintOrder: ["responsive"],
  },
  plugins: [
    require("tailwindcss-textshadow"),
    require("tailwind-scrollbar-hide"),
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
};
