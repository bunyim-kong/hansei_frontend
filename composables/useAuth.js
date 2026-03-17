export const useAuth = () => {
  const isAuthenticated = useState('isAuthenticated', () => false)
  const user = useState('user', () => ({}))
  const users = useState('users', () => [
    { email: 'admin@company.com', password: 'password', role: 'Administrator', name: 'Hoyoss Admin', firstName: 'Hoyoss' },
    { email: 'john@company.com', password: 'password', role: 'Employee', name: 'John Smith', firstName: 'John' }
  ])

  const isAdmin = computed(() => user.value.role === 'Administrator')

  const login = async (email, password) => {
    await new Promise(r => setTimeout(r, 500))

    const found = users.value.find(u => u.email === email && u.password === password)
    if (!found) throw new Error('Invalid email or password')

    user.value = { ...found }
    isAuthenticated.value = true
    return navigateTo('/dashboard')
  }

  const signup = async (email, password, fullName, role) => {
    await new Promise(r => setTimeout(r, 500))

    if (users.value.some(u => u.email === email)) {
      throw new Error('Email already registered')
    }

    // Default to Employee if role is Administrator but user is not admin
    if (role === 'Administrator' && (!user.value || user.value.role !== 'Administrator')) {
      role = 'Employee'
    }

    const firstName = fullName.split(' ')[0] || fullName
    const newUser = { email, password, role, name: fullName, firstName }
    users.value.push(newUser)

    // Auto-login after signup
    user.value = { ...newUser }
    isAuthenticated.value = true
    return navigateTo('/dashboard')
  }

  const logout = () => {
    isAuthenticated.value = false
    user.value = {}
    return navigateTo('/')
  }

  return { isAuthenticated, user, isAdmin, users, login, signup, logout }
}