<template>
  <div class="md:space-y-8  py-10 relative">
    <div class="text-center space-y-4">
      <h1 class="md:text-5xl text-2xl font-bold">Featured Projects</h1>
      <p class="text-gray-700 dark:text-gray-400">
        Click to explore my latest creations...
      </p>
    </div>

    <div class="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 p-6 md:p-0">
      <ProjectCard
        v-for="(card, index) in cards"
        data-aos="fade-up"
        data-aos-duration="300"
        :data-aos-delay="index * 120"
        :content="card"
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
import { useAdmin } from "~/composable/useAdmin";

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
    image: "/project/helpmebook.png",
    title: "HelpMeBook – Hotel Booking Platform",
    text: "A hotel booking platform connecting users with hotels through a guided, preference-based experience with role-based dashboards.",
    description:
      "A third-party hotel booking platform with guided user flows, partner dashboards, and real-time booking interactions.",
    button: ["React.js", "Typescript", "Tailwind CSS", "..."],
    subheading: "Role: Frontend Developer",
    learning: [
      "Built structured booking flows based on user preferences like budget and stay needs",
      "Designed role-based dashboards for admins and hotel partners",
      "Handled dynamic UI states for multi-step booking interactions",
    ],
    challenge: [
      "Managing complex booking states across multiple steps",
      "Designing scalable dashboards for different user roles",
      "Ensuring smooth UX across devices",
    ],
    stack: ["React.js", "Typescript", "Tailwind CSS", ],
    url: "http://helpmebook.com.ng/",
    githubLink: "",
  },

  {
    delay: "350",
    id: 2,
    image: "/project/moments.png",
    title: "Moments – AI Date Planning Platform",
    text: "An AI-powered platform for creating and sharing personalized date experiences with timelines, real place suggestions, and custom letters.",
    description:
      "A date planning platform featuring AI-generated ideas, timelines, and shareable invitations with personalized letter writing.",
    button: ["React.js", "Typescript", "Tailwind CSS", "..."],
    subheading: "Role: Frontend Developer",
    learning: [
      "Integrated AI-driven features for generating date ideas and place suggestions",
      "Designed interactive timelines for structuring date experiences",
      "Built shareable invitation flows with personalized letter features",
    ],
    challenge: [
      "Designing engaging UX for personalized interactions",
      "Handling dynamic content across timelines and invitations",
      "Balancing feature complexity with clean UI",
    ],
    stack: ["React.js", "Typescript", "Tailwind CSS", "AI"],
    url: "https://momentsblues.vercel.app/",
    githubLink: "https://github.com/Edisemiefegi/moments",
  },

  {
    delay: "400",
    id: 3,
    image: "/project/ediwise.png",
    title: "EdiWise – Personal Finance Dashboard",
    text: "A finance dashboard helping users track income, expenses, and net worth with real-time insights and interactive charts.",
    description:
      "A finance dashboard to track income, expenses, and net worth with real-time insights.",
    button: ["Next.js", "TypeScript", "Firebase", "Tailwind CSS"],
    subheading: "Role: Frontend Developer",
    learning: [
      "Used Next.js for performance optimization and rendering",
      "Applied TypeScript for scalable and maintainable code",
      "Built interactive chart components for financial data",
    ],
    challenge: [
      "Ensuring accurate financial calculations",
      "Optimizing performance for large datasets",
      "Designing intuitive financial UI",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase"],
    url: "https://ediwise.vercel.app/",
    githubLink: "https://github.com/Edisemiefegi/ediwise",
  },

  {
    delay: "450",
    id: 4,
    image: "/project/campus-connect.png",
    title: "Campus Connect – University Social Network",
    text: "A social platform for students to connect, collaborate, and share updates through forums and discussions.",
    description:
      "A social networking platform for university communities with profiles, forums, and structured discussions.",
    button: ["Nuxt 3", "Pinia", "Tailwind", "..."],
    subheading: "Role: Lead Frontend Developer",
    learning: [
      "Built nested layouts and routing with Nuxt 3",
      "Implemented authentication and protected routes",
      "Designed forum-style interaction flows",
    ],
    challenge: [
      "Managing nested layouts and dynamic content",
      "Handling authentication and navigation guards",
      "Maintaining UI clarity with multiple features",
    ],
    stack: ["Nuxt 3", "Tailwind CSS", "Pinia", "Firebase"],
    url: "https://campus-connect-tyzz.onrender.com",
    githubLink: "https://github.com/Edisemiefegi/campus-connect",
  },

  {
    delay: "500",
    id: 5,
    image: "/project/edimov.png",
    title: "EdiMov – Movie Explorer",
    text: "A movie platform displaying trending and popular content using API integration and dynamic UI.",
    description:
      "A movie platform that fetches and displays trending and top-rated content.",
    button: ["Vue.js", "Firebase", "Tailwind", "..."],
    subheading: "Role: Lead Frontend Developer",
    learning: [
      "Integrated external APIs efficiently",
      "Handled dynamic routing and state",
      "Designed responsive UI layouts",
    ],
    challenge: [
      "Managing large data display cleanly",
      "Handling loading states and errors",
      "Ensuring responsive design",
    ],
    stack: ["Vue.js", "Pinia", "Tailwind CSS", "API", "Firebase"],
    url: "https://edimov.onrender.com",
    githubLink: "https://github.com/Edisemiefegi/edimov",
  },

  {
    delay: "550",
    id: 6,
    image: "/project/instaclone.png",
    title: "InstaClone – Social Media UI",
    text: "A frontend clone of Instagram focusing on UI interactions and component-based architecture.",
    description:
      "A social media UI clone focused on layout accuracy and reusable components.",
    button: ["Vue.js", "Firebase", "Tailwind", "..."],
    subheading: "Role: Frontend Developer",
    learning: [
      "Practiced component-driven architecture",
      "Built responsive layouts",
      "Improved UI consistency",
    ],
    challenge: [
      "Achieving pixel-perfect UI",
      "Handling interactive elements",
      "Maintaining reusable components",
    ],
    stack: ["Vue.js", "Tailwind CSS", "Firebase", "Pinia"],
    url: "https://instaclone-ni86.onrender.com",
    githubLink: "https://github.com/Edisemiefegi/instaclone",
  },

  {
    delay: "600",
    id: 7,
    image: "/project/edirecipes.png",
    title: "EdiRecipe – Smart Recipe Finder",
    text: "A recipe discovery platform with filtering by category and ingredients.",
    description:
      "A recipe platform focused on search and filtering.",
    button: ["Vue.js", "Firebase", "Tailwind", "..."],
    subheading: "Role: Frontend Developer",
    learning: [
      "Built filtering logic",
      "Managed reactive state",
      "Designed responsive UI",
    ],
    challenge: [
      "Efficient filtering without reload",
      "Handling missing data",
      "Maintaining UI consistency",
    ],
    stack: ["Vue.js", "Tailwind CSS", "Firebase", "Pinia"],
    url: "https://recipie-app-556v.onrender.com",
    githubLink: "https://github.com/Edisemiefegi/recipie-app",
  },
]);

const { listProjects } = useAdmin();

const projects = ref([]);

onMounted(async () => {
  const res = await listProjects();
  console.log(res, "sssj");

  const allProject = res.map((p) => ({
    ...p,
    ref: p.$id,
    image: storage.getFileDownload({
      bucketId: "projectImages",
      fileId: p.image,
    }),
  }));

  projects.value = allProject.filter((e) => e.status == "published");

  console.log(projects.value, "projects ");
});
</script>

<style lang="scss" scoped></style>
