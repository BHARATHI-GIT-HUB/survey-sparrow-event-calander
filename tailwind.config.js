/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        meeting: "#4ade80",
        appointment: "#4ade80",
        reminder: "#facc15",
        task: "#a78bfa",
      },
    },
  },
  plugins: [],
};
