<template>
  <div>
    <header class="mb-8 flex items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-medium">Projects</h1>
        <p class="text-sm text-muted">Drafts are hidden from the live site.</p>
      </div>
      <button class="btn-primary" @click="openNew"><i class="pi pi-plus mr-1 text-xs" /> New project</button>
    </header>

    <AdminEmpty v-if="ready && !rows.length" @import="importSeed" @add="openNew" />

    <ul class="space-y-3">
      <li v-for="p in sorted" :key="p.$id" class="panel flex items-center gap-4 p-3">
        <img :src="fileUrl(p.image)" alt="" class="h-16 w-24 shrink-0 rounded-lg bg-raised object-cover object-top" />
        <div class="min-w-0 flex-1">
          <p class="flex items-center gap-2 truncate font-medium">
            {{ p.title }}
            <span class="rounded-full px-2 py-0.5 text-[10px] uppercase" :class="p.status === 'draft' ? 'bg-amber-400/15 text-amber-300' : 'bg-accent/15 text-accent'">{{ p.status || "published" }}</span>
          </p>
          <p class="truncate text-sm text-muted">{{ p.stack?.join(" · ") }}</p>
        </div>
        <AdminRowActions @move="move(p, $event)" @edit="openEdit(p)" @delete="remove(p, p.title)" />
      </li>
    </ul>

    <AdminDrawer :open="drawer" :title="editingId ? 'Edit project' : 'New project'" :busy="api.loading.value || uploading" @close="drawer = false" @submit="submit">
      <div>
        <span class="mb-1.5 block text-xs font-medium tracking-wide text-muted uppercase">Cover image</span>
        <label class="group relative flex aspect-video cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-dashed border-line bg-raised">
          <img v-if="preview" :src="preview" class="absolute inset-0 h-full w-full object-cover object-top" />
          <span class="relative rounded-full bg-ink/80 px-3 py-1.5 text-sm"><i class="pi pi-image mr-1 text-xs" /> {{ preview ? "Replace" : "Upload" }} image</span>
          <input type="file" accept="image/*" class="hidden" @change="pickFile" />
        </label>
      </div>
      <AdminField v-model="form.title" label="Title" required />
      <AdminField v-model="form.description" label="Description" type="textarea" />
      <AdminField v-model="form.role" label="Your role" placeholder="Frontend Developer" />
      <AdminTagInput v-model="form.stack" label="Tech stack" placeholder="Vue, Nuxt, Tailwind… (Enter to add)" />
      <div class="grid gap-4 sm:grid-cols-2">
        <AdminField v-model="form.url" label="Live URL" type="url" placeholder="https://" />
        <AdminField v-model="form.githubLink" label="GitHub URL" type="url" placeholder="https://github.com/…" />
      </div>
      <AdminTagInput v-model="form.challenge" label="Challenges solved" placeholder="Add a challenge" block />
      <AdminTagInput v-model="form.learning" label="What you did / learned" placeholder="Add a point" block />
      <div>
        <span class="mb-1.5 block text-xs font-medium tracking-wide text-muted uppercase">Status</span>
        <div class="flex gap-2">
          <button v-for="s in ['published', 'draft']" :key="s" type="button" class="rounded-full border px-4 py-1.5 text-sm capitalize" :class="form.status === s ? 'border-accent bg-accent text-ink' : 'border-line'" @click="form.status = s">{{ s }}</button>
        </div>
      </div>
    </AdminDrawer>
  </div>
</template>

<script setup>
import { useCollection } from "~/composable/useCollection";
import { fileUrl } from "~/composable/useAdmin";
import { defaultProjects } from "~/data/defaults";

definePageMeta({ layout: "dashboard", middleware: "auth" });

const { api, toast, rows, sorted, form, editingId, drawer, ready, openNew, openEdit, save, remove, move, importSeed } = useCollection("projects", {
  fields: ["title", "description", "role", "stack", "url", "githubLink", "challenge", "learning", "status", "image"],
  blank: () => ({ title: "", description: "", role: "", stack: [], url: "", githubLink: "", challenge: [], learning: [], status: "published", image: "" }),
  seed: defaultProjects,
});

const file = ref(null);
const uploading = ref(false);
const preview = computed(() => (file.value ? URL.createObjectURL(file.value) : fileUrl(form.value.image)));
watch(drawer, () => (file.value = null));

const pickFile = (e) => (file.value = e.target.files[0] || null);

const submit = async () => {
  if (file.value) {
    uploading.value = true;
    try {
      form.value.image = await api.uploadImage(file.value);
    } catch (e) {
      uploading.value = false;
      return toast.error(`Image upload failed: ${e.message}`);
    }
    uploading.value = false;
  }
  await save();
};
</script>
