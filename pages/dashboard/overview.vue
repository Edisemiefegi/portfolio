<template>
  <div>
    <header class="mb-8">
      <p class="font-mono text-xs tracking-widest text-accent uppercase">Welcome back</p>
      <h1 class="text-3xl font-medium">Portfolio studio</h1>
      <p class="text-sm text-muted">Changes you save here go live on your site immediately — no redeploy.</p>
    </header>

    <div class="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
      <NuxtLink v-for="s in stats" :key="s.label" :to="s.to" class="panel p-5 transition hover:border-accent/40">
        <i class="pi mb-4 text-accent" :class="s.icon" />
        <p class="text-3xl font-medium">{{ s.value ?? "—" }}</p>
        <p class="text-sm text-muted">{{ s.label }}</p>
      </NuxtLink>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <section class="panel p-6">
        <p class="mb-4 font-medium">Quick actions</p>
        <div class="grid gap-2">
          <NuxtLink to="/dashboard/projects" class="btn-ghost"><i class="pi pi-plus mr-2 text-xs" /> Add a project</NuxtLink>
          <NuxtLink to="/dashboard/experience" class="btn-ghost"><i class="pi pi-briefcase mr-2 text-xs" /> Update experience</NuxtLink>
          <NuxtLink to="/dashboard/profile" class="btn-ghost"><i class="pi pi-user mr-2 text-xs" /> Edit bio &amp; availability</NuxtLink>
        </div>
      </section>
      <section class="panel p-6">
        <p class="mb-4 font-medium">How it works</p>
        <ol class="list-decimal space-y-2 pl-4 text-sm text-muted">
          <li>Empty sections fall back to the built-in content, so the site is never blank.</li>
          <li>On an empty section, click <span class="text-fg">Import current content</span> to copy it into Appwrite and start editing.</li>
          <li>Set a project to <span class="text-fg">Draft</span> to hide it without deleting.</li>
          <li>Use the ↑ ↓ arrows to reorder items.</li>
        </ol>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useAdmin } from "~/composable/useAdmin";

definePageMeta({ layout: "dashboard", middleware: "auth" });

const api = useAdmin();
const counts = ref({});

onMounted(async () => {
  const tables = ["projects", "experiences", "skills"];
  const results = await Promise.allSettled(tables.map((t) => api.list(t)));
  results.forEach((r, i) => (counts.value[tables[i]] = r.status === "fulfilled" ? r.value : null));
});

const stats = computed(() => [
  { label: "Projects", value: counts.value.projects?.length, to: "/dashboard/projects", icon: "pi-folder" },
  { label: "Published", value: counts.value.projects?.filter((p) => p.status !== "draft").length, to: "/dashboard/projects", icon: "pi-eye" },
  { label: "Roles", value: counts.value.experiences?.length, to: "/dashboard/experience", icon: "pi-briefcase" },
  { label: "Skills", value: counts.value.skills?.length, to: "/dashboard/skills", icon: "pi-code" },
]);
</script>
