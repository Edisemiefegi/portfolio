<template>
  <button :class="buttonClass" class="cursor-pointer">
    <div>
      <slot />
    </div>
  </button>
</template>

<script setup>
const props = defineProps({
  bg: {
    type: String,
    default: "bg-black",
  },
  textColor: {
    type: String,
    default: "text-white",
  },
  rounded: {
    type: String,
    default: "rounded-md",
  },
  size: {
    type: String,
    default: "md",
  },
  border: {
    type: String,
    default: "",
  },
});

const sizeClasses = {
  sm: "px-2 py-0.5 text-sm w-fit",
  md: "px-4 py-1.5 text-md w-fit",
  lg: "px-8 py-3 text-lg w-fit",
  full: "w-full",
};

const buttonClass = computed(() => {
  return [
    "px-4",
    "py-2",
    "font-semibold",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
    props.bg,
    props.textColor,
    props.rounded,
    "transition",
    "duration-150",
    "ease-in-out",
    sizeClasses[props.size],
    props.border,
  ];
});
</script>

<style lang="scss" scoped></style>
