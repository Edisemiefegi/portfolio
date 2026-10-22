<template>
  <Teleport to="body">
    <Transition name="sheet">
      <div v-if="project" class="site fixed inset-0 z-[72] flex items-end justify-center bg-black/70 backdrop-blur-sm md:items-center md:p-6" @click.self="$emit('close')">
        <article class="relative max-h-[92svh] w-full max-w-4xl overflow-y-auto rounded-t-3xl border border-line bg-surface md:rounded-3xl" role="dialog" :aria-label="project.title">
          <button class="absolute top-4 right-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-ink/70 backdrop-blur" aria-label="Close" @click="$emit('close')">
            <i class="pi pi-times text-sm" />
          </button>

          <img :src="project.image" :alt="project.title" class="aspect-[16/9] w-full object-cover object-top" />

          <div class="space-y-10 p-6 md:p-10">
            <header class="space-y-4">
              <p v-if="project.role" class="font-mono text-xs tracking-widest text-accent uppercase">{{ project.role }}</p>
              <h3 class="text-4xl font-medium tracking-tight md:text-5xl">{{ project.title }}</h3>
              <p class="max-w-2xl text-lg text-muted">{{ project.description }}</p>
              <div class="flex flex-wrap gap-2">
                <span v-for="s in project.stack" :key="s" class="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">{{ s }}</span>
              </div>
              <div class="flex flex-wrap gap-3 pt-2">
                <a v-if="project.url" :href="project.url" target="_blank" rel="noopener" class="flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-ink">
                  Visit live site <i class="pi pi-external-link text-xs" />
                </a>
                <a v-if="project.githubLink" :href="project.githubLink" target="_blank" rel="noopener" class="flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm">
                  <i class="pi pi-github" /> Source code
                </a>
              </div>
            </header>

            <div class="grid gap-6 md:grid-cols-2">
              <div v-if="project.challenge?.length" class="rounded-2xl border border-line p-6">
                <p class="mb-4 font-mono text-xs tracking-widest text-muted uppercase">Challenges solved</p>
                <ul class="space-y-3">
                  <li v-for="c in project.challenge" :key="c" class="flex gap-3"><span class="text-accent">→</span>{{ c }}</li>
                </ul>
              </div>
              <div v-if="project.learning?.length" class="rounded-2xl border border-line p-6">
                <p class="mb-4 font-mono text-xs tracking-widest text-muted uppercase">What I did &amp; learned</p>
                <ul class="space-y-3">
                  <li v-for="l in project.learning" :key="l" class="flex gap-3"><span class="text-violet">✦</span>{{ l }}</li>
                </ul>
              </div>
            </div>
          </div>
        </article>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const props = defineProps({ project: Object });
const emit = defineEmits(["close"]);

const onKey = (e) => e.key === "Escape" && emit("close");
watch(
  () => props.project,
  (p) => {
    document.body.style.overflow = p ? "hidden" : "";
    p ? window.addEventListener("keydown", onKey) : window.removeEventListener("keydown", onKey);
  },
);
onBeforeUnmount(() => window.removeEventListener("keydown", onKey));
</script>

<style scoped>
.sheet-enter-active,
.sheet-leave-active {
  transition: opacity 0.35s;
}
.sheet-enter-active article,
.sheet-leave-active article {
  transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
}
.sheet-enter-from article,
.sheet-leave-to article {
  transform: translateY(60px) scale(0.98);
}
</style>
