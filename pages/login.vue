<template>
  <div class="admin flex min-h-screen items-center justify-center px-4">
    <form class="panel w-full max-w-sm space-y-5 p-8" @submit.prevent="submit">
      <div>
        <span class="mb-6 grid h-10 w-10 place-items-center rounded-xl bg-accent font-mono text-sm font-bold text-ink">EE</span>
        <h1 class="text-2xl font-medium">Studio sign in</h1>
        <p class="text-sm text-muted">Manage your portfolio content.</p>
      </div>
      <AdminField v-model="form.email" label="Email" type="email" autocomplete="email" required />
      <AdminField v-model="form.password" label="Password" type="password" autocomplete="current-password" required />
      <p v-if="error" class="text-sm text-red-400">{{ error }}</p>
      <button class="btn-primary w-full" :disabled="busy">{{ busy ? "Signing in…" : "Sign in" }}</button>
      <NuxtLink to="/" class="block text-center text-sm text-muted hover:text-fg">← Back to site</NuxtLink>
    </form>
  </div>
</template>

<script setup>
import { useAuth } from "~/composable/useAuth";

useHead({ title: "Sign in — Studio", meta: [{ name: "robots", content: "noindex" }] });

const { login, user, loadSession } = useAuth();
const form = ref({ email: "", password: "" });
const error = ref("");
const busy = ref(false);

onMounted(async () => {
  await loadSession();
  if (user.value) navigateTo("/dashboard/overview");
});

const submit = async () => {
  busy.value = true;
  error.value = "";
  try {
    await login(form.value.email, form.value.password);
  } catch (e) {
    error.value = e.message || "Sign in failed";
  } finally {
    busy.value = false;
  }
};
</script>
