<template>
  <div
    class="!transition-all duration-200 transform scale-100 hover:scale-110 hover:shadow-xl ease-in-out bg-white cursor-pointer rounded-xl border border-gray-100 dark:border-gray-700 dark:text-white dark:bg-gray-800 shadow-sm flex flex-col items-center"
  >
    <div class="h-50 w-full overflow-hidden rounded-t-xl bg-gray-600">
      <img :src="content?.image" alt="" class="object-cover w-full h-full" />
    </div>
    <div class="md:p-8 p-4 space-y-3 w-full">
      <h1 class="text-normal md:text-xl font-bold">{{ content?.heading }}</h1>
      <p class="text-gray-600 dark:text-gray-400">{{ content?.summary }}</p>
      <div class="flex gap-2 w-full flex-wrap">
        <Button
          class="text-xs"
          :text-color="'text-black '"
          :bg="'bg-gray-200'"
          :rounded="'rounded-full'"
          :size="'sm'"
          v-for="item in content?.button"
          :key="item"
          >{{ item }}</Button
        >
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  content: Object,
});
</script>
