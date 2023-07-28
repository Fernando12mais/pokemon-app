/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./assets/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  safelist: [
    {
      pattern: /pokemon/,
    },
  ],

  theme: {
    extend: {
      animation: {
        comeFromTop: "comeFromTop 1s ease-out forwards",
        comeFromBottom: "comeFromBottom 1s ease-out forwards",
        fadeIn: "fadeIn .4s ease-out forwards",
      },
      fontFamily: {
        poppins: "'Poppins', sans-serif",
      },

      colors: {
        identity: {
          primary: "#c10d0d",
        },
        action: "#212121",
        pokemon: {
          bug: "#A7B723",
          dark: "#75574C",
          dragon: "#7037FF",
          electric: "#F9CF30",
          fairy: "#E69EAC",
          fighting: "#C12239",
          fire: "#F57D31",
          flying: "#A891EC",
          ghost: "#70559B",
          normal: "#AAA67F",
          grass: "#74CB48",
          ground: "#DEC16B",
          ice: "#9AD6DF",
          poison: "#A43E9E",
          psychic: "#FB5584",
          rock: "#B69E31",
          steel: "#B7B9D0",
          water: "#6493EB",
        },
        grayscale: {
          dark: "#212121",
          medium: "#666666",
          light: "#E0E0E0",
          background: "#EFEFEF",
          white: "#FFFFFF",
        },
      },

      boxShadow: {
        "inner-2-dp": "0px 1px 3px 1px rgba(0, 0, 0, 0.40) inset",
        "2-dp": "0px 1px 3px 1px rgba(0, 0, 0, 0.25)",
        "6-dp": "0px 3px 12px 3px rgba(0, 0, 0, 0.40)",
      },
    },
  },
  plugins: [
    /** @type {import('tailwindcss/types/config').PluginCreator} */
    ({ addUtilities }) => {
      addUtilities({
        ".headline": {
          "@apply text-4xl": {},
        },

        ".subtitle-3": {
          "@apply text-xs leading-4": {},
          "@screen md": {
            "@apply text-base": {},
          },
          "@screen lg": {
            "@apply text-lg": {},
          },
        },
        ".body-1": {
          "@apply text-sm leading-4": {},
          "@screen md": {
            "@apply text-base": {},
          },
          "@screen lg": {
            "@apply text-lg": {},
          },
        },

        ".body-2": {
          "@apply text-xs leading-4": {},
          "@screen sm": {
            "@apply text-sm": {},
          },
          "@screen lg": {
            "@apply text-base": {},
          },
        },

        ".is-pinned": {
          "@apply bg-action p-4 duration-75 sticky top-[-1px] z-20": {},
        },
      });
    },
    { "tailwindcss/nesting": {} },
  ],
};
