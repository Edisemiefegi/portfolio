<template>
  <div v-if="enabled" class="pointer-events-none fixed inset-0 z-[70] hidden md:block" aria-hidden="true">
    <div ref="dot" class="absolute top-0 left-0 h-1.5 w-1.5 -translate-1/2 rounded-full bg-accent" />
    <div
      ref="ring"
      class="absolute top-0 left-0 flex items-center justify-center rounded-full border border-white/30 font-mono text-[10px] tracking-widest text-ink uppercase transition-[width,height,background-color,border-color] duration-300"
      :class="label ? 'h-20 w-20 border-transparent bg-accent' : hovering ? 'h-12 w-12 border-accent/70' : 'h-8 w-8'"
    >
      {{ label }}
    </div>
  </div>
</template>

<script setup>
// Custom cursor: dot + trailing ring. Elements with [data-cursor="Label"] show a label bubble.
const dot = ref(null);
const ring = ref(null);
const enabled = ref(false);
const hovering = ref(false);
const label = ref("");

let raf;
const pos = { x: -100, y: -100 };
const lag = { x: -100, y: -100 };

const move = (e) => {
  pos.x = e.clientX;
  pos.y = e.clientY;
  const t = e.target.closest?.("a, button, [data-cursor], input, textarea");
  hovering.value = !!t;
  label.value = t?.dataset?.cursor || "";
};

onMounted(() => {
  enabled.value = window.matchMedia("(pointer: fine)").matches;
  if (!enabled.value) return;
  document.documentElement.classList.add("has-cursor");
  window.addEventListener("pointermove", move);
  const loop = () => {
    lag.x += (pos.x - lag.x) * 0.18;
    lag.y += (pos.y - lag.y) * 0.18;
    if (dot.value) dot.value.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%,-50%)`;
    if (ring.value) ring.value.style.transform = `translate(${lag.x}px, ${lag.y}px) translate(-50%,-50%)`;
    raf = requestAnimationFrame(loop);
  };
  loop();
});

onBeforeUnmount(() => {
  cancelAnimationFrame(raf);
  window.removeEventListener("pointermove", move);
  document.documentElement.classList.remove("has-cursor");
});
</script>

<style>
@media (pointer: fine) {
  .has-cursor .site,
  .has-cursor .site a,
  .has-cursor .site button {
    cursor: none;
  }
}
</style>
