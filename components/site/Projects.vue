<template>
  <section id="projects" class="mx-auto max-w-6xl px-4 py-24 md:px-8 md:py-36">
    <SiteSectionTitle index="03" eyebrow="Selected work" aside="Click any project for the full story — role, challenges and what I learned.">
      Things I’ve <span class="font-serif italic text-muted">built</span>.
    </SiteSectionTitle>

    <div v-if="filters.length > 2" v-reveal class="mb-8 flex flex-wrap gap-2">
      <button
        v-for="f in filters"
        :key="f"
        class="rounded-full border px-4 py-1.5 text-sm transition"
        :class="filter === f ? 'border-accent bg-accent text-ink' : 'border-line text-muted hover:text-fg'"
        @click="filter = f"
      >
        {{ f }}
      </button>
    </div>

    <TransitionGroup tag="div" name="grid" class="grid gap-4 md:grid-cols-2">
      <article
        v-for="(p, i) in visible"
        :key="p.$id || p.title"
        v-tilt="5"
        data-cursor="View"
        class="spot group cursor-pointer overflow-hidden rounded-3xl"
        :class="i % 3 === 0 ? 'md:col-span-2' : ''"
        tabindex="0"
        @click="selected = p"
        @keydown.enter="selected = p"
      >
        <div class="relative overflow-hidden bg-raised" :class="i % 3 === 0 ? 'aspect-[16/9] md:aspect-[21/9]' : 'aspect-[16/10]'">
          <img
            :src="p.image"
            :alt="p.title"
            loading="lazy"
            class="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.04]"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent" />
          <span class="absolute top-4 left-4 rounded-full bg-ink/70 px-3 py-1 font-mono text-[10px] tracking-widest uppercase backdrop-blur">
            {{ String(i + 1).padStart(2, "0") }}
          </span>
        </div>
        <div class="flex items-start justify-between gap-4 p-6 md:p-8">
          <div>
            <h3 class="mb-2 text-2xl font-medium md:text-3xl">{{ p.title }}</h3>
            <p class="mb-4 line-clamp-2 max-w-xl text-muted">{{ p.description }}</p>
            <div class="flex flex-wrap gap-2">
              <span v-for="s in p.stack" :key="s" class="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted">{{ s }}</span>
            </div>
          </div>
          <span class="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line transition group-hover:rotate-[-45deg] group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
            <i class="pi pi-arrow-right text-sm" />
          </span>
        </div>
      </article>
    </TransitionGroup>

    <SiteProjectDialog :project="selected" @close="selected = null" />
  </section>
</template>

<script setup>
const props = defineProps({ projects: Array });
const selected = ref(null);
const filter = ref("All");

// filter chips from the most used technologies
const filters = computed(() => {
  const count = {};
  props.projects.flatMap((p) => p.stack || []).forEach((s) => (count[s] = (count[s] || 0) + 1));
  const top = Object.entries(count).filter(([, n]) => n > 1).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([s]) => s);
  return ["All", ...top];
});

const visible = computed(() => (filter.value === "All" ? props.projects : props.projects.filter((p) => p.stack?.includes(filter.value))));
</script>

<style scoped>
.grid-move,
.grid-enter-active,
.grid-leave-active {
  transition: all 0.5s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.grid-enter-from,
.grid-leave-to {
  opacity: 0;
  transform: scale(0.96);
}
.grid-leave-active {
  position: absolute;
  visibility: hidden;
}
</style>
