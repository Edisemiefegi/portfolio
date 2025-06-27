// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";


export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  css: ['primeicons/primeicons.css',   '~/assets/tailwind.css'],
  devtools: { enabled: true },
    modules: ['@nuxtjs/tailwindcss', 'nuxt-aos'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})