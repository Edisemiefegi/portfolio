import { useAuth } from "~/composable/useAuth"

export default defineNuxtRouteMiddleware(async () => {
  const { user, loadSession } = useAuth()

  // Load session only on refresh/first load
  await loadSession()

  if (user.value === null) {
    return navigateTo('/')
  }

  return
})
