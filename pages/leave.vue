<template>
  <div class="space-y-6">

    <!-- ========== EMPLOYEE VIEW ========== -->
    <template v-if="!isAdmin">
      <!-- Stats Cards -->
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
          <h3 class="text-3xl font-bold text-gray-800">{{ pendingCount }}</h3>
          <p class="text-gray-500">Pending Requests</p>
        </div>
      </div>

      <!-- Employee Leave Requests -->
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
                <div class="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
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
    </template>

    <!-- for admin -->
    <template v-if="isAdmin">

      <div class="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div class="bg-white rounded-xl shadow-sm p-6 text-center">
          <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-clock text-yellow-600 text-2xl"></i>
          </div>
          <h3 class="text-3xl font-bold text-gray-800">{{ pendingRequests.length }}</h3>
          <p class="text-gray-500">Pending</p>
        </div>
        <div class="bg-white rounded-xl shadow-sm p-6 text-center">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-check-circle text-green-600 text-2xl"></i>
          </div>
          <h3 class="text-3xl font-bold text-gray-800">{{ approvedRequests.length }}</h3>
          <p class="text-gray-500">Approved</p>
        </div>
        <div class="bg-white rounded-xl shadow-sm p-6 text-center">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-times-circle text-red-600 text-2xl"></i>
          </div>
          <h3 class="text-3xl font-bold text-gray-800">{{ rejectedRequests.length }}</h3>
          <p class="text-gray-500">Rejected</p>
        </div>
        <div class="bg-white rounded-xl shadow-sm p-6 text-center">
          <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-calendar-alt text-blue-600 text-2xl"></i>
          </div>
          <h3 class="text-3xl font-bold text-gray-800">{{ allLeaveRequests.length }}</h3>
          <p class="text-gray-500">Total Requests</p>
        </div>
      </div>

      <!-- Admin Leave Management Table -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h3 class="text-[18px] font-bold text-gray-800">Leave Requests Management</h3>
          <!-- Filter -->
          <div class="flex gap-2">
            <button
              v-for="tab in tabs"
              :key="tab.value"
              @click="activeTab = tab.value"
              :class="`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`"
            >
              {{ tab.label }}
            </button>
          </div>
        </div>

        <!-- Requests List -->
        <div class="space-y-4">
          <div
            v-for="req in filteredRequests"
            :key="req.id"
            class="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
          >
            <div class="flex justify-between items-start flex-wrap gap-4">
              <div class="flex gap-4">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {{ req.employeeName.charAt(0) }}
                </div>
                <div>
                  <h4 class="font-bold text-gray-800">{{ req.employeeName }}</h4>
                  <p class="text-sm text-gray-500">{{ req.department }}</p>
                  <p class="text-sm text-blue-600 font-medium mt-1">{{ req.type }}</p>
                  <p class="text-sm text-gray-500">{{ req.days }} days • {{ req.dates }}</p>
                  <p class="text-sm text-gray-400 mt-1">
                    <span class="font-medium text-gray-600">Reason: </span>{{ req.reason }}
                  </p>
                </div>
              </div>

              <!-- Status + Action Buttons -->
              <div class="flex flex-col items-end gap-3">
                <span :class="`px-3 py-1 rounded-full text-xs font-medium ${req.statusClass}`">
                  {{ req.status }}
                </span>

                <!-- Show approve/reject only for pending -->
                <div v-if="req.status === 'Pending'" class="flex gap-2">
                  <button
                    @click="approveLeave(req.id)"
                    class="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors flex items-center gap-1"
                  >
                    <i class="fas fa-check"></i> Approve
                  </button>
                  <button
                    @click="rejectLeave(req.id)"
                    class="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition-colors flex items-center gap-1"
                  >
                    <i class="fas fa-times"></i> Reject
                  </button>
                </div>

                <p v-else class="text-xs text-gray-400">
                  Actioned by Admin
                </p>
              </div>
            </div>
          </div>

          <div v-if="filteredRequests.length === 0" class="text-center py-12 text-gray-400">
            <i class="fas fa-inbox text-4xl mb-3"></i>
            <p>No {{ activeTab }} requests found</p>
          </div>
        </div>
      </div>
    </template>

  </div>
</template>

<script setup>
const { user, isAdmin } = useAuth()
const { showLeaveRequest } = useModals()

const leaveRequests = ref([
  { id: 1, type: 'Annual Leave', days: 3, dates: 'Mar 24-26, 2026', reason: 'Family trip', status: 'Pending', statusClass: 'bg-yellow-100 text-yellow-700' },
  { id: 2, type: 'Sick Leave', days: 1, dates: 'Feb 18, 2026', reason: 'Fever & flu', status: 'Approved', statusClass: 'bg-green-100 text-green-700' },
])

const pendingCount = computed(() => leaveRequests.value.filter(r => r.status === 'Pending').length)

const allLeaveRequests = ref([
  { id: 1, employeeName: 'Sophea Chan',   department: 'Human Resources',      type: 'Sick Leave',    days: 2, dates: 'Mar 21-22, 2026', reason: 'Fever and cold',              status: 'Pending',  statusClass: 'bg-yellow-100 text-yellow-700' },
  { id: 2, employeeName: 'Dara Meas',     department: 'Human Resources',      type: 'Annual Leave',  days: 1, dates: 'Mar 25, 2026',     reason: 'Family event',                status: 'Pending',  statusClass: 'bg-yellow-100 text-yellow-700' },
  { id: 3, employeeName: 'Ratha Lim',     department: 'Information Technology', type: 'Sick Leave',  days: 1, dates: 'Mar 18, 2026',     reason: 'Doctor appointment',          status: 'Approved', statusClass: 'bg-green-100 text-green-700' },
  { id: 4, employeeName: 'Sreyleak Noun', department: 'Operations',            type: 'Sick Leave',   days: 2, dates: 'Mar 20-21, 2026',  reason: 'Sick and recovery',           status: 'Approved', statusClass: 'bg-green-100 text-green-700' },
  { id: 5, employeeName: 'Virak Sorn',    department: 'Information Technology', type: 'Annual Leave', days: 2, dates: 'Mar 28-29, 2026', reason: 'Personal errand out of town', status: 'Pending',  statusClass: 'bg-yellow-100 text-yellow-700' },
  { id: 6, employeeName: 'Borey Phan',    department: 'Finance',               type: 'Annual Leave', days: 1, dates: 'Mar 27, 2026',     reason: 'Wedding ceremony',            status: 'Rejected', statusClass: 'bg-red-100 text-red-700' },
])

const tabs = [
  { label: 'All',      value: 'all' },
  { label: 'Pending',  value: 'Pending' },
  { label: 'Approved', value: 'Approved' },
  { label: 'Rejected', value: 'Rejected' },
]
const activeTab = ref('all')

const filteredRequests = computed(() => {
  if (activeTab.value === 'all') return allLeaveRequests.value
  return allLeaveRequests.value.filter(r => r.status === activeTab.value)
})

const pendingRequests  = computed(() => allLeaveRequests.value.filter(r => r.status === 'Pending'))
const approvedRequests = computed(() => allLeaveRequests.value.filter(r => r.status === 'Approved'))
const rejectedRequests = computed(() => allLeaveRequests.value.filter(r => r.status === 'Rejected'))

// admin action
const approveLeave = (id) => {
  const req = allLeaveRequests.value.find(r => r.id === id)
  if (req) {
    req.status = 'Approved'
    req.statusClass = 'bg-green-100 text-green-700'
  }
}

const rejectLeave = (id) => {
  const req = allLeaveRequests.value.find(r => r.id === id)
  if (req) {
    req.status = 'Rejected'
    req.statusClass = 'bg-red-100 text-red-700'
  }
}
</script>