<template>
  <Transition name="curtain">
    <div v-if="show" class="fixed inset-0 z-[80] flex flex-col justify-between bg-ink p-6 md:p-10">
      <p class="font-mono text-xs tracking-widest text-muted uppercase">{{ name }} — portfolio</p>
      <div class="flex items-end justify-between">
        <p class="font-serif text-2xl italic text-muted md:text-4xl">loading interfaces…</p>
        <p class="text-7xl font-light tabular-nums md:text-[10rem] leading-none">{{ count }}<span class="text-accent">%</span></p>
      </div>
      <div class="absolute bottom-0 left-0 h-px bg-accent transition-[width] duration-100" :style="{ width: count + '%' }" />
    </div>
  </Transition>
</template>

<script setup>
defineProps({ name: String });
const show = ref(true);
const count = ref(0);

onMounted(() => {
  if (sessionStorage.getItem("seen-intro") || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    show.value = false;
    return;
  }
  const start = performance.now();
  const step = (now) => {
    const p = Math.min((now - start) / 1400, 1);
    count.value = Math.round((1 - Math.pow(1 - p, 3)) * 100);
    if (p < 1) requestAnimationFrame(step);
    else
      setTimeout(() => {
        show.value = false;
        try { sessionStorage.setItem("seen-intro", "1"); } catch {}
      }, 250);
  };
  requestAnimationFrame(step);
});
</script>

<style scoped>
.curtain-leave-active {
  transition: transform 0.9s cubic-bezier(0.76, 0, 0.24, 1);
}
.curtain-leave-to {
  transform: translateY(-100%);
}
</style>
