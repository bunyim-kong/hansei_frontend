<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center flex-wrap gap-4">
      <h3 class="text-lg font-semibold text-gray-800">Week of {{ currentWeek }}</h3>
      <div class="flex gap-2">
        <button class="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
          <i class="fas fa-chevron-left mr-2"></i>Previous
        </button>
        <button class="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
          Next<i class="fas fa-chevron-right ml-2"></i>
        </button>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm overflow-x-auto">
      <div class="grid grid-cols-8 min-w-[900px] border-b border-gray-200 bg-gray-50">
        <div class="p-4 font-semibold text-gray-700">Day</div>
        <div v-for="day in weekDays" :key="day" class="p-4 text-center font-semibold text-gray-700 text-sm">
          {{ day }}
        </div>
      </div>
      <div class="grid grid-cols-8 border-b border-gray-100 hover:bg-gray-50">
        <div class="p-4 font-medium text-gray-800 flex items-center">You</div>
        <div v-for="(shift, idx) in personalShifts" :key="idx" class="p-2">
          <div :class="`rounded-lg p-2 text-center text-xs ${shift.color} ${shift.text}`">
            <p class="font-bold">{{ shift.time }}</p>
            <p class="opacity-75">{{ shift.type }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const personalShifts = [
  { time: '9:00-17:00', type: 'Office', color: 'bg-blue-100', text: 'text-blue-700' },
  { time: '9:00-17:00', type: 'Office', color: 'bg-blue-100', text: 'text-blue-700' },
  { time: '9:00-17:00', type: 'Office', color: 'bg-blue-100', text: 'text-blue-700' },
  { time: '9:00-17:00', type: 'Office', color: 'bg-blue-100', text: 'text-blue-700' },
  { time: '9:00-17:00', type: 'Office', color: 'bg-blue-100', text: 'text-blue-700' },
  { time: 'Off', type: 'Rest', color: 'bg-gray-100', text: 'text-gray-500' },
  { time: 'Off', type: 'Rest', color: 'bg-gray-100', text: 'text-gray-500' },
]

const currentWeek = computed(() => {
  const now = new Date()
  const start = new Date(now.setDate(now.getDate() - now.getDay() + 1))
  return start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
})
</script>   