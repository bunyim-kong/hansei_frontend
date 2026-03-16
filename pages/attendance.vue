<template>
  <div class="space-y-6">
    <div class="bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 sm:p-8 text-white">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h2 class="text-3xl font-bold mb-2">{{ currentTime }}</h2>
          <p class="text-blue-100">{{ currentDate }}</p>
        </div>
        <div class="text-right">
          <p class="text-sm text-blue-100 mb-1">Your Status</p>
          <span :class="`px-4 py-2 rounded-full text-sm font-bold ${checkedIn ? 'bg-green-500' : 'bg-orange-500'}`">
            {{ checkedIn ? 'Checked In' : 'Not Checked In' }}
          </span>
        </div>
      </div>
      
      <div class="mt-8 flex flex-col sm:flex-row gap-4">
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

    <div class="bg-white rounded-xl shadow-sm p-6">
      <h3 class="font-bold text-gray-800 mb-4">Recent Attendance</h3>
      <div class="space-y-3">
        <div 
          v-for="record in attendanceRecords" 
          :key="record.id" 
          class="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
        >
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <i class="fas fa-calendar-day text-blue-600"></i>
            </div>
            <div>
              <p class="font-medium text-gray-800">{{ record.date }}</p>
              <p class="text-sm text-gray-500">{{ record.day }}</p>
            </div>
          </div>
          <div class="text-right">
            <p class="font-medium">{{ record.inTime || '-' }} — {{ record.outTime || '-' }}</p>
            <span class="text-xs px-2 py-1 rounded" :class="record.statusColor">
              {{ record.status }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
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

const checkIn = () => { 
  checkedIn.value = true 
  attendanceRecords.value.unshift({
    id: Date.now(),
    date: 'Today',
    day: 'Now',
    inTime: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}),
    outTime: '-',
    status: 'Working',
    statusColor: 'bg-green-100 text-green-700'
  })
}

const checkOut = () => { 
  checkedIn.value = false 
  if (attendanceRecords.value.length > 0) {
    attendanceRecords.value[0].outTime = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})
    attendanceRecords.value[0].status = 'Present'
    attendanceRecords.value[0].statusColor = 'bg-blue-100 text-blue-700'
  }
}

const attendanceRecords = ref([
  { id: 1, date: 'Mar 15, 2026', day: 'Today', inTime: '08:52', outTime: '-', status: 'Working', statusColor: 'bg-green-100 text-green-700' },
  { id: 2, date: 'Mar 14, 2026', day: 'Yesterday', inTime: '08:45', outTime: '17:38', status: 'Present', statusColor: 'bg-blue-100 text-blue-700' },
  { id: 3, date: 'Mar 13, 2026', day: 'Friday', inTime: '09:05', outTime: '18:10', status: 'Present', statusColor: 'bg-blue-100 text-blue-700' },
])
</script>