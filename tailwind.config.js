/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/**/*.js",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      screens:{
        xs: "320px",
        sm: "375px",
        sml: "500px",
        md: "667px",
        mdl: "768px",
        mdxl: "900px",
        lg: "960px",
        lgl: "1024px",
        xl: "1280px",
        maxscreen: {"max": "666px"},
        maxmobile: {"max": "580px"},
        mobile: {"max": "480px"},
      },
    },
    fontFamily: {
      regular: ["Montserrat-Regular", "Helvetica"],
    },
  },
  plugins: [
    require("flowbite/plugin")
  ],
}
