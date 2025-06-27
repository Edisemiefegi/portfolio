<template>
  <div
    class="bg-white cursor-pointer hover:scale-105 hover:shadow-2xl rounded-xl border border-gray-100 shadow-sm flex flex-col items-center"
  >
    <div class="h-50 w-full overflow-hidden rounded-t-xl bg-gray-600">
      <img :src="content?.image" alt="" class="object-cover w-full h-full" />
    </div>
    <div class="md:p-8 p-4 space-y-3 w-full">
      <h1 class="text-normal md:text-xl font-bold">{{ content?.heading }}</h1>
      <p class="text-gray-600">{{ content?.summary }}</p>
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
