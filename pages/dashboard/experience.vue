<template>
  <div>
    <header class="mb-8 flex items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-medium">Experience</h1>
        <p class="text-sm text-muted">Shown as the timeline on your site, top to bottom.</p>
      </div>
      <button class="btn-primary" @click="openNew"><i class="pi pi-plus mr-1 text-xs" /> Add role</button>
    </header>

    <AdminEmpty v-if="ready && !rows.length" @import="importSeed" @add="openNew" />

    <ul class="space-y-3">
      <li v-for="job in sorted" :key="job.$id" class="panel flex items-center gap-4 p-4">
        <div class="min-w-0 flex-1">
          <p class="font-medium">{{ job.company }} <span class="text-muted">— {{ job.role }}</span></p>
          <p class="font-mono text-xs text-muted">{{ job.date }}</p>
          <p class="mt-1 line-clamp-1 text-sm text-muted">{{ job.summary }}</p>
        </div>
        <AdminRowActions @move="move(job, $event)" @edit="openEdit(job)" @delete="remove(job, job.company)" />
      </li>
    </ul>

    <AdminDrawer :open="drawer" :title="editingId ? 'Edit role' : 'New role'" :busy="api.loading.value" @close="drawer = false" @submit="save()">
      <AdminField v-model="form.company" label="Company" required />
      <AdminField v-model="form.role" label="Role / title" required />
      <AdminField v-model="form.date" label="Dates" placeholder="Mar 2025 – Present" />
      <AdminField v-model="form.summary" label="Summary" type="textarea" :rows="6" />
    </AdminDrawer>
  </div>
</template>

<script setup>
import { useCollection } from "~/composable/useCollection";
import { defaultExperiences } from "~/data/defaults";

definePageMeta({ layout: "dashboard", middleware: "auth" });

const { api, rows, sorted, form, editingId, drawer, ready, openNew, openEdit, save, remove, move, importSeed } = useCollection("experiences", {
  fields: ["company", "role", "date", "summary"],
  blank: () => ({ company: "", role: "", date: "", summary: "" }),
  seed: defaultExperiences,
});
</script>
