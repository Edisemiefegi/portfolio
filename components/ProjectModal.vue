<template>
  <main class="rounded-t-md">
    <Card class="space-y-4 relative bg-white overflow-hidden rounded-b-none">
      <div class="flex justify-between">
        <p class="text-lg font-bold">Quick Actions</p>
        <span @click="$emit('close')" class="pi pi-times cursor-pointer"></span>
      </div>
      <hr class="text-gray-300" />

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="space-y-6">
          <!-- project title and url -->
          <Input
            label="Project Title"
            v-model="form.title"
            placeholder="Enter project title"
          />
          <div class="flex gap-1 items-end">
            <Input
              label="Website URL"
              v-model="form.url"
              placeholder="https://example.com"
            />

            <label
              class="flex items-center justify-center gap-2 px-4 py-2 rounded-md border cursor-pointer hover:bg-gray-100 transition"
            >
              <span class="pi pi-camera"></span>

              <Input
                type="file"
                accept="image/*"
                @change="handleImageUpload"
                class="hidden"
              />
            </label>
          </div>

          <!-- stack -->
          <div class="space-y-1.5">
            <div class="flex gap-2 justify-center items-center">
              <Input
                v-model="input.stack"
                @keyup.enter="addItem('stack')"
                placeholder="e.g. Vue, Nuxt"
              />
              <Button @click="addItem('stack')" class="h-fit">Add</Button>
            </div>

            <!-- tags -->
            <div class="flex gap-2 flex-wrap w-60">
              <span
                v-for="(item, index) in form.stack"
                :key="index"
                class="px-3 py-1 bg-gray-100 text-xs rounded-full flex items-center gap-2"
              >
                {{ item }}
                <span
                  @click="removeItem('stack', index)"
                  class="pi pi-times cursor-pointer text-red-500"
                ></span>
              </span>
            </div>
          </div>

          <!-- github link -->
          <Input
            v-model="form.githubLink"
            label="Github Repository"
            placeholder="https://github.com/username/repo"
          />

          <!-- role -->
          <Input
            v-model="form.role"
            label="Role"
            placeholder="junior frontend dev"
          />
          <!-- learnings-->
          <div class="space-y-1.5">
            <Input
              label="Learnings"
              v-model="input.learning"
              @keyup.enter="addItem('learning')"
              placeholder="enter..."
            />

            <!-- tags -->
            <div class="flex gap-2 flex-wrap w-60">
              <span
                v-for="(item, index) in form.learning"
                :key="index"
                class="px-3 py-1 bg-gray-100 text-xs rounded-full flex items-center gap-2"
              >
                {{ item }}
                <span
                  @click="removeItem('learning', index)"
                  class="pi pi-times cursor-pointer text-red-500"
                ></span>
              </span>
            </div>
          </div>

          <!-- status -->
          <div class="space-y-2">
            <label class="font-medium">Status</label>

            <div class="flex items-center gap-6">
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="published"
                  v-model="form.status"
                  class="w-4 h-4"
                />
                <span>Published</span>
              </label>

              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="draft"
                  v-model="form.status"
                  class="w-4 h-4"
                />
                <span>Draft</span>
              </label>
            </div>
          </div>
        </div>

        <section class="space-y-2">
          <!-- preview -->

          <div class="space-y-10">
            <div class="space-y-2">
              <p class="font-medium">Website Preview</p>
              <div
                v-if="previewImage"
                class="h-40 shadow-md border border-gray-100 rounded-md flex items-center justify-center"
              >
                <img
                  :src="previewImage"
                  class="h-full object-contain rounded"
                />
              </div>
              <div
                v-else
                class="h-40 text-gray-500 border border-dotted rounded-md flex flex-col justify-center items-center"
              >
                <div class="bg-gray-100 p-3 rounded-md pi pi-image"></div>
                <p class="font-medium">Screenshot will appear here</p>
                <p>Enter URL and click capture button</p>
              </div>
            </div>

            <!-- ai description -->
            <div class="space-y-2">
              <div class="flex justify-between">
                <p class="font-medium">Project Description</p>
                <Button class="rounded-full !px-2 !py-1 pi pi-star !flex gap-1"
                  >Generate with AI</Button
                >
              </div>
              <div
                class="h-40 text-gray-500 border border-dotted rounded-md p-4"
              >
                <textarea
                  v-model="form.description"
                  class="w-full h-full outline-none"
                  placeholder="Describe your project or use AI to generate description..."
                ></textarea>
              </div>
              <p class="text-xs text-end">0/500 characters</p>
            </div>
          </div>
          <!--challange solved -->
          <div class="space-y-1.5">
            <Input
              label="Challenges solved"
              v-model="input.challenge"
              @keyup.enter="addItem('challenge')"
              placeholder="enter.."
            />

            <!-- tags -->
            <div class="flex gap-2 flex-wrap w-60">
              <span
                v-for="(item, index) in form.challenge"
                :key="index"
                class="px-3 py-1 bg-gray-100 text-xs rounded-full flex items-center gap-2"
              >
                {{ item }}
                <span
                  @click="removeItem('challenge', index)"
                  class="pi pi-times cursor-pointer text-red-500"
                ></span>
              </span>
            </div>
          </div>
        </section>
      </div>
    </Card>

    <div class="bg-gray-100 rounded-b-md p-3 flex gap-4 justify-end">
      <Button
        @click="$emit('close')"
        bg="bg-gray-100"
        class="border border-gray-300"
        text-color="text-black"
        >Cancel</Button
      >

      <Button type="button" @click="handleSubmit">Submit</Button>
    </div>
  </main>
</template>

<script setup>
import { useAdmin } from "~/composable/useAdmin";
const { createProject, editProject } = useAdmin();

const emit = defineEmits(["close"]);
const props = defineProps({
  form: Object,
  isEditing: Boolean,
});

const input = reactive({
  stack: "",
  learning: "",
  challenge: "",
});
const previewImage = ref(null);
const imageChanged = ref(false);
const form = ref({});

watch(
  () => props.form,
  (val) => {
    form.value = {
      ...val,
      stack: [...(val.stack || [])],
      learning: [...(val.learning || [])],
      challenge: [...(val.challenge || [])],
    };
  },
  { immediate: true }
);

const addItem = (key) => {
  const value = input[key].trim();
  if (!value) return;

  form.value[key].push(value);
  input[key] = "";
};

const removeItem = (key, index) => {
  form.value[key].splice(index, 1);
};

const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  imageChanged.value = true;
  form.value.image = file;

  previewImage.value = URL.createObjectURL(file);
};

watch(
  () => form.value.image,
  (img) => {
    if (typeof img === "string") {
      previewImage.value = img;
    }
  },
  { immediate: true }
);

const handleSubmit = async () => {
  if (props.isEditing) {
    await editProject(form.value.$id, form.value);
  } else {
    await createProject(form.value);
  }
  emit("close");
};
</script>

<style lang="scss" scoped></style>
