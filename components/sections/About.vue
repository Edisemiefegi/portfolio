<template>
  <div class="h-full pt-0 pb-10 md:pt-10">
    <div class="overflow-hidden space-y-16 relative">
      <div class="text-center space-y-4">
        <h1 class="md:text-5xl text-2xl font-bold">My Journey</h1>
        <p class="text-gray-700 dark:text-gray-400 max-w-3xl mx-auto">
          I’m a frontend developer focused on building clean, responsive,
          user-first interfaces. I use Vue, Nuxt, React and Tailwind to turn
          ideas into web experiences that work — fast, accessible, and honest.
        </p>
      </div>

      <div class="lg:space-y-16 space-y-8 w-full relative h-fit">
        <!-- Vertical timeline line -->
        <div
          data-aos="fade-up"
          data-aos-duration="1500"
          data-aos-easing="linear"
          class="absolute rounded-full top-0 left-2 lg:left-1/2 transform lg:-translate-x-1/2 h-full w-1 bg-[#151D2F]"
        ></div>

        <!-- card loop -->
        <div
          v-for="(card, index) in cards"
          :key="card.title + card.year"
          class="relative flex items-center gap-2 ml-5 lg:ml-0"
          :class="index % 2 === 0 ? 'lg:justify-start' : 'lg:justify-end'"
        >
          <div
            :data-aos="card.aos"
            class="bg-white dark:bg-gray-800 w-full dark:text-white !transition-all duration-200 transform scale-90 hover:scale-100 rounded-xl hover:shadow-lg border shadow-sm border-gray-200 dark:border-gray-600 p-6 space-y-2 lg:max-w-lg"
            :class="index % 2 === 0 ? 'lg:mr-auto' : 'lg:ml-auto'"
          >
            <p class="md:text-2xl text-xl font-bold">{{ card.year }}</p>
            <p class="md:text-xl text-lg font-semibold">{{ card.title }}</p>
            <p class="text-gray-600 md:text-normal text-sm dark:text-gray-400">
              {{ card.text }}
            </p>
          </div>

          <div
            class="absolute lg:left-1/2 md:transform -top-6 lg:top-0 -left-6 lg:-translate-x-1/2 mb-4 md:mb-0 bg-gray-800 border-4 border-white w-14 h-14 rounded-full flex items-center justify-center z-10"
          >
            <i :class="card.icon" class="pi text-white text-xl"></i>
          </div>
        </div>
      </div>

      <!-- beyound the code -->
      <div class="flex h-full items-center justify-center">
        <div
          data-aos="flip-left"
          class="p-8 bg-white border border-gray-200 dark:border-gray-600 dark:bg-gray-800 !transition-all duration-200 transform scale-90 hover:scale-100 shadow-md rounded-md space-y-4 w-xl text-center"
        >
          <p class="font-bold text-2xl">Beyound the code</p>
          <p class="text-gray-600 dark:text-gray-400 text-start">
            I'm a curious mind and a lifelong learner. Outside of coding, I'm a
            game lover and a big fan of K-Dramas — there’s nothing like a good
            storyline to unwind and recharge. I enjoy exploring design trends,
            sketching ideas, and diving into tech content that challenges my
            thinking. Whether I’m mentoring someone new to tech or collaborating
            on creative ideas, I thrive where curiosity, creativity, and impact
            meet. ☕ 📸 🚀 🎮 🌱
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const cards = ref([
  {
    aos: "fade-right",
    title: "OpenProdkt LLC – Software Developer (Part-time)",
    text: "Contributing to a greenfield cloud-native platform for small enterprises. Designing scalable components, maintaining high availability, and ensuring observability using modern tooling.",
    year: "Mar 2025 – Present",
    icon: "pi-briefcase",
    side: "left",
  },

  {
    aos: "fade-left",
    title: "Casely – Frontend Engineer",
    text: "Built and optimized front-end components for a legal tech platform using React, Tailwind, and TypeScript.",
    year: "Nov 2024 – July 2025",
    icon: "pi-briefcase",
    side: "right",
  },
  {
    aos: "fade-right",
    title: "Ogilvista – Frontend Engineer ",
    text: "Enhanced advertising tech platforms using Vue.js. Collaborated on responsive layouts and cross-platform UI improvements.",
    year: "Sep 2024 – Oct 2024",
    icon: "pi-briefcase",
    side: "left",
  },
  {
    aos: "fade-left",
    title: "Goofer Food – Frontend Engineer",
    text: "Improved UI consistency by building reusable components and aligning frontend deliverables with team goals.",
    year: "Oct 2022 – Jan 2023",
    icon: "pi-briefcase",
    side: "right",
  },
  {
    aos: "fade-right",
    title: "Freelance Journey",
    text: "Developed escrow and fundraising applications using Vue. Collaborated with design teams using Figma to deliver intuitive user experiences.",
    year: "2021 ",
    icon: "pi-briefcase",
    side: "left",
  },
]);
</script>

<style lang="scss" scoped></style>
