<template>
  <div>
    <header class="mb-8 flex items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-medium">Skills</h1>
        <p class="text-sm text-muted">Grouped by category on the site and shown in the scrolling marquee.</p>
      </div>
      <button class="btn-primary" @click="openNew"><i class="pi pi-plus mr-1 text-xs" /> Add skill</button>
    </header>

    <AdminEmpty v-if="ready && !rows.length" @import="importSeed" @add="openNew" />

    <div class="grid gap-4 md:grid-cols-2">
      <section v-for="(group, name) in grouped" :key="name" class="panel p-4">
        <p class="mb-3 font-mono text-xs tracking-widest text-muted uppercase">{{ name }}</p>
        <ul class="space-y-1">
          <li v-for="s in group" :key="s.$id" class="flex items-center justify-between rounded-lg px-2 py-1 hover:bg-raised">
            {{ s.name }}
            <AdminRowActions @move="move(s, $event)" @edit="openEdit(s)" @delete="remove(s, s.name)" />
          </li>
        </ul>
      </section>
    </div>

    <AdminDrawer :open="drawer" :title="editingId ? 'Edit skill' : 'New skill'" :busy="api.loading.value" @close="drawer = false" @submit="save()">
      <AdminField v-model="form.name" label="Skill" required placeholder="TypeScript" />
      <AdminField v-model="form.category" label="Category" placeholder="Languages, Frameworks, Tools…" />
      <div class="flex flex-wrap gap-2">
        <button v-for="c in categories" :key="c" type="button" class="rounded-full border border-line px-3 py-1 text-xs hover:border-accent" @click="form.category = c">{{ c }}</button>
      </div>
    </AdminDrawer>
  </div>
</template>

<script setup>
import { useCollection } from "~/composable/useCollection";
import { defaultSkills } from "~/data/defaults";

definePageMeta({ layout: "dashboard", middleware: "auth" });

const { api, rows, sorted, form, editingId, drawer, ready, openNew, openEdit, save, remove, move, importSeed } = useCollection("skills", {
  fields: ["name", "category"],
  blank: () => ({ name: "", category: "" }),
  seed: defaultSkills,
});

const grouped = computed(() =>
  sorted.value.reduce((acc, s) => {
    (acc[s.category || "Other"] ||= []).push(s);
    return acc;
  }, {}),
);
const categories = computed(() => [...new Set(["Languages", "Frameworks", "Tools", ...rows.value.map((r) => r.category).filter(Boolean)])]);
</script>
