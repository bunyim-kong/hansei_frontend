<template>
  <div class="space-y-6">
    <!-- Admin Dashboard -->
    <div v-if="isAdmin">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard 
          v-for="stat in adminStats" 
          :key="stat.title"
          v-bind="stat"
        />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h3 class="font-bold text-gray-800 mb-4">Recent Activity</h3>
          <div class="space-y-4">
            <div 
              v-for="(act, i) in recentActivities" 
              :key="i" 
              class="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div :class="`w-10 h-10 rounded-full flex items-center justify-center ${act.bgColor}`">
                <i :class="`${act.icon} ${act.color}`"></i>
              </div>
              <div class="flex-1">
                <p class="font-medium text-gray-800">{{ act.title }}</p>
                <p class="text-sm text-gray-500">{{ act.time }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h3 class="font-bold text-gray-800 mb-4">Quick Actions</h3>
          <div class="grid grid-cols-2 gap-4">
            <NuxtLink 
              v-for="action in adminQuickActions" 
              :key="action.label"
              :to="action.path"
              class="flex gap-4 p-4 border-2 border-gray-100 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
            >
              <i :class="`${action.icon} text-2xl mb-2 block ${action.color} group-hover:scale-110 transition-transform`"></i>
              <span class="font-medium text-gray-700">{{ action.label }}</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Employee Dashboard -->
    <div v-else class="space-y-6">
      <div class="bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 sm:p-8 text-white">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <h2 class="text-2xl sm:text-3xl font-bold mb-2">Welcome back, {{ user.firstName }}</h2>
            <p class="text-blue-100 opacity-90">{{ currentTime }} • {{ currentDate }}</p>
          </div>
          <div class="text-right">
            <p class="text-sm text-blue-100 mb-2">Your Status</p>
            <span :class="`px-5 py-2 rounded-full text-sm font-bold ${checkedIn ? 'bg-green-500' : 'bg-orange-500'}`">
              {{ checkedIn ? 'Checked In' : 'Not Checked In' }}
            </span>
          </div>
        </div>
        
        <div class="mt-6 flex flex-col sm:flex-row gap-4">
          <button 
            @click="checkIn" 
            :disabled="checkedIn"
            class="flex-1 bg-white text-blue-600 py-4 rounded-xl font-bold hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02]"
          >
            <i class="fas fa-sign-in-alt mr-2"></i> Check In
          </button>
          <button 
            @click="checkOut" 
            :disabled="!checkedIn"
            class="flex-1 bg-blue-800 text-white py-4 rounded-xl font-bold hover:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02]"
          >
            <i class="fas fa-sign-out-alt mr-2"></i> Check Out
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div class="bg-white rounded-xl shadow-sm p-6 text-center">
          <div class="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <i class="fas fa-clock text-blue-600 text-2xl"></i>
          </div>
          <h3 class="text-2xl font-bold text-gray-800">118 h 45 m</h3>
          <p class="text-gray-500">Hours this month</p>
        </div>
        <div class="bg-white rounded-xl shadow-sm p-6 text-center">
          <div class="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <i class="fas fa-calendar-check text-green-600 text-2xl"></i>
          </div>
          <h3 class="text-2xl font-bold text-gray-800">14</h3>
          <p class="text-gray-500">Leave days left</p>
        </div>
        <div class="bg-white rounded-xl shadow-sm p-6 text-center">
          <div class="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <i class="fas fa-file-invoice-dollar text-purple-600 text-2xl"></i>
          </div>
          <h3 class="text-2xl font-bold text-gray-800">$4,820</h3>
          <p class="text-gray-500">Last payslip</p>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-6">
        <h3 class="font-bold text-gray-800 mb-4">Upcoming Schedule</h3>
        <div class="space-y-3">
          <div 
            v-for="(shift, i) in upcomingShifts" 
            :key="i" 
            class="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
          >
            <div>
              <p class="font-medium">{{ shift.day }}</p>
              <p class="text-sm text-gray-600">{{ shift.time }} • {{ shift.type }}</p>
            </div>
            <span class="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700">{{ shift.location || 'Office' }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { user, isAdmin } = useAuth()

const checkedIn = ref(false)
const currentTime = ref('')

const updateTime = () => {
  currentTime.value = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

onMounted(() => {
  updateTime()
  setInterval(updateTime, 60000)
})

const currentDate = computed(() => {
  return new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
})

const checkIn = () => { checkedIn.value = true }
const checkOut = () => { checkedIn.value = false }

const adminStats = [
  { title: 'Total Employees', value: '48', trend: 12, icon: 'fas fa-users', color: 'text-blue-600', bgColor: 'bg-blue-100' },
  { title: 'Present Today', value: '42', trend: 5, icon: 'fas fa-check-circle', color: 'text-green-600', bgColor: 'bg-green-100' },
  { title: 'On Leave', value: '4', trend: -2, icon: 'fas fa-umbrella-beach', color: 'text-orange-600', bgColor: 'bg-orange-100' },
  { title: 'Pending Requests', value: '6', trend: 8, icon: 'fas fa-clock', color: 'text-purple-600', bgColor: 'bg-purple-100' },
]

const recentActivities = [
  { title: 'John Smith checked in', time: '5 min ago', icon: 'fas fa-sign-in-alt', color: 'text-green-600', bgColor: 'bg-green-100' },
  { title: 'New leave request - Emily', time: '1 hr ago', icon: 'fas fa-file-alt', color: 'text-blue-600', bgColor: 'bg-blue-100' },
  { title: 'Payroll processed', time: '3 hrs ago', icon: 'fas fa-dollar-sign', color: 'text-purple-600', bgColor: 'bg-purple-100' },
]

const adminQuickActions = [
  { label: 'Check Team Attendance', icon: 'fas fa-clock', color: 'text-green-600', path: '/attendance' },
  { label: 'Manage Employees', icon: 'fas fa-users-cog', color: 'text-blue-600', path: '/employees' },
  { label: 'Review Leaves', icon: 'fas fa-calendar-times', color: 'text-orange-600', path: '/leave' },
]

const upcomingShifts = [
  { day: 'Today (Mar 15)', time: '09:00 – 17:00', type: 'Office', location: 'Headquarters' },
  { day: 'Tomorrow', time: '09:00 – 17:00', type: 'Office' },
  { day: 'Wednesday', time: '09:00 – 17:00', type: 'Office' },
]
</script>