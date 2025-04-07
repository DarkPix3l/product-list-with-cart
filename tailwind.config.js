/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        //primaryRed: "hsl(14, 86%, 42%)", // it hasn't been recognized
        success: "hsl(159, 69%, 38%)", // Green
        rose2: {
          50: "hsl(20, 50%, 98%)", // Rose-50
          100: "hsl(13, 31%, 94%)", // Rose-100
          300: "hsl(14, 25%, 72%)", // Rose-300
          400: "hsl(7, 20%, 60%)", // Rose-400
          500: "hsl(12, 20%, 44%)", // Rose-500
          900: "hsl(14, 65%, 9%)", // Rose-900
        },
      },
    },
  },
  plugins: [],
};

// Actually, none of them are recognized