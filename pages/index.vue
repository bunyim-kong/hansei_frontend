<template>
  <div class="w-full max-w-md">
    <div class="bg-white rounded-2xl shadow-2xl p-8 transform transition-all hover:scale-[1.02]">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-linear-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <i class="fas fa-users-cog text-white text-2xl"></i>
        </div>
        <h1 class="text-2xl font-bold gradient-text">Workforce Pro</h1>
        <p class="text-gray-500 mt-2">Attendance & Management System</p>
      </div>

      <!-- Tabs -->
      <div class="flex justify-center mb-6 gap-4">
        <button
          @click="mode = 'login'"
          :class="mode === 'login' ? 'font-bold border-b-2 border-blue-600' : 'text-gray-400'"
        >Sign In</button>
        <button
          @click="mode = 'signup'"
          :class="mode === 'signup' ? 'font-bold border-b-2 border-blue-600' : 'text-gray-400'"
        >Sign Up</button>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Full Name (Sign Up only) -->
        <div v-if="mode === 'signup'">
          <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            v-model="fullName"
            type="text"
            required
            class="w-full pl-4 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
            placeholder="John Smith"
          >
        </div>

        <!-- Role selection (Sign Up only) -->
        <div v-if="mode === 'signup'" class="relative">
  <label class="block text-sm font-medium text-gray-700 mb-2">Role</label>
  <div @click="openRole = !openRole"
       class="w-full border border-gray-200 rounded-lg shadow-sm bg-white pl-4 pr-10 py-3 flex justify-between items-center cursor-pointer focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
    <span>{{ role }}</span>
    <i class="fas fa-chevron-down text-gray-400"></i>
  </div>
  
  <!-- Dropdown options -->
  <div v-if="openRole" class="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
    <div
      @click="selectRole('Employee')"
      class="px-4 py-2 hover:bg-blue-600 hover:text-white rounded-t-lg cursor-pointer"
    >
      Employee
    </div>
  </div>
</div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <div class="relative">
            <i class="fas fa-envelope absolute left-3 top-3 text-gray-400"></i>
            <input
              v-model="email"
              type="email"
              required
              class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              placeholder="you@example.com"
            >
          </div>
        </div>

        <!-- Password -->
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

        <!-- Confirm Password (Sign Up only) -->
        <div v-if="mode === 'signup'">
          <label class="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
          <div class="relative">
            <i class="fas fa-lock absolute left-3 top-3 text-gray-400"></i>
            <input
              v-model="confirmPassword"
              type="password"
              required
              class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              placeholder="••••••••"
            >
          </div>
        </div>

        <!-- Error message -->
        <div v-if="error" class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p class="text-red-700 text-sm">{{ error }}</p>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-75 disabled:cursor-wait"
        >
          <span v-if="loading"><i class="fas fa-spinner fa-spin mr-2"></i>Processing...</span>
          <span v-else>{{ mode === 'login' ? 'Sign In' : 'Sign Up' }}</span>
        </button>
      </form>

      <div class="mt-6 text-center text-sm text-gray-500 space-y-1" v-if="mode === 'login'">
        <p><strong>Admin:</strong> admin@company.com / password</p>
        <p><strong>Employee:</strong> john@company.com / password</p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'auth' })

import { useAuth } from '~/composables/useAuth'

const { login, signup, isAdmin, user } = useAuth()

const mode = ref('login')
const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const role = ref('Employee')
const openRole = ref(false)



// Check if current logged-in user is Admin (for role selection)
const currentUserIsAdmin = computed(() => isAdmin.value)

const handleSubmit = async () => {
  loading.value = true
  error.value = ''

  try {
    if (mode.value === 'login') {
      await login(email.value, password.value)
    } else {
      if (password.value !== confirmPassword.value) {
        throw new Error('Passwords do not match')
      }
      await signup(email.value, password.value, fullName.value, role.value)
    }
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>