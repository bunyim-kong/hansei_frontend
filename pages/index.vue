<template>
  <main class="p-6">
    <!-- Header & Actions -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Dashboard</h1>

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
      <div v-for="summery in summaries" :key="summery.title" class="bg-white rounded-2xl p-4">
        <p class="text-sm text-gray-500">{{ summery.title }}</p>
        <p class="text-3xl font-bold text-yellow-600">{{ summery.count }}</p>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-2xl p-4 overflow-x-auto">
      <table class="w-full text-left min-w-[800px]">
        <thead class="border-b border-gray-400">
          <tr>
            <th class="p-4">ID</th>
            <th>Name</th>
            <th>Module</th>
            <th>Status</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="log in logs" :key="log.id"
            class="border-b border-gray-400 hover:bg-gray-50"
          >
            <td class="p-4 py-5">{{ log.id }}</td>
            <td class="font-medium">{{ log.name }}</td>
            <td>{{ log.module }}</td>
            <td>{{ log.status }}</td>
            <td>{{ log.time }}</td>
            <td class="max-w-xs truncate"></td>
            <td>
              
            </td>

          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script setup>
// Props: pass summary and logs from parent if needed
const props = defineProps({
  summaries: {
    type: Array,
    default: () => [
      { title: 'Total Staff', count: 12 },
      { title: 'In Office', count: 8 },
      { title: 'On Leave', count: 2 },
      { title: 'Roster Tasks', count: 5 }
    ]
  },
  logs: {
    type: Array,
    default: () => [
      { 
        id: 1, 
        name: 'Sok Dara', 
        module: 'Attendance', 
        status: 'In', 
        statusColor: 'bg-green-100 text-green-700', 
        time: '08:02 AM' 
      },
      { 
        id: 2, 
        name: 'Chan Ty', 
        module: 'Leave Mgt', 
        status: 'Pending', 
        statusColor: 'bg-orange-100 text-orange-700', 
        time: '09:15 AM' 
      },
      { 
        id: 3, 
        name: 'Keo Roth', 
        module: 'Roster', 
        status: 'Assigned', 
        statusColor: 'bg-blue-100 text-blue-700', 
        time: '10:00 AM' 
      }
    ]
  }
})

// Helper to get the class for a status badge
const getStatusClass = (status) => {
  switch (status) {
    case 'In': return 'bg-green-100 text-green-700'
    case 'Pending': return 'bg-orange-100 text-orange-700'
    case 'Assigned': return 'bg-blue-100 text-blue-700'
    default: return 'bg-gray-100 text-gray-700'
  }
}

// Example actions for leave requests
const approveLeave = (id) => alert(`Approved leave ID ${id}`)
const rejectLeave = (id) => alert(`Rejected leave ID ${id}`)
</script>