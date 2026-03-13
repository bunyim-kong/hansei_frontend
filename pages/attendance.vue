<template>
  <main class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Attendance Management</h1>
      <NuxtLink to="/attendance/add" class="solid_btn">
        Add Attendance
      </NuxtLink>
    </div>
    
    <div class="bg-white rounded-2xl p-4">
      <table class="w-full text-left">
        <thead class="border-b border-gray-400">
          <tr>
            <th class="p-4">ID</th>
            <th>Name</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in attendance"
            :key="item.id"
            class="border-b border-gray-300 hover:bg-gray-50"
          >
            <td class="p-4">{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.checkin }}</td>
            <td>{{ item.checkout }}</td>
            <td>
              <span
                :class="{
                  'bg-green-100 text-green-700': item.status === 'Present',
                  'bg-yellow-100 text-yellow-700': item.status === 'Late',
                  'bg-red-100 text-red-700': item.status === 'Absent',
                  'bg-blue-100 text-blue-700': item.status === 'Permission'
                }"
                class="px-2 py-1 rounded text-sm font-medium"
              >
                {{ item.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue"

const attendance = ref([
  {
    id: 1,
    name: "IU",
    checkin: "08:00 AM",
    checkout: "05:00 PM",
    status: "Present"
  },
  {
    id: 2,
    name: "Kim Jisoo",
    checkin: "09:15 AM",
    checkout: "05:00 PM",
    status: "Late"
  },
  {
    id: 3,
    name: "Ashley Williams",
    checkin: "-",
    checkout: "-",
    status: "Absent"
  },
  {
    id: 4,
    name: "Nick Jackel",
    checkin: "-",
    checkout: "-",
    status: "Permission"
  },
  {
    id: 5,
    name: "Roseanne Park",
    checkin: "07:55 AM",
    checkout: "05:10 PM",
    status: "Present"
  }
])
</script>