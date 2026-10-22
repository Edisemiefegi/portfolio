<template>
  <div>
    <header class="mb-8">
      <h1 class="text-3xl font-medium">Profile</h1>
      <p class="text-sm text-muted">Your hero, about section and contact details.</p>
    </header>

    <form class="space-y-6" @submit.prevent="submit">
      <section class="panel space-y-5 p-6">
        <p class="font-mono text-xs tracking-widest text-muted uppercase">Hero</p>
        <div class="grid gap-4 sm:grid-cols-2">
          <AdminField v-model="form.name" label="Full name" />
          <AdminField v-model="form.headline" label="Headline" placeholder="Frontend Engineer" />
        </div>
        <AdminField v-model="form.tagline" label="Tagline" />
        <label class="flex items-center gap-3">
          <input v-model="form.available" type="checkbox" class="h-4 w-4 accent-[var(--color-accent)]" />
          <span>Available for new projects</span>
        </label>
      </section>

      <section class="panel space-y-5 p-6">
        <p class="font-mono text-xs tracking-widest text-muted uppercase">About</p>
        <AdminField v-model="form.bio" label="Bio" type="textarea" :rows="5" />
        <AdminField v-model="form.hobbie" label="Beyond the code" type="textarea" :rows="5" />
        <div class="grid gap-4 sm:grid-cols-2">
          <AdminField v-model="form.location" label="Location" />
          <AdminField v-model="form.timezone" label="Timezone" hint="IANA name, e.g. Africa/Lagos" />
        </div>
        <AdminField v-model="form.photo" label="Photo URL" hint="Path in /public (e.g. /didi.PNG) or full URL" />
      </section>

      <section class="panel space-y-5 p-6">
        <p class="font-mono text-xs tracking-widest text-muted uppercase">Contact &amp; links</p>
        <div class="grid gap-4 sm:grid-cols-2">
          <AdminField v-model="form.email" label="Email" type="email" hint="Contact-form messages are sent here" />
          <AdminField v-model="form.resume" label="Résumé URL" />
          <AdminField v-model="form.github" label="GitHub" type="url" />
          <AdminField v-model="form.linkedin" label="LinkedIn" type="url" />
          <AdminField v-model="form.twitter" label="X / Twitter" type="url" />
        </div>
      </section>

      <div class="flex justify-end">
        <button class="btn-primary" :disabled="api.loading.value">{{ api.loading.value ? "Saving…" : "Save profile" }}</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useAdmin } from "~/composable/useAdmin";
import { useToast, reportSkipped } from "~/composable/useToast";
import { defaultProfile } from "~/data/defaults";

definePageMeta({ layout: "dashboard", middleware: "auth" });

const api = useAdmin();
const toast = useToast();
const fields = Object.keys(defaultProfile);
const form = ref({ ...defaultProfile });
const rowId = ref(null);

onMounted(async () => {
  try {
    const [row] = await api.list("profile");
    if (row) {
      rowId.value = row.$id;
      // fill blanks from defaults so missing columns still show current site values
      form.value = { ...defaultProfile, ...Object.fromEntries(Object.entries(api.pick(row, fields)).filter(([, v]) => v !== null && v !== "")) };
    }
  } catch (e) {
    toast.error(`Couldn't load profile: ${e.message}`);
  }
});

const submit = async () => {
  try {
    const payload = api.pick(form.value, fields);
    const res = rowId.value ? await api.update("profile", rowId.value, payload) : await api.create("profile", payload);
    rowId.value = res.row.$id;
    reportSkipped(toast, res.skipped, "about_profile");
  } catch (e) {
    toast.error(e.message);
  }
};
</script>
