<template>
  <main class="mx-auto space-y-12 w-10/12 mb-20 container">
    <Button @click="openCreate" class=""
      ><i class="pi pi-plus" /> Add New Section</Button
    >

    <Card class="space-y-4">
      <!-- Bio -->
      <div>
        <label class="block text-sm font-medium mb-1">Bio</label>
        <p v-if="!isUpdating" class="text-gray-700 bg-gray-50 p-3 rounded-md">
          {{ aboutProfile.bio || "No bio added" }}
        </p>

        <textarea
          v-else
          v-model="aboutProfile.bio"
          class="border rounded-md outline-none p-3 border-gray-300 w-full"
        />
      </div>

      <!-- Hobbies -->
      <div>
        <label class="block text-sm font-medium mb-1">Hobbie</label>

        <p v-if="!isUpdating" class="text-gray-700 bg-gray-50 p-3 rounded-md">
          {{ aboutProfile.hobbie || "No hobbies added" }}
        </p>

        <textarea
          v-else
          v-model="aboutProfile.hobbie"
          class="border rounded-md outline-none p-3 border-gray-300 w-full"
        />
      </div>

      <!-- Actions -->
      <div class="flex gap-3">
        <Button v-if="!isUpdating" @click="isUpdating = true"> Edit </Button>

        <Button v-else @click="save"> Save </Button>

        <Button
          v-if="isUpdating"
          bg="bg-white border border-gray-200"
          text-color="text-gray-600"
          @click="cancel"
        >
          Cancel
        </Button>
      </div>
    </Card>

    <div
      v-if="openModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-md h-full flex items-center justify-center z-50"
    >
      <AboutModal
        :is-editing="isEditing"
        :about="data"
        @close="openModal = false"
        @saved="loadAbouts"
        class="h-full sm:h-10/12 w-full sm:w-3/6 overflow-y-scroll"
      />
    </div>

    <Table :headers="headers" unique-id="ref" :data="rows">
      <template #role="{ row }">
        <!-- section -->
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-md bg-green-100">
            <i class="pi pi-briefcase text-green-700"></i>
          </div>
          <div>
            <p class="font-semibold text-gray-800">{{ row.company }}</p>
            <p class="text-gray-500 text-sm">{{ row.role }}</p>
          </div>
        </div>
      </template>

      <!-- date-->
      <template #date="{ row }">
        <span class="text-gray-600">
          {{ row.date }}
        </span>
      </template>

      <!-- date-->
      <template #summary="{ row }">
        <span class="text-gray-600 line-clamp-2">
          {{ row.summary }}
        </span>
      </template>

      <!-- action -->
      <template #action="{ row }">
        <div class="flex items-center gap-3">
          <Button bg="bg-white" @click="openEdit(row)">
            <i class="pi pi-pencil text-blue-600 text-lg"></i>
          </Button>

          <Button bg="bg-white" @click="handleDelete(row.$id)">
            <i class="pi pi-trash text-red-600 text-lg"></i>
          </Button>
        </div>
      </template>
    </Table>
  </main>
</template>

<script setup>
import { useAdmin } from "~/composable/useAdmin";

definePageMeta({
  layout: "dashboard",
  // middleware: 'auth'
});

const { listAbouts, deleteAboutSection, getAboutProfile, updateAboutProfile } =
  useAdmin();
const openModal = ref(false);
const isEditing = ref(false);
const isUpdating = ref(false);
const rows = ref([]);

const aboutProfile = ref({
  bio: "",
  hobbie: "",
});
const profileRowId = ref("");

// const bio = ref('Frontend developer passionate about Vue & Nuxt')
// const hobbies = ref('Coding, music, learning new things')

const emptyForm = () => ({
  company: "",
  role: "",
  summary: "",
  date: "",
});
const data = ref(emptyForm());

const headers = [
  { title: "Company/Role", field: "role", slot: "role" },
  { title: "Date/Duration", field: "date", slot: "date" },
  { title: "Summary", field: "summary", slot: "summary" },
  { title: "Actions", field: "actions", slot: "action" },
];

const cancel = () => {
  isUpdating.value = false;
};

const getProfile = async () => {
  const res = await getAboutProfile();

  if (res.length) {
    aboutProfile.value = {
      bio: res[0].bio,
      hobbie: res[0].hobbie,
    };

    profileRowId.value = res[0].$id;
  }
};

const save = async () => {
  console.log(profileRowId.value, "id");

  await updateAboutProfile(profileRowId.value, aboutProfile.value);

  isUpdating.value = false;
};
const loadAbouts = async () => {
  const res = await listAbouts();
  rows.value = res.map((r) => ({ ...r, ref: r.$id || r.ref }));
};

onMounted(async () => {
  await loadAbouts();
  await getProfile();
});

const openCreate = () => {
  isEditing.value = false;
  data.value = emptyForm();
  openModal.value = true;
};

const openEdit = (row) => {
  isEditing.value = true;
  data.value = { ...row, id: row.$id };
  openModal.value = true;
};

const handleDelete = async (id) => {
  const ok = confirm("Delete this section?");
  if (!ok) return;
  await deleteAboutSection(id);
  await loadAbouts();
  alert("Deleted");
};
</script>

<style lang="scss" scoped></style>
