<template>
  <div class="h-screen md:p-0 p-8 w-full relative">
    <div
      class="flex z-20 flex-col gap-10 justify-center h-full items-center text-center"
    >
      <h1 data-aos="zoom-out" class="md:text-7xl text-5xl font-bold">
        Efegi Edisemi
      </h1>
      <h2
        data-aos-duration="1000"
        data-aos="zoom-out"
        class="md:text-4xl text-2xl font-thin"
      >
        I turn ideas into interfaces you want to touch
      </h2>
      <p
        data-aos-duration="1000"
        data-aos="zoom-out"
        class="text-gray-600 md:text-lg text-normal font-medium w-full md:w-6/12 text-center"
      >
        Frontend Developer crafting immersive digital experiences with code,
        creativity, and a touch of magic ✨
      </p>
      <div
        class="flex z-30 gap-6 md:flex-row flex-col"
        data-aos-duration="1000"
        data-aos="fade-up"
      >
        <a
          href="#projects"
          class="px-8 py-3 rounded-md cursor-pointer bg-black text-white text-lg w-fit"
          >Explore My Work</a
        >

        <a
          href="#contact"
          class="px-8 py-3 text-lg bg-white rounded-md cursor-pointer text-black w-fit border-gray-300 border"
        >
          Let's Build Together</a
        >
      </div>

      <div class="flex gap-8 z-20">
        <a
          v-for="icon in icons"
          :key="icon.name"
          :href="icon.link"
          target="_blank"
          class="border-gray-400 cursor-pointer border w-14 h-14 flex justify-center items-center rounded-full"
        >
          <i :class="icon.name" class="pi text-2xl cursor-pointer"></i>
        </a>
      </div>
    </div>

    <div class="w-full h-full absolute top-0 left-0 overflow-hidden">
      <Circle />
    </div>
  </div>
</template>

<script setup>
const icons = ref([
  {
    name: "pi-github",
    link: "https://github.com/Edisemiefegi",
  },
  {
    name: "pi-linkedin",
    link: "https://linkedin.com/in/efegi-edisemi",
  },
  {
    name: "pi-envelope",
    link: "mailto:edisemiefegi@gmail.com",
  },
]);
</script>

<style lang="scss" scoped></style>
