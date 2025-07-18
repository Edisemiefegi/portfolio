<template>
  <div class="space-y-12 py-10 relative">
    <div class="text-center space-y-4">
      <h1 class="md:text-5xl text-2xl font-bold">Featured Projects</h1>
      <p class="text-gray-700 dark:text-gray-400">
        Swipe, or click to explore my latest creations...
      </p>
    </div>

    <div class="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
      <Card
        data-aos="fade-up"
        data-aos-duration="300"
        :data-aos-delay="card.delay"
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
    delay: "300",

    id: 1,
    image: "/project/edimov.png",
    heading: "EdiMov – Movie Explorer",
    text: "A dynamic movie platform that fetches and displays trending, now-playing, and top-rated movies using a clean, modern interface. Built with Vue.js and TMDB API integration.",
    summary:
      "A dynamic movie platform that fetches and displays trending, now-playing, and top-rated movies using a clean, modern interface. ",
    button: ["Vue.js", "firebase", "tailwind", "..."],
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
    stack: ["Vue.js", "Pinia", "Tailwind CSS", " API", "Firebase"],
    demo: "https://edimov.onrender.com",
    code: "https://github.com/Edisemiefegi/edimov",
  },
  {
    delay: "400",

    id: 2,
    image: "/project/edirecipes.png",
    heading: "EdiRecipe – Smart Recipe Finder",
    text: "A recipe discovery platform that allows users to filter meals by category, ingredient, and location. Designed to simplify cooking inspiration with clean UI and responsive design.",
    summary:
      "A recipe discovery platform that allows users to filter meals by category, ingredient, and location.",
    button: ["Vue.js", "firebase", "Tailwind", "..."],
    subheading: "Role: Frontend Developer",
    learnings: [
      "Built dynamic filtering logic for seamless user experience",
      "Managed reactive state and data binding with Vue",
      "Crafted an intuitive UI with responsive grid layout",
    ],
    challenge: [
      "Ensured filters worked efficiently without reloading",
      "Maintained UI consistency across various devices",
      "Handled incomplete or missing data from recipe sources",
    ],
    stack: ["Vue.js", "Tailwind CSS", "firebase", "Pinia"],
    demo: "https://recipie-app-556v.onrender.com",
    code: "https://github.com/Edisemiefegi/recipie-app",
  },
  {
    delay: "500",

    id: 3,
    image: "/project/instaclone.png",
    heading: "InstaClone – Social Media UI",
    text: "A front-end clone of Instagram's core features, including post feeds, likes, and profile views. Built with component-driven development in Vue.js.",
    summary:
      "A front-end clone of Instagram's UI and interactions with emphasis on component reusability.",
    button: ["Vue.js", "firebase", "Tailwind", "..."],
    subheading: "Role: Frontend Developer",
    learnings: [
      "Replicated modern social media layouts with clean design",
      "Used Vue components to enhance reusability and structure",
      "Practiced responsive design patterns",
    ],
    challenge: [
      "Ensured layout accuracy and pixel-perfect rendering",
      "Handled interactive UI elements like likes and image carousels",
      "Created reusable card and modal components",
    ],
    stack: ["Vue.js", "Tailwind CSS", "firebase", "Pinia"],
    demo: "https://instaclone-ni86.onrender.com",
    code: "https://github.com/Edisemiefegi/instaclone",
  },
  {
    delay: "600",

    id: 4,
    image: "/project/campus-connect.png",
    heading: "Campus Connect – University Social Network",
    text: "A social networking platform built for university communities to connect, share resources, and collaborate. Features include profile creation, forums, and topic-based discussions.",
    summary:
      "A social networking platform for students to connect, collaborate, and share updates in a focused university environment.",
    button: ["Nuxt 3", "Pinia", "Tailwind", "..."],
    subheading: "Role: Lead Frontend Developer",
    learnings: [
      "Built nested layouts and page transitions with Nuxt 3",
      "Implemented dynamic routing and authentication logic",
      "Created forum-like interaction flows for real-world simulation",
    ],
    challenge: [
      "Managed nested layouts and route-based content updates",
      "Ensured authentication flow with navigation guards",
      "Balanced UI simplicity with multiple feature sets",
    ],
    stack: ["Nuxt 3", "Tailwind CSS", "Pinia", "Firebase"],
    demo: "https://campus-connect-tyzz.onrender.com",
    code: "https://github.com/Edisemiefegi/campus-connect",
  },
]);
</script>

<style lang="scss" scoped></style>
