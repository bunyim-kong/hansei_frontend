export const useAuth = () => {
  const isAuthenticated = useState('isAuthenticated', () => false)
  const user = useState('user', () => ({}))
  const isAdmin = computed(() => user.value.role === 'Administrator')

  const login = async (email, password) => {
    await new Promise(r => setTimeout(r, 900))
    
    if (password !== 'password') {
      throw new Error('Invalid credentials')
    }
    
    if (email === 'admin@company.com') {
      user.value = { name: 'Hoyoss Admin', firstName: 'Hoyoss', role: 'Administrator', email }
    } else if (email === 'john@company.com') {
      user.value = { name: 'John Smith', firstName: 'John', role: 'Employee', email }
    } else {
      throw new Error('Demo accounts: admin@company.com or john@company.com / password')
    }
    
    isAuthenticated.value = true
    return navigateTo('/dashboard')
  }

  const logout = () => {
    isAuthenticated.value = false
    user.value = {}
    return navigateTo('/')
  }

  return { isAuthenticated, user, isAdmin, login, logout }
}