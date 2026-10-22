<template>
  <div class="flex shrink-0 items-center gap-1 text-muted">
    <button class="icon-btn" title="Move up" @click="$emit('move', -1)"><i class="pi pi-arrow-up text-xs" /></button>
    <button class="icon-btn" title="Move down" @click="$emit('move', 1)"><i class="pi pi-arrow-down text-xs" /></button>
    <button class="icon-btn hover:!text-fg" title="Edit" @click="$emit('edit')"><i class="pi pi-pencil text-xs" /></button>
    <button class="icon-btn hover:!text-red-400" title="Delete" @click="$emit('delete')"><i class="pi pi-trash text-xs" /></button>
  </div>
</template>

<script setup>
defineEmits(["move", "edit", "delete"]);
</script>

<style scoped>
.icon-btn {
  display: grid;
  height: 2rem;
  width: 2rem;
  place-items: center;
  border-radius: 999px;
  cursor: pointer;
}
.icon-btn:hover {
  background: var(--color-raised);
}
</style>
