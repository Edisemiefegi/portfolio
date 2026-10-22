<template>
  <div class="admin min-h-screen md:flex">
    <!-- sidebar (top bar on mobile) -->
    <aside class="sticky top-0 z-40 flex items-center justify-between border-b border-line bg-surface px-4 py-3 md:h-screen md:w-60 md:flex-col md:items-stretch md:justify-start md:border-r md:border-b-0 md:p-5">
      <NuxtLink to="/dashboard/overview" class="flex items-center gap-2 font-medium md:mb-8">
        <span class="grid h-8 w-8 place-items-center rounded-lg bg-accent font-mono text-xs font-bold text-ink">EE</span>
        Studio
      </NuxtLink>

      <nav class="fixed inset-x-0 bottom-0 flex justify-around border-t border-line bg-surface p-2 md:static md:flex-col md:justify-start md:gap-1 md:border-0 md:p-0">
        <NuxtLink v-for="l in links" :key="l.to" :to="l.to" class="flex flex-col items-center gap-1 rounded-lg px-3 py-2 text-[11px] text-muted transition hover:text-fg md:flex-row md:gap-3 md:text-sm" active-class="!text-fg md:bg-raised">
          <i class="pi" :class="l.icon" /> {{ l.name }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-2 md:mt-auto md:flex-col md:items-stretch">
        <a href="/" target="_blank" class="btn-ghost text-center text-sm"><i class="pi pi-external-link mr-1 text-xs" /> <span class="hidden md:inline">View site</span></a>
        <button class="btn-ghost text-sm" @click="logout"><i class="pi pi-sign-out mr-1 text-xs" /> <span class="hidden md:inline">Log out</span></button>
      </div>
    </aside>

    <main class="flex-1 px-4 pt-6 pb-28 md:px-10 md:py-10">
      <div class="mx-auto max-w-5xl"><slot /></div>
    </main>

    <Transition name="fade">
      <p
        v-if="toast"
        class="fixed right-4 bottom-20 left-4 z-[60] rounded-xl px-4 py-3 text-sm shadow-xl md:bottom-6 md:left-auto md:max-w-sm"
        :class="{ 'bg-accent text-ink': toast.type === 'success', 'bg-red-500 text-white': toast.type === 'error', 'bg-amber-400 text-ink': toast.type === 'warn' }"
      >
        {{ toast.message }}
      </p>
    </Transition>
  </div>
</template>

<script setup>
import { useAuth } from "~/composable/useAuth";
import { useToast } from "~/composable/useToast";

const { logout } = useAuth();
const { toast } = useToast();
useHead({ title: "Studio — Portfolio admin", meta: [{ name: "robots", content: "noindex" }] });

const links = [
  { name: "Overview", to: "/dashboard/overview", icon: "pi-th-large" },
  { name: "Profile", to: "/dashboard/profile", icon: "pi-user" },
  { name: "Projects", to: "/dashboard/projects", icon: "pi-folder" },
  { name: "Experience", to: "/dashboard/experience", icon: "pi-briefcase" },
  { name: "Skills", to: "/dashboard/skills", icon: "pi-code" },
];
</script>

<style>
.admin {
  background: var(--color-ink);
  color: var(--color-fg);
  font-family: var(--font-sans);
}
.admin .input {
  width: 100%;
  border-radius: 0.6rem;
  border: 1px solid var(--color-line);
  background: var(--color-raised);
  padding: 0.6rem 0.8rem;
  outline: none;
  transition: border-color 0.2s;
}
.admin .input:focus {
  border-color: var(--color-accent);
}
.admin .btn-primary {
  border-radius: 999px;
  background: var(--color-accent);
  color: var(--color-ink);
  padding: 0.55rem 1.2rem;
  font-weight: 500;
  cursor: pointer;
}
.admin .btn-primary:disabled {
  opacity: 0.6;
}
.admin .btn-ghost {
  border-radius: 999px;
  border: 1px solid var(--color-line);
  padding: 0.55rem 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.admin .btn-ghost:hover {
  background: var(--color-raised);
}
.admin .panel {
  border-radius: 1rem;
  border: 1px solid var(--color-line);
  background: var(--color-surface);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
