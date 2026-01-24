export const useAppwrite = () => {
  const nuxtApp = useNuxtApp();
  return nuxtApp.$appwrite || null

  if (!nuxtApp.$appwrite) {
    throw new Error("Appwrite not initialized (client only)");
  }

  return nuxtApp.$appwrite;
};
