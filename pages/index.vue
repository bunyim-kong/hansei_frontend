<template>
  <div class="w-full max-w-lg">
    <div class="bg-white rounded-2xl shadow-2xl p-8">

      <!-- Header -->
      <div class="text-center mb-6">
        <div class="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3">
          <i class="fas fa-users-cog text-white text-xl"></i>
        </div>
        <h1 class="text-2xl font-bold">Hansei Electronics</h1>
        <p class="text-gray-500 text-sm">Attendance & Management System</p>
      </div>

      <!-- Tabs -->
      <div class="flex justify-center mb-6 gap-6">
        <button
          @click="mode='login'"
          :class="mode==='login'
          ? 'font-semibold border-b-2 border-blue-600 pb-1'
          : 'text-gray-400'"
        >
          Login
        </button>

        <button
          @click="mode='signup'"
          :class="mode==='signup'
          ? 'font-semibold border-b-2 border-blue-600 pb-1'
          : 'text-gray-400'"
        >
          Sign Up
        </button>
      </div>

      <!-- FORM -->
      <form @submit.prevent="handleSubmit" class="space-y-4">

        <!-- LOGIN -->
        <div v-if="mode==='login'" class="space-y-4">

          <div>
            <label class="text-sm text-gray-600">Email</label>
            <input
              v-model="email"
              type="email"
              required
              placeholder="you@example.com"
              class="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            >
          </div>

          <div>
            <label class="text-sm text-gray-600">Password</label>
            <input
              v-model="password"
              type="password"
              required
              placeholder="••••••••"
              class="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            >
          </div>

        </div>

        <!-- SIGNUP -->
        <div v-if="mode==='signup'" class="grid grid-cols-2 gap-4">

          <div class="col-span-2">
            <label class="text-sm text-gray-600">Full Name</label>
            <input
              v-model="fullName"
              type="text"
              required
              placeholder="John Smith"
              class="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            >
          </div>

          <div class="col-span-2">
            <label class="text-sm text-gray-600">Email</label>
            <input
              v-model="email"
              type="email"
              required
              placeholder="you@example.com"
              class="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            >
          </div>

          <div>
            <label class="text-sm text-gray-600">Password</label>
            <input
              v-model="password"
              type="password"
              required
              placeholder="••••••••"
              class="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            >
          </div>

          <div>
            <label class="text-sm text-gray-600">Confirm Password</label>
            <input
              v-model="confirmPassword"
              type="password"
              required
              placeholder="••••••••"
              class="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            >
          </div>

        </div>

        <!-- ROLE SELECT -->
        <div v-if="mode==='signup'">
          <label class="text-sm text-gray-600">Select Role</label>

          <div class="grid grid-cols-2 gap-3 mt-2">

            <!-- ADMIN -->
            <div
              @click="role='Admin'"
              :class="role==='Admin'
              ? 'border-blue-600 bg-blue-50'
              : 'border-gray-200'"
              class="cursor-pointer border rounded-lg p-3 text-center hover:border-blue-400 transition"
            >
              <i class="fas fa-user-shield text-blue-600 text-lg"></i>
              <p class="text-sm font-medium mt-1">Admin</p>
            </div>

            <!-- EMPLOYEE -->
            <div
              @click="role='Employee'"
              :class="role==='Employee'
              ? 'border-blue-600 bg-blue-50'
              : 'border-gray-200'"
              class="cursor-pointer border rounded-lg p-3 text-center hover:border-blue-400 transition"
            >
              <i class="fas fa-user text-blue-600 text-lg"></i>
              <p class="text-sm font-medium mt-1">Employee</p>
            </div>

          </div>
        </div>

        <!-- ERROR -->
        <div v-if="error" class="bg-red-50 text-red-600 text-sm p-3 rounded">
          {{ error }}
        </div>

        <!-- BUTTON -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
        >

          <span v-if="loading">
            <i class="fas fa-spinner fa-spin mr-2"></i>
            Processing...
          </span>

          <span v-else>
            {{ mode === 'login' ? 'Login' : 'Create Account' }}
          </span>

        </button>

      </form>

    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'auth' })

import { useAuth } from '~/composables/useAuth'

const { login, signup } = useAuth()

const mode = ref('login')

const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const role = ref('Employee')

const loading = ref(false)
const error = ref('')

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

      await signup(
        email.value,
        password.value,
        fullName.value,
        role.value
      )

    }

  } catch (e) {

    error.value = e.message

  }

  loading.value = false
}
</script>