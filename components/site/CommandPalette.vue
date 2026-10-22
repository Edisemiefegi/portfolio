<template>
  <Transition name="pal">
    <div v-if="open" class="fixed inset-0 z-[75] flex items-start justify-center bg-black/60 px-4 pt-[15vh] backdrop-blur-sm" @click.self="close">
      <div class="w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl shadow-black/60" role="dialog" aria-label="Command menu">
        <div class="flex items-center gap-3 border-b border-line px-4">
          <i class="pi pi-search text-muted" />
          <input
            ref="input"
            v-model="q"
            placeholder="Type a command or search…"
            class="w-full bg-transparent py-4 text-fg outline-none placeholder:text-muted"
            @keydown.down.prevent="move(1)"
            @keydown.up.prevent="move(-1)"
            @keydown.enter.prevent="run(filtered[index])"
          />
          <kbd class="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted">ESC</kbd>
        </div>
        <ul class="max-h-80 overflow-y-auto p-2">
          <li v-for="(item, i) in filtered" :key="item.label">
            <button
              class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm"
              :class="i === index ? 'bg-raised text-fg' : 'text-muted'"
              @mouseenter="index = i"
              @click="run(item)"
            >
              <i class="pi w-4 text-xs" :class="item.icon" />
              <span class="flex-1">{{ item.label }}</span>
              <span class="font-mono text-[10px] tracking-wider uppercase opacity-60">{{ item.group }}</span>
            </button>
          </li>
          <li v-if="!filtered.length" class="px-3 py-6 text-center text-sm text-muted">No results for “{{ q }}”</li>
        </ul>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const props = defineProps({ profile: Object, projects: Array });
const open = defineModel({ type: Boolean });
const emit = defineEmits(["toast"]);

const q = ref("");
const index = ref(0);
const input = ref(null);

const go = (id) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

const items = computed(() => [
  { group: "Go", label: "Home", icon: "pi-home", action: () => go("#home") },
  { group: "Go", label: "About me", icon: "pi-user", action: () => go("#about") },
  { group: "Go", label: "Experience", icon: "pi-briefcase", action: () => go("#experience") },
  { group: "Go", label: "Selected work", icon: "pi-th-large", action: () => go("#projects") },
  { group: "Go", label: "Tech stack", icon: "pi-code", action: () => go("#skills") },
  { group: "Go", label: "Contact", icon: "pi-send", action: () => go("#contact") },
  {
    group: "Action",
    label: "Copy email address",
    icon: "pi-copy",
    action: async () => {
      await navigator.clipboard.writeText(props.profile.email);
      emit("toast", "Email copied to clipboard");
    },
  },
  { group: "Action", label: "Download résumé", icon: "pi-download", action: () => window.open(props.profile.resume, "_blank") },
  props.profile.github && { group: "Link", label: "GitHub", icon: "pi-github", action: () => window.open(props.profile.github, "_blank") },
  props.profile.linkedin && { group: "Link", label: "LinkedIn", icon: "pi-linkedin", action: () => window.open(props.profile.linkedin, "_blank") },
  props.profile.twitter && { group: "Link", label: "X / Twitter", icon: "pi-twitter", action: () => window.open(props.profile.twitter, "_blank") },
  ...props.projects
    .filter((p) => p.url)
    .map((p) => ({ group: "Project", label: `Open ${p.title}`, icon: "pi-external-link", action: () => window.open(p.url, "_blank") })),
].filter(Boolean));

const filtered = computed(() => items.value.filter((i) => i.label.toLowerCase().includes(q.value.toLowerCase())));
watch(q, () => (index.value = 0));

const move = (d) => (index.value = (index.value + d + filtered.value.length) % filtered.value.length);
const close = () => (open.value = false);
const run = (item) => {
  if (!item) return;
  close();
  item.action();
};

watch(open, async (v) => {
  if (!v) return;
  q.value = "";
  await nextTick();
  input.value?.focus();
});

const onKey = (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    open.value = !open.value;
  } else if (e.key === "Escape") close();
};
onMounted(() => window.addEventListener("keydown", onKey));
onBeforeUnmount(() => window.removeEventListener("keydown", onKey));
</script>

<style scoped>
.pal-enter-active,
.pal-leave-active {
  transition: opacity 0.2s;
}
.pal-enter-active > div,
.pal-leave-active > div {
  transition: transform 0.25s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.pal-enter-from,
.pal-leave-to {
  opacity: 0;
}
.pal-enter-from > div,
.pal-leave-to > div {
  transform: scale(0.96) translateY(-8px);
}
</style>
