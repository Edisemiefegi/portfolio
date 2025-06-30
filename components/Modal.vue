<template>
  <div
    @click="handleOutsideClick"
    class="fixed inset-0 backdrop-blur-sm bg-white/10 flex justify-center items-center z-50"
  >
    <div
      @click.stop
      class="bg-white relative md:rounded-xl md:w-4/5 md:h-4/5 w-full h-full overflow-y-auto no-scrollbar flex flex-col items-center"
    >
      <button
        @click="emit('close')"
        class="px-3 py-1 cursor-pointer rounded-md bg-gray-200 absolute top-5 right-5"
      >
        <i class="pi pi-times text-sm"></i>
      </button>
      <div
        class="h-2/3 w-full overflow-hidden md:rounded-t-xl shadow-sm bg-gray-600"
      >
        <img :src="content?.image" alt="" class="object-cover w-full h-full" />
      </div>
      <div class="p-12 space-y-6 w-full h-2/5">
        <div class="md:flex-row flex flex-col gap-3 md:justify-between">
          <div class="">
            <h1 class="text-xl md:text-2xl font-bold">
              {{ content?.heading }}
            </h1>
            <p class="font-medium my-2">{{ content?.subheading }}</p>
          </div>

          <div class="flex h-fit gap-4">
            <Button
              :size="'sm'"
              :bg="'bg-white'"
              :text-color="'black'"
              :border="'border-gray-300 border'"
            >
              <a :href="content?.code"> <i class="pi pi-github"></i> Code </a>
            </Button>
            <Button :size="'sm'" class="">
              <a :href="content?.demo">
                <i class="pi pi-external-link"></i>
                Live Demo
              </a>
            </Button>
          </div>
        </div>

        <p class="text-gray-600">{{ content?.text }}</p>

        <div class="md:flex-row flex flex-col gap-3 md:justify-between">
          <div>
            <p class="text-xl md:text-2xl font-bold mb-2">Key Learnings</p>
            <ul v-for="item in content?.learnings" :key="item">
              <li class="list-disc my-4 text-gray-600">{{ item }}</li>
            </ul>
          </div>
          <div>
            <p class="text-xl md:text-2xl font-bold mb-2">Challenges Solved</p>
            <ul v-for="item in content?.challenge" :key="item">
              <li class="list-disc my-4 text-gray-600">{{ item }}</li>
            </ul>
          </div>
        </div>
        <div>
          <p class="text-xl md:text-2xl font-bold">Tech Stack</p>
          <div class="flex gap-2 w-full flex-wrap py-4">
            <Button
              class="text-xs !px-2 !py-1"
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
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  content: Object,
});

const emit = defineEmits(["close"]);

const handleOutsideClick = () => {
  emit("close");
};
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
