// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  css: ["primeicons/primeicons.css", "~/assets/tailwind.css"],
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "nuxt-aos"],
  vite: {
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    public: {
      appwriteEndpoint: process.env.APPWRITE_ENDPOINT,
      appwriteProjectId: process.env.APPWRITE_PROJECT_ID,
    },
  },
});
