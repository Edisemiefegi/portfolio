
export const useAuth = () => {
  const {  account } = useAppwrite()

  const user = useState('auth-user', () => undefined) 
  // undefined = not checked yet
  // null = checked + NOT logged in
  // object = logged in

  // Restore session on page refresh
  const loadSession = async () => {
    if (user.value !== undefined) return // already loaded

    try {
      const session = await account.getSession("current")
      user.value = session || null
    } catch {
      user.value = null
    }
  }

  const login = async (email, password) => {
    const session = await account.createEmailPasswordSession({
      email,
      password,
    })

    user.value = session
    navigateTo("/dashboard/overview")
  }

  const logout = async () => {
    await account.deleteSession("current")
    user.value = null
    navigateTo("/")
  }

  return {
    user,
    loadSession,
    login,
    logout
  }
}
