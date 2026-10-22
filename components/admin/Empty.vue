<template>
  <div class="panel flex flex-col items-center gap-3 p-10 text-center">
    <i class="pi pi-inbox text-2xl text-muted" />
    <p class="font-medium">Nothing here yet</p>
    <p class="max-w-sm text-sm text-muted">The live site is currently showing its built-in content. Import it to start editing, or add a new item.</p>
    <div class="mt-2 flex gap-2">
      <button class="btn-ghost text-sm" @click="$emit('import')">Import current content</button>
      <button class="btn-primary text-sm" @click="$emit('add')">Add new</button>
    </div>
  </div>
</template>

<script setup>
defineEmits(["import", "add"]);
</script>
