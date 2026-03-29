import axios from 'axios'

export const useAuth = () => {
  const isAuthenticated = useState('isAuthenticated', () => false)
  const user = useState('user', () => ({}))

  // ✅ Cookie (SSR safe)
  const token = useCookie('token')

  const isAdmin = computed(() => user.value.role === 'Administrator')

  // ===== LOGIN =====
  const login = async (email, password) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email,
        password
      })

      token.value = response.data.token
      user.value = response.data.user
      isAuthenticated.value = true

      return navigateTo('/dashboard')

    } catch (err) {
      console.error(err.response?.data)
      throw new Error(err.response?.data?.message ?? 'Login failed')
    }
  }

  // ===== SIGNUP =====
  const signup = async (email, password, fullName, role) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', {
        name: fullName,
        email,
        password,
        password_confirmation: password, // ✅ IMPORTANT FIX
        role: role ?? 'Employee'
      })

      token.value = response.data.token
      user.value = response.data.user
      isAuthenticated.value = true

      return navigateTo('/dashboard')

    } catch (err) {
      console.error(err.response?.data)
      throw new Error(err.response?.data?.message ?? 'Registration failed')
    }
  }

  // ===== LOGOUT =====
  const logout = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })
    } catch (err) {
      console.error(err)
    } finally {
      token.value = null
      user.value = {}
      isAuthenticated.value = false
      navigateTo('/')
    }
  }

  // ===== RESTORE =====
  const restoreSession = () => {
    if (token.value) {
      isAuthenticated.value = true
    }
  }

  return {
    isAuthenticated,
    user,
    token,
    isAdmin,
    login,
    signup,
    logout,
    restoreSession,
  }
}