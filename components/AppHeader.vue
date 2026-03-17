<template>
  <header class="bg-white shadow-sm sticky top-0 z-10 px-6 sm:px-8 py-4">
    <div class="flex justify-between items-center">

      <!-- Title -->
      <div>
        <h1 class="text-xl sm:text-2xl font-bold text-gray-800">{{ pageTitle }}</h1>
        <p class="text-sm text-gray-500 mt-1">{{ currentDate }}</p>
      </div>

      <div class="flex items-center gap-4">

        <!-- Notification -->
        <button class="p-2 text-gray-400 hover:text-gray-600 relative">
          <i class="fas fa-bell text-xl"></i>
          <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <!-- Profile Dropdown -->
        <div class="relative">

          <button
            @click="toggleMenu"
            class="flex items-center gap-3 pl-4 border-l border-gray-200"
          >
            <div class="text-right hidden sm:block">
              <p class="font-semibold text-gray-800">{{ user.name }}</p>
              <p class="text-xs text-gray-500">{{ user.role }}</p>
            </div>

            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
              {{ user.name?.charAt(0) }}
            </div>
          </button>

          <!-- Dropdown -->
          <div
            v-if="menuOpen"
            class="absolute right-0 mt-3 w-44 bg-white border border-gray-100 rounded-lg shadow-lg overflow-hidden"
          >

            <NuxtLink
              to="/profile"
              class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50"
            >
              <i class="fas fa-user text-gray-500"></i>
              Profile
            </NuxtLink>

            <NuxtLink
              to="/settings"
              class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50"
            >
              <i class="fas fa-cog text-gray-500"></i>
              Settings
            </NuxtLink>

          </div>

        </div>

      </div>
    </div>
  </header>
</template>

<script setup>
const { user } = useAuth()
const route = useRoute()

const menuOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/attendance': 'Attendance',
  '/roster': 'My Schedule',
  '/leave': 'Leave',
  '/salary': 'Payslip',
  '/employees': 'Employees',
  '/profile': 'My Profile',
  '/settings': 'Settings'
}

const pageTitle = computed(() => pageTitles[route.path] || 'Dashboard')

const currentDate = computed(() => {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})
</script>