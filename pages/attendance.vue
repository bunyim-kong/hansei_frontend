<template>
  <!-- Content -->
  <main class="p-6">

    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Attendance</h1>

      <NuxtLink to="/attendance/add" class="solid_btn">
        Add Attendance
      </NuxtLink>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-2xl p-4">

      <table class="w-full text-left">

        <thead class="border-b border-gray-400">
          <tr>
            <th class="p-4">ID</th>
            <th>Employee</th>
            <th>Date</th>
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
            <td>{{ item.date }}</td>
            <td>{{ item.checkin }}</td>
            <td>{{ item.checkout }}</td>

            <td>
              <span
                :class="item.status == 'Present'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'"
                class="px-2 py-1 rounded text-sm"
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
    date: "2026-03-13",
    checkin: "08:00 AM",
    checkout: "05:00 PM",
    status: "Present"
  },
  {
    id: 2,
    name: "Kim Jisoo",
    date: "2026-03-13",
    checkin: "08:10 AM",
    checkout: "05:00 PM",
    status: "Present"
  },
  {
    id: 3,
    name: "Ashley Williams",
    date: "2026-03-13",
    checkin: "-",
    checkout: "-",
    status: "Absent"
  },
  {
    id: 4,
    name: "Nick Jackel",
    date: "2026-03-13",
    checkin: "08:30 AM",
    checkout: "05:00 PM",
    status: "Present"
  }
])

</script> 