/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      boxShadow: {
        "text-bottom": "0 4px 6px rgba(0, 0, 0, 0.2)", // Customize shadow as needed
      },
    },
  },

  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          ".text-shadow": {
            textShadow: "0 4px 6px rgba(0, 0, 0, 0.9)", // Customize shadow as needed
          },
        },
        ["responsive", "hover"]
      );
    },
  ],
};
