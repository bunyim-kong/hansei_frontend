<script setup>
import { ref, computed } from "vue"


const employees = ref([
  { name: 'Sreypov Cooper', email: 'janecoop@gmail.com', payroll: '121948ASH3', dept: 'Finance', role: 'Sr. Accountant', date: 'Feb 23, 2025', type: 'Full-time' },
  { name: 'Seyha Simmons', email: 'seyha@gmail.com', payroll: 'BHABHD127', dept: 'Engineering', role: 'Back End Dev', date: 'Feb 18, 2025', type: 'Freelance' },
  { name: 'Pech Howard', email: 'estherh@gmail.com', payroll: '772910GHA', dept: 'Design', role: 'UI/UX Designer', date: 'Feb 12, 2025', type: 'Full-time' },
  { name: 'Pech Cooper', email: 'pechcoop@gmail.com', payroll: '456789XYZ', dept: 'Marketing', role: 'Marketing Specialist', date: 'Feb 10, 2025', type: 'Part-time' }
])

const totalEmployees = computed(() => employees.value.length)

const fullTime = computed(() =>
  employees.value.filter(emp => emp.type === "Full-time").length
)

const freelance = computed(() =>
  employees.value.filter(emp => emp.type === "Freelance").length
)

const partTime = computed(() =>
  employees.value.filter(emp => emp.type === "Part-time").length
)

</script>

<template>
  <div class="flex">

    <AppSidebar />

    <main class="flex-1 p-10 bg-gray-50 min-h-screen">

      <h1 class="text-3xl font-bold text-gray-800 mb-8">
        Dashboard
      </h1>

      <!-- Cards -->
      <div class="grid grid-cols-4 gap-6 mb-10">

        <div class="bg-white p-6 rounded-xl shadow">
          <p class="text-gray-500 text-sm">Total Employees</p>
          <h2 class="text-3xl font-bold text-blue-600 mt-2">
            {{ totalEmployees }}
          </h2>
        </div>

        <div class="bg-white p-6 rounded-xl shadow">
          <p class="text-gray-500 text-sm">Full-time Employees</p>
          <h2 class="text-3xl font-bold text-green-600 mt-2">
            {{ fullTime }}
          </h2>
        </div>

        <div class="bg-white p-6 rounded-xl shadow">
          <p class="text-gray-500 text-sm">Freelance Employees</p>
          <h2 class="text-3xl font-bold text-purple-600 mt-2">
            {{ freelance }}
          </h2>
        </div>

        <div class="bg-white p-6 rounded-xl shadow">
          <p class="text-gray-500 text-sm">Part-time Employees</p>
          <h2 class="text-3xl font-bold text-orange-500 mt-2">
            {{ partTime }}
          </h2>
        </div>

      </div>

      <!-- Employee Table -->
      <div class="bg-white p-6 rounded-2xl shadow">

        <h2 class="text-lg font-bold mb-6">
          Employee List
        </h2>

        <table class="w-full">

          <thead>
            <tr class="text-left text-gray-400 text-xs uppercase border-b">
              <th class="pb-4">Employee Name</th>
              <th class="pb-4">Payroll ID</th>
              <th class="pb-4">Department</th>
              <th class="pb-4">Status</th>
            </tr>
          </thead>

          <tbody class="divide-y">

            <tr v-for="emp in employees" :key="emp.payroll">

              <td class="py-4 flex items-center gap-3">
                <div
                  class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                  {{ emp.name.charAt(0) }}
                </div>

                <div>
                  <p class="font-semibold">{{ emp.name }}</p>
                  <p class="text-xs text-gray-400">{{ emp.email }}</p>
                </div>
              </td>

              <td class="py-4 text-sm text-gray-600">
                {{ emp.payroll }}
              </td>

              <td class="py-4">
                <span class="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-xs font-semibold">
                  {{ emp.dept }}
                </span>
              </td>

              <td class="py-4">
                <span :class="emp.type === 'Full-time'
                  ? 'bg-green-100 text-green-700'
                  : emp.type === 'Freelance'
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-orange-100 text-orange-700'" class="px-3 py-1 rounded-full text-xs font-bold">
                  {{ emp.type }}
                </span>
              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </main>

  </div>
</template>