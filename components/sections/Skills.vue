<template>
  <div class="mx-auto w-11/12 space-y-6">
    <div class="text-center space-y-8">
      <h1 class="md:text-7xl text-4xl font-bold">Tech Stack</h1>
      <p class="text-gray-700">
        Tools and technologies I use to bring ideas to life. Hover over each
        skill to learn more about my experience.
      </p>
    </div>

    <div class="flex flex-wrap gap-8">
      <div
        v-for="skill in skills"
        :key="skill"
        class="p-2 rounded-md bg-gray-100"
      >
        <button
          data-aos="fade-up"
          data-aos-duration="3000"
          :class="`${skill.color} hover:scale-105  p-8 rounded-md flex flex-col justify-center items-center `"
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
      class="flex w-full flex-wrap justify-between gap-3 md:px-20 py-10 items-center"
    >
      <div v-for="item in content" :key="item" class="text-center">
        <p class="text-4xl">{{ item.icon }}</p>
        <p class="text-4xl font-bold">{{ item.number }}</p>
        <p class="text-gray-600">{{ item.text }}</p>
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
  },
  {
    icon: "/stack/vue.png",

    name: "Vue",
    color: "bg-[#437162]",
  },
  {
    icon: "/stack/nuxt.png",

    name: "Nuxt",
    color: "bg-[#33E39B]",
  },
  {
    icon: "/stack/ts.png",

    name: "Typescript",
    color: "bg-[#5A93D1]",
  },
  {
    icon: "/stack/react.png",

    name: "React",
    color: "bg-[#81E1FC]",
  },
  {
    icon: "/stack/figma.png",

    name: "Figma",
    color: "bg-[#FD954C]",
  },
  {
    icon: "/stack/github.png",

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
