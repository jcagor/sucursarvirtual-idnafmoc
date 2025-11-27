/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [],
  theme: {
    extend: {
      spacing: {
        "9/10": "90%",
        "1/5": "20%",
        "1/10": "10%",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      "2md": "870px",
      lg: "1024px",
      "2lg": "1150px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "2500px",
    },
    fontFamily: {
      outfit: ["Outfit"],
    },
    colors: {
      principal: {
        150: "#FFFFFF", //Blanco
        50: "#D8D8D8", //Gris chips
        80: "#05C3DD", //Azul claro logo
        100: "#005EAA", //Azul general
        110: "#DCEDFF", //Azul claro
        120: "#2170B6", //Azul radio
        130: "#EBF0F8", //Gris cards
        180: "#003DA5", // Azul sidebar
        190: "#EBEFF8", // Azul cards
        200: "#F7F8FC", //Fondo pantallas
        250: "#ECECEC", //Gris tarjetas info
        300: "#E7E7E7 ", //Gris Hover
        320: "#777", // Texto gris
        330: "#979797", // Borde inputs
        350: "#333333", //Texto negro
        400: "#C7D2E6", //Gris azulado
        440: "#CCCCCC", // LightGray Placeholder
        450: "#777777", //Gris texto pequeño
        460: "#F2F2F2", //Gris input
        470: "#E8E8E8", //Gris input
        500: "#FD536D", //red trash
        550: "#ECECEC",
        600: "#D7D7D7", //Gris separadores
        650: "#F9FAFB", // Fondo gris body
        680: "#F6F6F6", // Gris
        700: "#97D700", // Verde
        725: "#05C3DD", // Section color
        750: "#01C4AE", // IPS fondo
        800: "#313131A6", //Modal background
        900: "#D1D0D0", //Gris dropzone
        950: "#9EC3FF3D",
      },
    },
  },
};
