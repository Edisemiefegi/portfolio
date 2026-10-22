<template>
  <section id="skills" class="py-24 md:py-36">
    <div class="mx-auto max-w-6xl px-4 md:px-8">
      <SiteSectionTitle index="04" eyebrow="Stack" aside="The tools I reach for to take an idea from Figma to production.">
        My <span class="font-serif italic text-muted">toolkit</span>.
      </SiteSectionTitle>
    </div>

    <!-- infinite marquee -->
    <div class="relative mb-16 overflow-hidden border-y border-line py-6 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      <div class="marquee flex w-max gap-10 whitespace-nowrap">
        <span v-for="(s, i) in [...skills, ...skills]" :key="i" class="flex items-center gap-10 text-4xl font-medium tracking-tight md:text-6xl" :class="i % 2 ? 'font-serif font-normal italic text-muted' : ''">
          {{ s.name }} <span class="text-2xl text-accent">✦</span>
        </span>
      </div>
    </div>

    <div class="mx-auto grid max-w-6xl gap-4 px-4 md:grid-cols-3 md:px-8">
      <div v-for="(group, name, i) in grouped" :key="name" v-reveal="i * 100" v-tilt="5" class="spot rounded-3xl p-6 md:p-8">
        <p class="mb-6 font-mono text-xs tracking-widest text-muted uppercase">{{ name }}</p>
        <ul class="flex flex-wrap gap-2">
          <li v-for="s in group" :key="s.name" class="rounded-full border border-line bg-raised px-4 py-2 text-sm transition hover:border-accent hover:text-accent">{{ s.name }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({ skills: Array });
const grouped = computed(() =>
  props.skills.reduce((acc, s) => {
    (acc[s.category || "Other"] ||= []).push(s);
    return acc;
  }, {}),
);
</script>
