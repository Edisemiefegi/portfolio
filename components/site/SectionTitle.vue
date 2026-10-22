<template>
  <div class="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
    <div>
      <p v-reveal class="mb-4 font-mono text-xs tracking-widest text-accent uppercase">{{ index }} / {{ eyebrow }}</p>
      <h2 v-reveal="100" class="text-4xl font-medium tracking-tight md:text-6xl">
        <slot />
      </h2>
    </div>
    <p v-if="aside" v-reveal="200" class="max-w-sm text-muted">{{ aside }}</p>
  </div>
</template>

<script setup>
defineProps({ index: String, eyebrow: String, aside: String });
</script>
