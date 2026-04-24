/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7A1E2C",   // deep wine (main theme)
        secondary: "#F8F5F2", // soft background
        accent: "#E8D8D0",    // light beige
      },
      fontFamily: {
        heading: ["'Playfair Display'", "serif"],
        script: ["'Great Vibes'", "cursive"],
        body: ["'Poppins'", "sans-serif"],
      },
      boxShadow: {
        card: "0 10px 30px rgba(0,0,0,0.08)",
      },
      borderRadius: {
        xl2: "20px",
      },
    },
  },
  plugins: [],
};