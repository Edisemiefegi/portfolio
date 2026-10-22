<template>
  <span :aria-label="text" @pointerenter="play"><span aria-hidden="true">{{ out }}</span></span>
</template>

<script setup>
// Text that decodes from random glyphs into the real string (on mount and on hover).
const props = defineProps({ text: String, delay: { type: Number, default: 0 } });
const glyphs = "!<>-_\\/[]{}—=+*^?#ABCDEFX01";
const out = ref(props.text);
let raf;

const play = () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  cancelAnimationFrame(raf);
  const start = performance.now();
  const len = props.text.length;
  const step = (now) => {
    const progress = (now - start) / 900;
    out.value = props.text
      .split("")
      .map((c, i) => (c === " " || i / len < progress ? c : glyphs[(Math.random() * glyphs.length) | 0]))
      .join("");
    if (progress < 1) raf = requestAnimationFrame(step);
    else out.value = props.text;
  };
  raf = requestAnimationFrame(step);
};

onMounted(() => setTimeout(play, props.delay));
onBeforeUnmount(() => cancelAnimationFrame(raf));
</script>
