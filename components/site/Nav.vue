<template>
  <header class="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8">
    <div
      class="mx-auto flex max-w-6xl items-center justify-between rounded-full border px-3 py-2 transition-all duration-500 md:px-4"
      :class="scrolled ? 'border-line bg-ink/70 backdrop-blur-xl' : 'border-transparent'"
    >
      <a href="#home" class="flex items-center gap-2 pl-2 font-medium tracking-tight">
        <span class="grid h-7 w-7 place-items-center rounded-full bg-accent font-mono text-xs font-bold text-ink">{{ initials }}</span>
        <span class="hidden sm:inline">{{ name }}</span>
      </a>

      <nav class="hidden items-center gap-1 lg:flex">
        <a
          v-for="l in links"
          :key="l.href"
          :href="l.href"
          class="relative rounded-full px-4 py-2 text-sm transition-colors"
          :class="active === l.href ? 'text-ink' : 'text-muted hover:text-fg'"
        >
          <span v-if="active === l.href" class="absolute inset-0 -z-10 rounded-full bg-fg" />
          {{ l.name }}
        </a>
      </nav>

      <div class="flex items-center gap-2">
        <button
          class="hidden items-center gap-2 rounded-full border border-line px-3 py-2 font-mono text-xs text-muted transition hover:border-white/20 hover:text-fg sm:flex"
          @click="$emit('palette')"
        >
          <i class="pi pi-search text-[10px]" /> <kbd>⌘K</kbd>
        </button>
        <a
          href="#contact"
          v-magnetic
          class="hidden rounded-full bg-accent px-4 py-2 text-sm font-medium text-ink md:inline-block"
          >Let’s talk</a
        >
        <button class="grid h-10 w-10 place-items-center rounded-full border border-line lg:hidden" aria-label="Menu" @click="open = !open">
          <i class="pi" :class="open ? 'pi-times' : 'pi-bars'" />
        </button>
      </div>
    </div>

    <Transition name="menu">
      <div v-if="open" class="fixed inset-0 -z-10 flex flex-col justify-end bg-ink/95 px-6 pb-10 backdrop-blur-xl lg:hidden">
        <a
          v-for="(l, i) in links"
          :key="l.href"
          :href="l.href"
          class="menu-item flex items-baseline justify-between border-b border-line py-4 text-4xl font-medium tracking-tight"
          :style="{ '--i': i }"
          @click="open = false"
        >
          {{ l.name }} <span class="font-mono text-xs text-muted">0{{ i + 1 }}</span>
        </a>
        <div class="mt-8 flex gap-3">
          <button class="rounded-full border border-line px-4 py-2 text-sm" @click="open = false; $emit('palette')">Command menu</button>
          <a href="#contact" class="rounded-full bg-accent px-4 py-2 text-sm text-ink" @click="open = false">Let’s talk</a>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
const props = defineProps({ name: String });
defineEmits(["palette"]);

const links = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Work", href: "#projects" },
  { name: "Stack", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

const initials = computed(() => props.name?.split(" ").map((w) => w[0]).join("").slice(0, 2));
const scrolled = ref(false);
const open = ref(false);
const active = ref("#home");

watch(open, (v) => (document.body.style.overflow = v ? "hidden" : ""));

const onScroll = () => {
  scrolled.value = window.scrollY > 20;
  for (const l of [...links].reverse()) {
    const s = document.querySelector(l.href);
    if (s && s.getBoundingClientRect().top <= window.innerHeight * 0.4) {
      active.value = l.href;
      break;
    }
  }
};

onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
});
onBeforeUnmount(() => window.removeEventListener("scroll", onScroll));
</script>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.4s;
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}
.menu-enter-active .menu-item {
  animation: rise 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) both;
  animation-delay: calc(var(--i) * 60ms);
}
@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
}
</style>
