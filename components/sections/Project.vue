<template>
  <div class="mx-auto w-11/12 space-y-6 relative">
    <div class="text-center space-y-8">
      <h1 class="md:text-7xl text-4xl font-bold">Featured Projects</h1>
      <p class="text-gray-700">
        Swipe, click, or drag to explore my latest creations...
      </p>
    </div>

    <div class="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
      <Card
        :content="card"
        v-for="card in cards"
        :key="card"
        @click="openModal(card)"
      />
    </div>

    <div class="w-full absolute h-full">
      <Modal v-if="isOpen && data" :content="data" @close="isOpen = false" />
    </div>
  </div>
</template>

<script setup>
const isOpen = ref(false);
const data = ref(null);

const openModal = (card) => {
  data.value = card;
  isOpen.value = true;
  console.log(data.value, isOpen.value, "test");
};

onMounted(() => {
  isOpen.value = false;
  data.value = null;
});

const cards = ref([
  {
    id: 1,
    image: "/project/edimov.png",
    heading: "EdiMov – Movie Explorer",
    text: "A dynamic movie platform that fetches and displays trending, now-playing, and top-rated movies using a clean, modern interface. Built with Vue.js and TMDB API integration.",
    summary:
      "A dynamic movie platform that fetches and displays trending, now-playing, and top-rated movies using a clean, modern interface. ",
    button: ["Vue.js", "Api", "tailwind"],
    subheading: "Role: Lead Frontend Developer",
    learnings: [
      "Integrated external APIs and handled asynchronous data efficiently",
      " Implemented dynamic routing and state management",
      " Designed user-friendly, responsive layouts",
    ],
    challenge: [
      "Ensured smooth loading of movie data with error handling",
      "Maintained clean UI while displaying large amounts of content",
      "Handled image fallbacks and responsive cards",
    ],
    stack: ["Vue.js", "Pinia", "Tailwind CSS", "TMDB API"],
  },
  {
    id: 2,

    image: "/project/edirecipes.png",
    heading: "EdiRecipe – Smart Recipe Finder",
    button: ["React", "js", "tailwind", "firebase"],

    text: "A movie discovery platform that showcases Now Playing, Popular, and Top Rated movies. Users can explore curated content fetched from a public API with a sleek, responsive UI.",
    summary:
      "A comprehensive analytics dashboard that transforms complex data into beautiful, interdata visualizations.",
    button: ["React", "js", "tailwind", "firebase"],
    subheading: "Role: Lead Frontend Developer",
    learnings: [
      "Integrated external APIs and handled asynchronous data efficiently",
      " Implemented dynamic routing and state management",
      " Designed user-friendly, responsive layouts",
    ],
    challenge: [
      "Ensured smooth loading of movie data with error handling",
      "Maintained clean UI while displaying large amounts of content",
      "Handled image fallbacks and responsive cards",
    ],
    stack: ["Vue.js", "Pinia", "Tailwind CSS", "TMDB API"],
  },
  {
    id: 3,

    image: "/project/campus-connect.png",
    heading: "InstaClone – Social Media Replica",
    text: "A movie discovery platform that showcases Now Playing, Popular, and Top Rated movies. Users can explore curated content fetched from a public API with a sleek, responsive UI.",
    summary:
      "A comprehensive analytics dashboard that transforms complex data into beautiful, interactive visualizations.",
    button: ["React", "js", "tailwind", "firebase"],
    subheading: "Role: Lead Frontend Developer",
    learnings: [
      "Integrated external APIs and handled asynchronous data efficiently",
      " Implemented dynamic routing and state management",
      " Designed user-friendly, responsive layouts",
    ],
    challenge: [
      "Ensured smooth loading of movie data with error handling",
      "Maintained clean UI while displaying large amounts of content",
      "Handled image fallbacks and responsive cards",
    ],
    stack: ["Vue.js", "Pinia", "Tailwind CSS", "TMDB API"],
    button: ["React", "js", "tailwind", "firebase"],
  },
  {
    id: 4,

    image: "/project/instaclone.png",
    heading: "Campus Connect – University Social Platform",
    text: "A movie discovery platform that showcases Now Playing, Popular, and Top Rated movies. Users can explore curated content fetched from a public API with a sleek, responsive UI.",
    summary:
      "A comprehensive analytics dashboard that transforms complex data into beautiful, interactive visualizations.",
    button: ["React", "js", "tailwind", "firebase"],
    subheading: "Role: Lead Frontend Developer",
    learnings: [
      "Integrated external APIs and handled asynchronous data efficiently",
      " Implemented dynamic routing and state management",
      " Designed user-friendly, responsive layouts",
    ],
    challenge: [
      "Ensured smooth loading of movie data with error handling",
      "Maintained clean UI while displaying large amounts of content",
      "Handled image fallbacks and responsive cards",
    ],
    stack: ["Vue.js", "Pinia", "Tailwind CSS", "TMDB API"],
    button: ["React", "js", "tailwind"],
  },
]);
</script>

<style lang="scss" scoped></style>
