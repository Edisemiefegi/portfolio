<template>
  <div>
    <span class="mb-1.5 block text-xs font-medium tracking-wide text-muted uppercase">{{ label }}</span>
    <div class="flex gap-2">
      <input v-model="draft" class="input" :placeholder="placeholder" @keydown.enter.prevent="add" />
      <button type="button" class="btn-ghost shrink-0" @click="add">Add</button>
    </div>
    <ul v-if="modelValue?.length" class="mt-2 flex flex-wrap gap-2">
      <li v-for="(item, i) in modelValue" :key="i" class="flex items-center gap-2 rounded-full bg-raised px-3 py-1 text-sm" :class="block ? 'w-full justify-between rounded-lg' : ''">
        {{ item }}
        <button type="button" class="text-muted hover:text-red-400" aria-label="Remove" @click="remove(i)"><i class="pi pi-times text-[10px]" /></button>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({ modelValue: Array, label: String, placeholder: String, block: Boolean });
const emit = defineEmits(["update:modelValue"]);
const draft = ref("");

const add = () => {
  // allow pasting comma separated values for short tags
  const values = (props.block ? [draft.value] : draft.value.split(",")).map((v) => v.trim()).filter(Boolean);
  if (!values.length) return;
  emit("update:modelValue", [...(props.modelValue || []), ...values]);
  draft.value = "";
};
const remove = (i) => emit("update:modelValue", props.modelValue.filter((_, j) => j !== i));
</script>
