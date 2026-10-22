<template>
  <section id="experience" ref="root" class="mx-auto max-w-6xl px-4 py-24 md:px-8 md:py-36">
    <SiteSectionTitle index="02" eyebrow="Experience" aside="Teams and products I’ve helped ship, from early-stage startups to established platforms.">
      Where I’ve <span class="font-serif italic text-muted">worked</span>.
    </SiteSectionTitle>

    <ol class="relative">
      <!-- progress rail -->
      <span class="absolute top-0 bottom-0 left-[7px] w-px bg-line md:left-[calc(25%+7px)]" />
      <span class="absolute top-0 left-[7px] w-px bg-accent md:left-[calc(25%+7px)]" :style="{ height: progress + '%' }" />

      <li
        v-for="(job, i) in experiences"
        :key="job.$id || job.company + job.date"
        v-reveal="i * 60"
        class="group relative grid gap-2 pb-12 pl-10 md:grid-cols-4 md:gap-10 md:pl-0"
      >
        <p class="font-mono text-xs tracking-wider text-muted uppercase md:pt-1.5 md:text-right">{{ job.date }}</p>
        <span class="absolute top-1 left-0 h-[15px] w-[15px] rounded-full border border-line bg-ink transition group-hover:border-accent group-hover:bg-accent md:top-1.5 md:left-[25%]" />
        <div class="md:col-span-3 md:pl-12">
          <h3 class="text-2xl font-medium md:text-3xl">{{ job.company }}</h3>
          <p class="mb-3 text-accent">{{ job.role }}</p>
          <p class="max-w-2xl text-muted">{{ job.summary }}</p>
        </div>
      </li>
    </ol>
  </section>
</template>

<script setup>
defineProps({ experiences: Array });
const root = ref(null);
const progress = ref(0);

const onScroll = () => {
  const r = root.value?.getBoundingClientRect();
  if (!r) return;
  const p = (window.innerHeight * 0.6 - r.top) / r.height;
  progress.value = Math.max(0, Math.min(100, p * 100));
};
onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
});
onBeforeUnmount(() => window.removeEventListener("scroll", onScroll));
</script>
