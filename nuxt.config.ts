// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      // titleTemplate: "%s - Parkinson's Aidnet",
      link: [
        { rel: "icon", type: "image/x-icon", href: "/Parkinson.ico" },
        {
          rel: "stylesheet",
          href: "https://site-assets.fontawesome.com/releases/v6.5.1/css/all.css",
        },
        {
          rel: "stylesheet",
          href: "https://site-assets.fontawesome.com/releases/v6.5.1/css/sharp-thin.css",
        },
        {
          rel: "stylesheet",
          href: "https://site-assets.fontawesome.com/releases/v6.5.1/css/sharp-solid.css",
        },
        {
          rel: "stylesheet",
          href: "https://site-assets.fontawesome.com/releases/v6.5.1/css/sharp-regular.css",
        },
        {
          rel: "stylesheet",
          href: "https://site-assets.fontawesome.com/releases/v6.5.1/css/sharp-light.css",
        },
      ],
    },
  },
  devtools: { enabled: true },
  css: [
    // "~/assets/css/all.min.css",
    "normalize.css",
    "bootstrap/dist/css/bootstrap.min.css",
    "animate.css",
    "vue3-toastify/dist/index.css",
    "~/assets/css/main.scss",
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/css/_colors.scss" as *;',
        },
      },
    },
  },
  modules: [
    "@nuxtjs/google-fonts",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "nuxt-vue3-google-signin",
  ],
  imports: {
    dirs: ["store"],
  },
  plugins: ["~/plugins/axios"],
  googleFonts: {
    families: {
      "Barlow Semi Condensed": {
        wght: [300, 400, 500, 600, 700, 800],
      },
    },
  },
  googleSignIn: {
    clientId:
      "35715185455-0k34k8crs02r9btlvf0n639j3s36sl9j.apps.googleusercontent.com",
  },
});
