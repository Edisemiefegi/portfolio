import { useAuth } from "~/composable/useAuth";

export default defineNuxtRouteMiddleware(async () => {
  // Appwrite sessions live in the browser, so only check on the client.
  if (import.meta.server) return;

  const { user, loadSession } = useAuth();
  await loadSession();

  if (!user.value) return navigateTo("/login");
});
