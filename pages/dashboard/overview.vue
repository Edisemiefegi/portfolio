<template>
  <main class="mx-auto mb-20 space-y-12 w-10/12 container">
    <div
      class="grid grid-cols-2 md:grid-cols-3 justify-between gap-4 text-gray-700"
    >
      <Card v-for="item in stat" :key="item.name" class="w-full">
        <div :class="item.bg" class="rounded-md py-1 px-2 w-fit">
          <i :class="item.icon"></i>
        </div>
        <p>{{ item.name }}</p>
        <p class="font-bold text-lg">{{ item.number }}</p>
      </Card>
    </div>

    <!-- quick action -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card class="space-y-5">
        <p class="text-lg font-bold">Quick Actions</p>
        <div class="flex flex-col gap-4">
          <Button class="w-full"
            ><i class="pi pi-plus" /> Add New Project</Button
          >
          <Button
            @click="navigateTo('/dashboard/about')"
            class="w-full"
            bg="bg-gray-300"
            text-color="text-black"
            ><i class="pi pi-file-edit" /> Edit About Section</Button
          >
        </div>
      </Card>

      <!-- skilld -->
      <Card class="space-y-5">
        <div class="flex justify-between">
          <p class="text-lg font-bold">Skills</p>
          <Button
            @click="addSkill = true"
            bg="bg-white"
            text-color="text-blue-700"
            class="!font-normal"
            ><i class="pi pi-plus" /> Add Skill</Button
          >
        </div>

        <div v-if="addSkill" class="">
          <Input placeholder="enter skill name.." />
        </div>
        <div class="flex gap-4">
          <Button
            v-for="item in Skills"
            key="item"
            bg="bg-blue-100"
            text-color="text-blue-700"
            class="!font-normal text-xs !rounded-full !px-1.5 !py-1"
            >{{ item }}</Button
          >
        </div>
      </Card>
    </div>
  </main>
</template>

<script setup>
import { useAdmin } from "~/composable/useAdmin";

definePageMeta({
  layout: "dashboard",
  // middleware: 'auth'
});

const { listProjects } = useAdmin();

const addSkill = ref(false);
const allProject = ref([]);

onMounted(async () => {
  allProject.value = await listProjects();
  console.log(allProject.value, Published.value, "all");
});

const Published = computed(() =>
  allProject.value.filter((e) => e.status === "published")
);

const Draft = computed(() =>
  allProject.value.filter((e) => e.status == "draft")
);

const stat = computed(() => [
  {
    name: "Total Project",
    number: allProject.value.length,
    icon: "pi pi-folder text-blue-800",
    bg: "bg-blue-200",
  },
  {
    name: "Published",
    number: Published.value.length,
    icon: "pi pi-check-circle text-green-800",
    bg: "bg-green-200",
  },
  {
    name: "Draft",
    number: Draft.value.length,
    icon: "pi pi-exclamation-circle text-purple-800",
    bg: "bg-purple-200",
  },
]);

console.log(stat, "state");

const Skills = ref(["Vue", "Nuxt", "React", "Next", "Typescript"]);
</script>

<style lang="scss" scoped></style>
