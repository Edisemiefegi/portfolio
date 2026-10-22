<template>
  <Teleport to="body">
    <Transition name="drawer">
      <div v-if="open" class="admin fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm" @click.self="$emit('close')">
        <form class="flex h-full w-full max-w-xl flex-col border-l border-line bg-surface" @submit.prevent="$emit('submit')">
          <header class="flex items-center justify-between border-b border-line px-6 py-4">
            <h2 class="text-lg font-medium">{{ title }}</h2>
            <button type="button" class="grid h-9 w-9 place-items-center rounded-full hover:bg-raised" aria-label="Close" @click="$emit('close')">
              <i class="pi pi-times text-sm" />
            </button>
          </header>
          <div class="flex-1 space-y-5 overflow-y-auto p-6"><slot /></div>
          <footer class="flex justify-end gap-3 border-t border-line px-6 py-4">
            <button type="button" class="btn-ghost" @click="$emit('close')">Cancel</button>
            <button class="btn-primary" :disabled="busy">{{ busy ? "Saving…" : "Save" }}</button>
          </footer>
        </form>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({ open: Boolean, title: String, busy: Boolean });
defineEmits(["close", "submit"]);
</script>

<style scoped>
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.3s;
}
.drawer-enter-active form,
.drawer-leave-active form {
  transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}
.drawer-enter-from form,
.drawer-leave-to form {
  transform: translateX(100%);
}
</style>
