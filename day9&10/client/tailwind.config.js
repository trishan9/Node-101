/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter']
      },
      colors: {
        dark: "#45474B",
        light: "#F5F7F8",
        secondary: "#F4CE14",
        primary: "#495E57"
      }
    },
  },
  plugins: [],
}

