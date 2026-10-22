<template>
  <main class="site min-h-screen overflow-x-clip">
    <SitePreloader :name="c.profile.name" />
    <ClientOnly><SiteCursor /></ClientOnly>
    <div class="grain" aria-hidden="true" />
    <div class="fixed top-0 left-0 z-[55] h-0.5 bg-accent" :style="{ width: progress + '%' }" />

    <SiteNav :name="c.profile.name" @palette="palette = true" />
    <SiteHero :profile="c.profile" />
    <SiteAbout :profile="c.profile" :project-count="c.projects.length" :experiences="c.experiences" />
    <SiteExperience :experiences="c.experiences" />
    <SiteProjects :projects="c.projects" />
    <SiteSkills :skills="c.skills" />
    <SiteContact :profile="c.profile" />
    <SiteFooter :name="c.profile.name" />

    <SiteCommandPalette v-model="palette" :profile="c.profile" :projects="c.projects" @toast="showToast" />

    <Transition name="toast">
      <p v-if="toast" class="fixed bottom-6 left-1/2 z-[76] -translate-x-1/2 rounded-full bg-fg px-5 py-2.5 text-sm text-ink">{{ toast }}</p>
    </Transition>
  </main>
</template>

<script setup>
import { useContent } from "~/composable/useContent";

const { content, load } = useContent();
const c = computed(() => content.value);

useHead(() => ({
  title: `${c.value.profile.name} — ${c.value.profile.headline}`,
  bodyAttrs: { style: "background:#07070a" },
}));

const palette = ref(false);
const toast = ref("");
const progress = ref(0);

const showToast = (msg) => {
  toast.value = msg;
  setTimeout(() => (toast.value = ""), 2200);
};

const onScroll = () => {
  const h = document.documentElement.scrollHeight - window.innerHeight;
  progress.value = h > 0 ? (window.scrollY / h) * 100 : 0;
};

onMounted(() => {
  document.documentElement.classList.add("dark");
  window.addEventListener("scroll", onScroll, { passive: true });
  load();
});
onBeforeUnmount(() => window.removeEventListener("scroll", onScroll));
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 10px);
}
</style>
