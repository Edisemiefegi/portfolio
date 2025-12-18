import { Client, Account, Storage, TablesDB, ID } from 'appwrite'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

 const endpoint = config.public.appwriteEndpoint as string
  const projectId = config.public.appwriteProjectId as string
  
  if (!endpoint || !projectId) {
    console.warn('❌ Appwrite environment variables missing')
    return
  }

  const client = new Client().setEndpoint(endpoint).setProject(projectId)

  const account = new Account(client)
  const tableDB = new TablesDB(client)
  const storage = new Storage(client)

  return {
    provide: {
      appwrite: {
        client,
        account,
        tableDB,
        storage,
        ID,
      },
    },
  }
})
