// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  css: ["primeicons/primeicons.css", "~/assets/tailwind.css"],
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  app: {
    head: {
      htmlAttrs: { lang: "en" },
      title: "Efegi Edisemi — Frontend Engineer",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#07070a" },
        {
          name: "description",
          content:
            "Efegi Edisemi is a frontend engineer building fast, thoughtful and immersive web experiences with Vue, Nuxt, React and TypeScript.",
        },
        { property: "og:title", content: "Efegi Edisemi — Frontend Engineer" },
        {
          property: "og:description",
          content: "Interfaces you want to touch. Selected work, experience and contact.",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: "/image.jpeg" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      link: [
        { rel: "icon", href: "/favicon.ico" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@300;400;500;600;700&display=swap",
        },
      ],
    },
  },
});
