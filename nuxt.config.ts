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
    "@digital-retex/twind-design-tokens",
    '@nuxt/test-utils/module',
  ],
  twindDesignTokens: {
    output: {
      tailwindImport: false,
      destination: "assets/css/tokens.css",
      transforms: {
        tailwind: [
          { from: "color-text", to: "text-color" },
          { from: "color-border", to: "border-color" },
          { from: "font-line-height", to: "leading" },
          { from: "font-size", to: "text" },
          { from: "font-family", to: "font" },
        ],
      },
    },
    tokens: {
      theme: {
        isMultiTheme: false,
      },
      breakpoint: {
        screens: {
          sm: 375,
          md: 768,
          lg: 1024,
          xl: 1280,
        },
      },
    },
  },
  css: ["/assets/css/main.css"],
  colorMode: {
    preference: "light",
  },

  compatibilityDate: "2025-03-21",
  vite: {
    plugins: [tailwindcss()],
  },
});
