<template>
  <label class="block">
    <span class="mb-1.5 block text-xs font-medium tracking-wide text-muted uppercase">{{ label }}</span>
    <textarea
      v-if="type === 'textarea'"
      :value="modelValue"
      :rows="rows"
      :placeholder="placeholder"
      class="input resize-y"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <input
      v-else
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :autocomplete="autocomplete"
      class="input"
      @input="$emit('update:modelValue', type === 'number' ? Number($event.target.value) : $event.target.value)"
    />
    <span v-if="hint" class="mt-1 block text-xs text-muted/70">{{ hint }}</span>
  </label>
</template>

<script setup>
defineProps({
  modelValue: [String, Number],
  label: String,
  type: { type: String, default: "text" },
  placeholder: String,
  hint: String,
  required: Boolean,
  autocomplete: String,
  rows: { type: Number, default: 4 },
});
defineEmits(["update:modelValue"]);
</script>
