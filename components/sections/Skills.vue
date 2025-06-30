<template>
  <div class="space-y-12 py-12">
    <div class="text-center space-y-4">
      <h1 class="md:text-5xl text-2xl font-bold">Tech Stack</h1>
      <p class="text-gray-700 dark:text-gray-400">
        Tools and technologies I use to bring ideas to life.
      </p>
    </div>

    <div
      class="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-8 mx-auto items-center justify-center"
    >
      <div
        v-for="skill in skills"
        :key="skill"
        class="p-2 w-fit rounded-md bg-gray-100 dark:bg-gray-300"
      >
        <button
          data-aos="fade-up"
          data-aos-duration="300"
          :data-aos-delay="skill.delay"
          :class="`${skill.color} !transition-transform duration-200 transform scale-100 hover:scale-105 w-40 h-32 rounded-md flex flex-col justify-center items-center `"
        >
          <div class="w-10 h-10">
            <img
              :src="skill.icon"
              alt=""
              class="w-full h-full object-contain"
            />
          </div>
          {{ skill.name }}
        </button>
      </div>
    </div>

    <div
      class="flex w-full flex-wrap justify-around gap-3 md:px-20 py-10 items-center"
    >
      <div v-for="item in content" :key="item" class="text-center">
        <p class="md:text-4xl text-2xl">{{ item.icon }}</p>
        <p class="md:text-4xl text-2xl font-bold">{{ item.number }}</p>
        <p class="text-gray-600 dark:text-gray-400">{{ item.text }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const skills = ref([
  {
    icon: "/stack/js.png",
    name: "Javascript",
    color: "bg-[#F9E54B]",
    delay: "300",
  },
  {
    icon: "/stack/vue.png",
    delay: "400",
    name: "Vue",
    color: "bg-[#437162]",
  },
  {
    icon: "/stack/nuxt.png",
    delay: "500",
    name: "Nuxt",
    color: "bg-[#33E39B]",
  },
  {
    icon: "/stack/ts.png",
    delay: "600",
    name: "Typescript",
    color: "bg-[#5A93D1]",
  },
  {
    icon: "/stack/react.png",
    delay: "700",
    name: "React",
    color: "bg-[#81E1FC]",
  },
  {
    icon: "/stack/figma.png",
    delay: "800",
    name: "Figma",
    color: "bg-[#FD954C]",
  },
  {
    icon: "/stack/github.png",
    delay: "900",
    name: "Github",
    color: "bg-[#238765]",
  },
]);

const content = ref([
  {
    icon: "💻",
    number: "3+",
    text: "Years Coding ",
  },
  {
    icon: "🚀",
    number: "50+",
    text: "Projects Built ",
  },
  {
    icon: "📝",
    number: "100K+",
    text: "Lines of Code",
  },
]);
</script>

<style lang="scss" scoped></style>
