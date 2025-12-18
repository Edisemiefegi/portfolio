export const useAppwrite = () => {
  const { $appwrite } = useNuxtApp()

  if (!$appwrite) {
    throw new Error('Appwrite not initialized')
  }

  return $appwrite
}