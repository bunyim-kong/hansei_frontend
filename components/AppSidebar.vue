<template>
  <aside class="w-64 bg-white shadow-xl fixed h-full z-20">
    <div class="p-6 border-b border-gray-100">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-linear-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
          <i class="fas fa-users-cog text-white"></i>
        </div>
        <div>
          <h2 class="font-bold text-gray-800">Hansei Electronics</h2>
          <p class="text-xs text-gray-500">Management System</p>
        </div>
      </div>
    </div>
    
    <nav class="p-4 space-y-1">
      <NuxtLink 
        v-for="item in visibleMenuItems" 
        :key="item.id"
        :to="item.path"
        class="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200"
        :class="isActive(item.path) ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : 'text-gray-600 hover:bg-gray-50'"
      >
        <i :class="item.icon" class="w-5"></i>
        <span class="font-medium">{{ item.label }}</span>
      </NuxtLink>
    </nav>
    
    <div class="absolute bottom-0 w-full p-4 border-t border-gray-100">
      <button 
        @click="logout" 
        class="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all"
      >
        <i class="fas fa-sign-out-alt"></i>
        <span class="font-medium">Logout</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
const { logout, isAdmin } = useAuth()
const route = useRoute()

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-home', path: '/dashboard' },
  { id: 'employees', label: 'Employees', icon: 'fas fa-users', path: '/employees', adminOnly: true },
  { id: 'attendance', label: 'Attendance', icon: 'fas fa-clock', path: '/attendance' },
  { id: 'roster', label: 'Roster', icon: 'fas fa-calendar-alt', path: '/roster' },
  { id: 'leave', label: 'Leave', icon: 'fas fa-umbrella-beach', path: '/leave' },
  { id: 'salary', label: 'Report', icon: 'fas fa-file-invoice-dollar', path: '/salary' },
]

const visibleMenuItems = computed(() => {
  if (isAdmin.value) return menuItems
  return menuItems.filter(item => !item.adminOnly)
})

const isActive = (path) => route.path === path
</script>