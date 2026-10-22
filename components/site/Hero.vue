<template>
  <section id="home" class="relative flex min-h-[100svh] items-end overflow-hidden pb-14 md:items-center md:pb-0">
    <ClientOnly><SiteHeroScene /></ClientOnly>
    <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--color-ink)_80%)]" />

    <div class="relative mx-auto w-full max-w-6xl px-4 md:px-8">
      <p v-reveal class="mb-6 flex items-center gap-3 font-mono text-xs tracking-widest text-muted uppercase">
        <span class="relative flex h-2 w-2">
          <span v-if="profile.available" class="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
          <span class="relative inline-flex h-2 w-2 rounded-full" :class="profile.available ? 'bg-accent' : 'bg-muted'" />
        </span>
        {{ profile.available ? "Available for new projects" : "Currently booked" }}
      </p>

      <h1 class="text-[13vw] leading-[0.9] font-medium tracking-[-0.04em] md:text-[7.5rem]">
        <span v-reveal="100" class="block"><SiteScramble :text="first" :delay="400" /></span>
        <span v-reveal="200" class="block font-serif font-normal italic text-muted">
          <SiteScramble :text="rest" :delay="600" /><span class="text-accent">.</span>
        </span>
      </h1>

      <div class="mt-10 flex max-w-xl flex-col gap-8">
        <p v-reveal="300" class="max-w-md text-lg text-muted md:text-xl">
          <span class="text-fg">{{ profile.headline }}</span> — {{ profile.tagline }}
        </p>

        <div v-reveal="400" class="flex flex-wrap items-center gap-3">
          <a v-magnetic href="#projects" class="group flex items-center gap-2 rounded-full bg-fg px-6 py-3.5 font-medium text-ink">
            View work <i class="pi pi-arrow-down-right text-xs transition group-hover:rotate-[-45deg]" />
          </a>
          <a v-magnetic :href="profile.resume" target="_blank" class="rounded-full border border-line px-6 py-3.5 font-medium transition hover:border-white/30">
            Résumé
          </a>
        </div>
      </div>
    </div>

    <a href="#about" class="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] tracking-widest text-muted uppercase md:flex">
      scroll
      <span class="relative h-10 w-px overflow-hidden bg-line"><span class="scroll-tick absolute inset-x-0 top-0 h-1/2 bg-accent" /></span>
    </a>
  </section>
</template>

<script setup>
const props = defineProps({ profile: Object });
const first = computed(() => props.profile.name.split(" ")[0]);
const rest = computed(() => props.profile.name.split(" ").slice(1).join(" "));
</script>

<style scoped>
.scroll-tick {
  animation: tick 1.8s cubic-bezier(0.6, 0, 0.4, 1) infinite;
}
@keyframes tick {
  from { transform: translateY(-100%); }
  to { transform: translateY(200%); }
}
</style>
