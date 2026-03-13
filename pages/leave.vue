<template>
  <main class="p-6">
    <!-- Header & Actions -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Leave Management</h1>

      <div class="space-x-2">
        <NuxtLink
          to="/leave/request"
          class="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          New Leave Request
        </NuxtLink>

        <NuxtLink
          to="/leave/export"
          class="inline-block px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Export Excel
        </NuxtLink>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-4 gap-4 mb-6">
      <div class="bg-white rounded-2xl p-4">
        <p class="text-sm text-gray-500">Pending Requests</p>
        <p class="text-2xl font-bold text-yellow-600">12</p>
      </div>
      <div class="bg-white rounded-2xl p-4">
        <p class="text-sm text-gray-500">Approved This Month</p>
        <p class="text-2xl font-bold text-green-600">28</p>
      </div>
      <div class="bg-white rounded-2xl p-4">
        <p class="text-sm text-gray-500">Rejected This Month</p>
        <p class="text-2xl font-bold text-red-600">5</p>
      </div>
      <div class="bg-white rounded-2xl p-4">
        <p class="text-sm text-gray-500">Total Leave Days</p>
        <p class="text-2xl font-bold text-blue-600">156</p>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-2xl p-4 overflow-x-auto">
      <table class="w-full text-left min-w-[800px]">
        <thead class="border-b border-gray-400">
          <tr>
            <th class="p-4">ID</th>
            <th>Employee Name</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>Days</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="leave in leaveRequests"
            :key="leave.id"
            class="border-b border-gray-400 hover:bg-gray-50"
          >
            <td class="p-4 py-5">{{ leave.id }}</td>
            <td class="font-medium">{{ leave.employeeName }}</td>
            <td>{{ leave.fromDate }}</td>
            <td>{{ leave.toDate }}</td>
            <td>{{ leave.days }} days</td>
            <td class="max-w-xs truncate">{{ leave.reason }}</td>
            <td>
              <span :class="getStatusClass(leave.status)" class="px-2 py-1 rounded text-sm">
                {{ leave.status }}
              </span>
            </td>
            <td class="space-x-3">
              <button
                v-if="leave.status === 'Pending'"
                @click="approveLeave(leave.id)"
                class="text-green-600 hover:underline"
              >
                Approve
              </button>
              <button
                v-if="leave.status === 'Pending'"
                @click="rejectLeave(leave.id)"
                class="text-red-600 hover:underline"
              >
                Reject
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script setup>

const leaveRequests = [
  {
    id: 1,
    employeeName: "IU",
    leaveType: "Annual Leave",
    fromDate: "2026-03-15",
    toDate: "2026-03-17",
    days: 3,
    reason: "Family vacation trip to Jeju Island",
    status: "Pending",
  },
  {
    id: 2,
    employeeName: "Kim Jisoo",
    leaveType: "Sick Leave",
    fromDate: "2026-03-10",
    toDate: "2026-03-11",
    days: 2,
    reason: "Flu and fever, doctor's appointment",
    status: "Approved",
  },
  {
    id: 3,
    employeeName: "Ashley Williams",
    leaveType: "Personal Leave",
    fromDate: "2026-03-20",
    toDate: "2026-03-20",
    days: 1,
    reason: "Bank appointment and personal errands",
    status: "Pending",
  },
  {
    id: 4,
    employeeName: "Nick Jackel",
    leaveType: "Annual Leave",
    fromDate: "2026-04-01",
    toDate: "2026-04-05",
    days: 5,
    reason: "Wedding anniversary celebration",
    status: "Rejected",
  },
  {
    id:5,
    employeeName: "Sarah Chen",
    leaveType: "Maternity Leave",
    fromDate: "2026-05-01",
    toDate: "2026-07-31",
    days: 90,
    reason: "Childbirth and postpartum recovery",
    status: "Approved",
  }
]

const getStatusClass = (status) => {
  switch (status) {
    case 'Approved':
      return 'bg-green-100 text-green-700'
    case 'Rejected':
      return 'bg-red-100 text-red-700'
    case 'Pending':
      return 'bg-yellow-100 text-yellow-700'
    default:
      return 'bg-gray-100 text-gray-700'    
  }
}

const approveLeave = (id) => {
  console.log('Approved leave request:', id)
  // Implement approval logic
}

const rejectLeave = (id) => {
  console.log('Rejected leave request:', id)
  // Implement rejection logic
}
</script>