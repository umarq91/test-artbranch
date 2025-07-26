/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: {
          100: "#a8a8a8",
          200: "#ffffff",
          300: "#f5f3ee",
          400: "#F5F2ED",
          500: "#E1DDD2",
          600: "#FFE6B5",
        },
        secondary: {
          100: "#131114",
          200: "#000000",
        },
      },

      backgroundColor: {
        primary: {
          100: "#FFE6B5",
          200: "#ffe6b5",
          300: "#f5f3ee",
          400: "#e2c268",
          500: "#a8a8a8",
          600: "#e6e2dc",
          700: "#91908e",
          800: "#f1ede7",
          900: "#91908e",
          1000: "#E1DDD2",
          1100: "#F5F2ED",
          1200: "#D9D9D9",
          1300: "#f3f4f6",
          1400: "#ffffff",
          1500: "#EDEAE4",
          1600: "#e2e2e2",
        },
        secondary: {
          100: "#131114",
          200: "#000000",
        },
      },

      border: {
        primary: {
          100: "#e6e2dc",
          200: "#E4E0D5",
          300: "#d1d5db",
          400: "#fef4f5",
        },
      },
    },
  },
  plugins: [],
};
