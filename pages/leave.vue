<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div class="bg-white rounded-xl shadow-sm p-6 text-center">
        <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-calendar-check text-blue-600 text-2xl"></i>
        </div>
        <h3 class="text-3xl font-bold text-gray-800">14</h3>
        <p class="text-gray-500">Available Days</p>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-6 text-center">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-check-circle text-green-600 text-2xl"></i>
        </div>
        <h3 class="text-3xl font-bold text-gray-800">8</h3>
        <p class="text-gray-500">Used This Year</p>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-6 text-center">
        <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-clock text-orange-600 text-2xl"></i>
        </div>
        <h3 class="text-3xl font-bold text-gray-800">1</h3>
        <p class="text-gray-500">Pending Requests</p>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm p-6">
      <div class="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h3 class="font-bold text-gray-800">My Leave Requests</h3>
        <button 
          @click="showLeaveRequest = true" 
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <i class="fas fa-plus"></i> Request Leave
        </button>
      </div>
      
      <div class="space-y-4">
        <div 
          v-for="req in leaveRequests" 
          :key="req.id" 
          class="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
        >
          <div class="flex justify-between items-start flex-wrap gap-4">
            <div class="flex gap-4">
              <div class="w-12 h-12 bg-linear-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                {{ user.name.charAt(0) }}
              </div>
              <div>
                <h4 class="font-bold text-gray-800">{{ req.type }}</h4>
                <p class="text-sm text-gray-500">{{ req.days }} days • {{ req.dates }}</p>
                <p class="text-sm text-gray-400 mt-1">{{ req.reason }}</p>
              </div>
            </div>
            <span :class="`px-3 py-1 rounded-full text-xs font-medium ${req.statusClass}`">
              {{ req.status }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { user } = useAuth()
const { showLeaveRequest } = useModals()

const leaveRequests = ref([
  { id: 1, type: 'Annual Leave', days: 3, dates: 'Mar 24-26, 2026', reason: 'Family trip', status: 'Pending', statusClass: 'bg-yellow-100 text-yellow-700' },
  { id: 2, type: 'Sick Leave', days: 1, dates: 'Feb 18, 2026', reason: 'Fever & flu', status: 'Approved', statusClass: 'bg-green-100 text-green-700' },
])
</script>