<template>
  <div class="h-full">
    <div class="mx-auto w-11/12 overflow-hidden space-y-10 py-16 relative">
      <div class="text-center space-y-8">
        <h1 class="md:text-7xl text-4xl font-bold">My Journey</h1>
        <p class="text-gray-700">
          I’m a frontend developer focused on building clean, responsive,
          user-first interfaces. I use Vue, Nuxt, React and Tailwind to turn
          ideas into web experiences that work — fast, accessible, and honest.
        </p>
      </div>

      <div class="space-y-16 w-full relative h-fit">
        <!-- Vertical timeline line -->
        <div
          data-aos="fade-up"
          data-aos-duration="1500"
          data-aos-easing="linear"
          class="absolute rounded-full top-0 left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#151D2F]"
        ></div>

        <!-- card loop -->
        <div
          v-for="(card, index) in cards"
          :key="card.title + card.year"
          class="relative flex items-center"
          :class="index % 2 === 0 ? 'justify-start' : 'justify-end'"
        >
          <div
            :data-aos="card.aos"
            class="bg-white ease-out hover:scale-105 rounded-xl hover:shadow-lg border shadow-sm border-gray-200 p-6 space-y-4 w-full max-w-lg"
            :class="index % 2 === 0 ? 'mr-auto' : 'ml-auto'"
          >
            <p class="text-4xl font-bold">{{ card.year }}</p>
            <p class="text-xl font-semibold">{{ card.title }}</p>
            <p class="text-gray-600">{{ card.text }}</p>
          </div>

          <div
            class="absolute left-1/2 transform -translate-x-1/2 bg-gray-800 border-4 border-white w-14 h-14 rounded-full flex items-center justify-center z-10"
          >
            <i :class="card.icon" class="pi text-white text-xl"></i>
          </div>
        </div>
      </div>

      <!-- beyound the code -->
      <div class="flex h-full items-center justify-center">
        <div
          data-aos="flip-left"
          class="p-8 bg-white hover:scale-105 shadow-md rounded-md space-y-4 w-xl text-center"
        >
          <p class="font-bold text-2xl">Beyound the code</p>
          <p class="text-gray-600">
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
    title: "Freelance Journey",
    text: "Developed escrow and fundraising applications using Vue, Nuxt, and TypeScript. Collaborated with design teams using Figma to deliver intuitive user experiences.",
    year: "2021 ",
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
    title: "Ogilvista – Frontend Engineer ",
    text: "Enhanced advertising tech platforms using Vue.js. Collaborated on responsive layouts and cross-platform UI improvements.",
    year: "Sep 2024 – Oct 2024",
    icon: "pi-briefcase",
    side: "left",
  },
  {
    aos: "fade-left",
    title: "Casely – Frontend Engineer",
    text: "Built and optimized front-end components for a legal tech platform using React, Tailwind, and TypeScript.",
    year: "Nov 2024 – Present",
    icon: "pi-briefcase",
    side: "right",
  },
  {
    aos: "fade-right",
    title: "OpenProdkt LLC – Software Developer (Remote)",
    text: "Contributing to a greenfield cloud-native platform for small enterprises. Designing scalable components, maintaining high availability, and ensuring observability using modern tooling.",
    year: "Mar 2025 – Present",
    icon: "pi-briefcase",
    side: "left",
  },
]);
</script>

<style lang="scss" scoped></style>
