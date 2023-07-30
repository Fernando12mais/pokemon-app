// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  components: [
    { path: "~/components/atoms", prefix: "atm" },
    { path: "~/components/molecules", prefix: "mol" },
    { path: "~/components/organisms", prefix: "org" },
    { path: "~/components/templates", prefix: "tmp" },
    { path: "~/assets/icons", prefix: "icon" },
  ],

  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap",
        },
      ],
    },
  },
});
