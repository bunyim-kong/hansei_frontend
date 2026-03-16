<template>
  <div class="w-full max-w-md">
    <div class="bg-white rounded-2xl shadow-2xl p-8 transform transition-all hover:scale-[1.02]">
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-linear-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <i class="fas fa-users-cog text-white text-2xl"></i>
        </div>
        <h1 class="text-2xl font-bold gradient-text">Workforce Pro</h1>
        <p class="text-gray-500 mt-2">Attendance & Management System</p>
      </div>
      
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <div class="relative">
            <i class="fas fa-envelope absolute left-3 top-3 text-gray-400"></i>
            <input 
              v-model="email" 
              type="email" 
              required
              class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              placeholder="admin@company.com or john@company.com"
            >
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <div class="relative">
            <i class="fas fa-lock absolute left-3 top-3 text-gray-400"></i>
            <input 
              v-model="password" 
              type="password" 
              required
              class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              placeholder="••••••••"
            >
          </div>
        </div>
        
        <div v-if="error" class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p class="text-red-700 text-sm">{{ error }}</p>
        </div>
        
        <button 
          type="submit" 
          :disabled="loading"
          class="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-75 disabled:cursor-wait"
        >
          <span v-if="loading"><i class="fas fa-spinner fa-spin mr-2"></i>Authenticating...</span>
          <span v-else>Sign In</span>
        </button>
      </form>
      
      <div class="mt-6 text-center text-sm text-gray-500 space-y-1">
        <p><strong>Admin:</strong> admin@company.com / password</p>
        <p><strong>Employee:</strong> john@company.com / password</p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'auth' })

const { login } = useAuth()
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleSubmit = async () => {
  loading.value = true
  error.value = ''
  try {
    await login(email.value, password.value)
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>