<template>
  <main class="">
    <Card class="space-y-4 bg-white rounded-b-none">
      <div class="flex justify-between">
        <p class="text-lg font-bold">Add New Section</p>
        <span @click="$emit('close')" class="pi pi-times cursor-pointer"></span>
      </div>
      <hr class="text-gray-300" />

      <div class="space-y-6">
        <Input v-model="form.company" label="Company Name" placeholder="enter company name" />

        <Input
        v-model="form.role"
          label="Title / Role"
          placeholder="Enter title or role"
        />

          <Input v-model="form.date" label="Date / Duration " placeholder="date/duration" />
   
        <div class="">
          <p class="font-medium">Description / Details</p>
          <textarea
          v-model="form.summary"
            class="w-full outline-none h-40 text-gray-500 border border-dotted rounded-md p-4"
            placeholder="Describe your project or use AI to generate description..."
          ></textarea>
        </div>
      </div>
    </Card>
    <div
      class="bg-gray-100 rounded-b-md p-3 flex items-end justify-end gap-4"
    >
      <Button
        @click="$emit('close')"
        bg="bg-gray-100"
        class="border border-gray-300"
        text-color="text-black"
        >Cancel</Button
      >
      <Button @click="handleSubmit">Save Section</Button>
    </div>
  </main>
</template>

<script setup>
import { useAdmin } from '~/composable/useAdmin';


const { createAbout, editAbout } = useAdmin();

const emit = defineEmits(["close", "saved"]);
const props = defineProps({
  about: { type: Object, default: null },
  isEditing: Boolean
});

 const form = ref({});

watch(
  () => props.about,
  (val) => {
    form.value = {
      ...val
    };
  },
  { immediate: true }
);



console.log(form.value.date, 'd');


const handleSubmit = async () => {
  try {
    if (props.isEditing) {
      await editAbout(props.about.$id, form.value);
    } else {
      await createAbout(form.value);
    }
    emit("saved");
    emit("close");
  } catch (err) {
    console.error(err);
    alert("Could not save section");
  }
};
</script>

<style lang="scss" scoped></style>
