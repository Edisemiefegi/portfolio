<template>
  <div class="h-screen w-full relative">
    <div class="flex container mx-auto md:pt-20 xl:px-0 px-4 h-full">
      <div
        class="z-20 flex-col flex w-full gap-10 justify-center items-center text-center"
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
          class="text-gray-600 dark:text-gray-400 md:text-lg text-normal font-medium w-full md:w-6/12 text-center"
        >
          Frontend Developer crafting immersive digital experiences with code,
          creativity, and a touch of magic ✨
        </p>

        <div
          class="flex z-20 gap-6 md:flex-row flex-col items-center"
          data-aos-duration="1000"
          data-aos="fade-up"
        >
          <Button>
            <a href="#projects">Explore My Work</a>
          </Button>
          <Button
            :bg="'bg-white'"
            :text-color="'text-black'"
            :border="'border-gray-300 border '"
          >
            <a href="#contact">Let's Build Together</a>
          </Button>
        </div>

        <div class="flex gap-8 z-20">
          <a
            v-for="icon in icons"
            :key="icon.name"
            :href="icon.link"
            target="_blank"
            class="border-gray-400 hover:animate-spin cursor-pointer border w-14 h-14 flex justify-center items-center rounded-full"
          >
            <i :class="icon.name" class="pi text-2xl cursor-pointer"></i>
          </a>
        </div>
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
