<template>
  <footer class="border-t border-line px-4 py-10 md:px-8">
    <div class="mx-auto flex max-w-6xl flex-col gap-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
      <p>© {{ year }} {{ name }}. Designed &amp; built with Nuxt, Three.js and too much coffee.</p>
      <div class="flex items-center gap-6">
        <span class="font-mono text-xs">Press <kbd class="rounded border border-line px-1.5 py-0.5">⌘K</kbd> to navigate</span>
        <a href="#home" class="flex items-center gap-2 transition hover:text-fg">Back to top <i class="pi pi-arrow-up text-xs" /></a>
      </div>
    </div>
  </footer>
</template>

<script setup>
defineProps({ name: String });
const year = new Date().getFullYear();
</script>
