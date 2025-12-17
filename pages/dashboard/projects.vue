<template>
  <main class="mx-auto space-y-12 w-10/12 mb-20 container">
    <Button
      @click="
        isEditing = false;
        data = emptyForm();
        openModal = true;
      "
      class=""
      ><i class="pi pi-plus" /> Add New Project</Button
    >

    <div
      v-if="openModal"
      class="fixed inset-0 h-full bg-black/50 backdrop-blur-md flex items-center justify-center z-50"
    >
      <ProjectModal
        :form="data"
        :is-editing="isEditing"
        @close="openModal = false"
        class="h-full sm:h-10/12 w-full sm:w-fit overflow-y-scroll"
      />
    </div>

    <Table :headers="headers" unique-id="ref" :data="projects">
      <template #title="{ row }">
        <!-- project -->
        <div class="flex items-center gap-3 w-30">
          <img :src="row.image" class="w-12 h-12 rounded-lg object-cover" />
          <div>
            <p class="font-semibold text-gray-800">{{ row.title }}</p>
            <p class="text-gray-500 text-sm line-clamp-1">
              {{ row.description }}
            </p>
          </div>
        </div>
      </template>

      <!-- stack -->

      <template #stack="{ row }">
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tech in row.stack"
            :key="tech"
            :class="[
              'px-3 py-1 text-xs rounded-full font-medium',
              getColorFor(tech).bg,
              getColorFor(tech).text,
            ]"
          >
            {{ tech }}
          </span>
        </div>
      </template>

      <!-- status -->
      <template #status="{ row }">
        <span
          :class="[
            'px-3 py-1 text-xs rounded-full font-medium',
            row.status === 'published' ? 'bg-green-100 text-green-700' : '',
            row.status === 'draft' ? 'bg-yellow-100 text-yellow-700' : '',
          ]"
        >
          {{ row.status }}
        </span>
      </template>

      <!-- updated -->
      <template #updated_at="{ row }">
        <span class="text-gray-600">
          {{ new Date(row.$updatedAt).toLocaleDateString() }}
        </span>
      </template>

      <!-- action -->
      <template #action="{ row }">
        <div class="flex items-center gap-3">
          <Button
            @click="openEditModal(row)"
            bg="bg-white"
            text-color="text-blue-600"
            class="pi pi-pencil"
          >
          </Button>

          <Button
            bg="bg-white"
            text-color="text-red-600"
            class="pi pi-trash"
            @click="handledelete(row)"
          >
          </Button>
        </div>
      </template>
    </Table>
  </main>
</template>

<script setup>
import ProjectModal from "~/components/ProjectModal.vue";
import { useAdmin } from "~/composable/useAdmin";

definePageMeta({
  layout: "dashboard",
  // middleware: 'auth'
});

const { listProjects, deleteProject } = useAdmin();
const projects = ref([]);

onMounted(async () => {
  const res = await listProjects();
  const allProject = res.map((p) => ({
    ...p,
    ref: p.$id,
    image: storage.getFileDownload({
      bucketId: "projectImages",
      fileId: p.image,
    }),
  }));

  projects.value = allProject.filter((e) => e.status == "published");

  console.log(projects.value, "projects ");
});

const openModal = ref(false);
const isEditing = ref(false);

const emptyForm = () => ({
  title: "",
  stack: [],
  url: "",
  githubLink: "",
  description: "",
  status: "",
  image: "",
  role: "",
  challenge: [],
  learning: []
});

const data = ref(emptyForm());

const headers = [
  { title: "Project", field: "title", slot: "title" },
  { title: "Tech Stack", field: "stack", slot: "stack" },
  { title: "Status", field: "status", slot: "status" },
  { title: "Last Updated", field: "updated_at", slot: "updated_at" },
  { title: "Actions", field: "actions", slot: "action" },
];

const handledelete = async (row) => {
  const ok = confirm("Delete this section?");
  if (!ok) return;
  await deleteProject(row.$id);
  alert("delete successful");
};

const openEditModal = (row) => {
  isEditing.value = true;
  console.log(data.value, "b");
  data.value = { ...row, stack: [...row.stack], id: row.$id };

  console.log(data.value, "a");
  openModal.value = true;
};

const randomColors = [
  { bg: "bg-red-100", text: "text-red-700" },
  { bg: "bg-green-100", text: "text-green-700" },
  { bg: "bg-blue-100", text: "text-blue-700" },
  { bg: "bg-purple-100", text: "text-purple-700" },
  { bg: "bg-yellow-100", text: "text-yellow-700" },
  { bg: "bg-pink-100", text: "text-pink-700" },
  { bg: "bg-indigo-100", text: "text-indigo-700" },
];

const colorMap = ref({});

function getColorFor(tech) {
  if (!colorMap.value[tech]) {
    const random =
      randomColors[Math.floor(Math.random() * randomColors.length)];
    colorMap.value[tech] = random;
  }
  return colorMap.value[tech];
}
</script>

<style lang="scss" scoped></style>
