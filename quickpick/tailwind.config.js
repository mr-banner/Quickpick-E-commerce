/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        drop1: "drop 1s ease-in-out infinite",
        drop2: "drop 1.2s ease-in-out infinite",
        drop3: "drop 1.4s ease-in-out infinite",
      },
      keyframes: {
        drop: {
          "0%": { transform: "translateY(-100px)", opacity: 1 },
          "80%": { transform: "translateY(20px)", opacity: 0.8 },
          "100%": { transform: "translateY(60px)", opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
