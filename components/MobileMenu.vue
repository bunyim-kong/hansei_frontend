<template>
  <div class="lg:hidden fixed top-0 w-full bg-white shadow-md z-30 px-4 py-3 flex justify-between items-center">
    <div class="flex items-center gap-2">
      <div class="w-8 h-8 bg-linear-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
        <i class="fas fa-users-cog text-white text-sm"></i>
      </div>
      <span class="font-bold text-gray-800">Workforce Pro</span>
    </div>
    <button @click="mobileMenuOpen = !mobileMenuOpen" class="p-2 text-gray-600">
      <i class="fas fa-bars text-xl"></i>
    </button>
  </div>

  <div v-if="mobileMenuOpen" class="lg:hidden fixed inset-0 bg-black/50 z-20" @click="mobileMenuOpen = false">
    <div class="absolute right-0 top-0 h-full w-64 bg-white shadow-xl p-4 pt-16" @click.stop>
      <nav class="space-y-1">
        <NuxtLink 
          v-for="item in visibleMenuItems" 
          :key="item.id"
          :to="item.path"
          @click="mobileMenuOpen = false"
          class="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all"
          :class="isActive(item.path) ? 'bg-blue-50 text-blue-600' : 'text-gray-600'"
        >
          <i :class="item.icon"></i>
          <span>{{ item.label }}</span>
        </NuxtLink>
        <button @click="logout" class="w-full flex items-center gap-3 px-4 py-3 text-red-600 mt-4">
          <i class="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup>
const { logout, isAdmin } = useAuth()
const route = useRoute()
const mobileMenuOpen = ref(false)

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-home', path: '/' },
  { id: 'attendance', label: 'Attendance', icon: 'fas fa-clock', path: '/attendance' },
  { id: 'roster', label: 'My Schedule', icon: 'fas fa-calendar-alt', path: '/roster' },
  { id: 'leave', label: 'Leave', icon: 'fas fa-umbrella-beach', path: '/leave' },
  { id: 'salary', label: 'Payslip', icon: 'fas fa-file-invoice-dollar', path: '/salary' },
  { id: 'employees', label: 'Employees', icon: 'fas fa-users', path: '/employees', adminOnly: true },
]

const visibleMenuItems = computed(() => {
  if (isAdmin.value) return menuItems
  return menuItems.filter(item => !item.adminOnly)
})

const isActive = (path) => route.path === path
</script>