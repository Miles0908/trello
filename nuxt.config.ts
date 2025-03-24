// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxt/test-utils/module",
  ],
  css: ["/assets/styles/vello.css"],

  colorMode: {
    preference: "light",
  },

  compatibilityDate: "2025-03-21",
  vite: {
    plugins: [tailwindcss()],
  },
});
