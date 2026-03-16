<template>
  <div class="p-10 bg-gray-100 min-h-screen">

    <!-- Title -->
    <h1 class="text-3xl font-bold mb-6">Workforce Reports</h1>

    <!-- FILTER DROPDOWN -->
    <div class="mb-8 flex items-center gap-4">

      <select v-model="selectedFilter" @change="applyFilter" class="border rounded-lg px-4 py-2 bg-white">
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
        <option value="custom">Select Date</option>
      </select>

      <!-- CUSTOM DATE RANGE -->
      <div v-if="selectedFilter === 'custom'" class="flex gap-2">

        <input type="date"  v-model="startDate" class="border rounded-lg px-3 py-2"/>

        <span class="flex items-center">-</span>

        <input type="date" v-model="endDate"  class="border rounded-lg px-3 py-2"/>

        <button  @click="applyCustomFilter" class="bg-blue-600 text-white px-4 py-2 rounded-lg" >
          Apply
        </button>

      </div>

    </div>

    <!-- REPORT CARDS -->
    <div class="grid grid-cols-3 gap-6 mb-10">

      <div class="bg-white p-6 rounded-xl shadow">
        <p class="text-gray-500">Total Employees</p>
        <h2 class="text-2xl font-bold">{{ report.totalEmployees }}</h2>
      </div>

      <div class="bg-white p-6 rounded-xl shadow">
        <p class="text-gray-500">Present</p>
        <h2 class="text-2xl font-bold">{{ report.present }}</h2>
      </div>

      <div class="bg-white p-6 rounded-xl shadow">
        <p class="text-gray-500">Total Salary</p>
        <h2 class="text-2xl font-bold">${{ report.salary }}</h2>
      </div>

    </div>

    <!-- CHARTS -->
    <div class="grid grid-cols-2 gap-6 mb-10">

      <div class="bg-white p-6 rounded-xl shadow">
        <h2 class="font-semibold mb-4">Attendance Chart</h2>
        <canvas ref="attendanceCanvas"></canvas>
      </div>

      <div class="bg-white p-6 rounded-xl shadow">
        <h2 class="font-semibold mb-4">Salary Distribution</h2>
        <canvas ref="salaryCanvas"></canvas>
      </div>

    </div>

    <!-- EMPLOYEE TABLE -->
    <div class="bg-white rounded-xl shadow p-6">

      <h2 class="font-semibold mb-4">Employee List</h2>

      <table class="w-full text-left">

        <thead>
          <tr class="border-b">
            <th class="p-3">Name</th>
            <th class="p-3">Department</th>
            <th class="p-3">Attendance</th>
            <th class="p-3">Salary</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="emp in employees" :key="emp.id" class="border-b hover:bg-gray-50" >
            <td class="p-3">{{ emp.name }}</td>
            <td class="p-3">{{ emp.department }}</td>
            <td class="p-3">{{ emp.attendance }}</td>
            <td class="p-3">${{ emp.salary }}</td>
          </tr>
        </tbody>

      </table>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import Chart from "chart.js/auto"

/* FILTER STATE */
const selectedFilter = ref("weekly")
const startDate = ref("")
const endDate = ref("")

/* REPORT DATA */
const report = ref({
  totalEmployees: 20,
  present: 18,
  salary: 15000
})

/* EMPLOYEES */
const employees = ref([
  { id: 1, name: "John", department: "IT", attendance: "Present", salary: 800 },
  { id: 2, name: "Anna", department: "HR", attendance: "Late", salary: 750 },
  { id: 3, name: "David", department: "Finance", attendance: "Absent", salary: 900 }
])

/* CHART REFS */
const attendanceCanvas = ref(null)
const salaryCanvas = ref(null)

let attendanceChart
let salaryChart

/* CREATE CHARTS */
const createCharts = () => {

  attendanceChart = new Chart(attendanceCanvas.value, {
    type: "bar",
    data: {
      labels: ["Present", "Late", "Absent", "Leave"],
      datasets: [{
        label: "Attendance",
        data: [18, 2, 1, 1]
      }]
    }
  })

  salaryChart = new Chart(salaryCanvas.value, {
    type: "pie",
    data: {
      labels: ["IT", "HR", "Finance"],
      datasets: [{
        data: [5000, 4000, 6000]
      }]
    }
  })

}

/* FILTER LOGIC */
const applyFilter = () => {

  if (selectedFilter.value === "weekly") {
    report.value = {
      totalEmployees: 50,
      present: 100,
      salary: 15000
    }
  }

  if (selectedFilter.value === "monthly") {
    report.value = {
      totalEmployees: 20,
      present: 70,
      salary: 60000
    }
  }

  if (selectedFilter.value === "yearly") {
    report.value = {
      totalEmployees: 20,
      present: 800,
      salary: 700000
    }
  }

}

/* CUSTOM DATE FILTER */
const applyCustomFilter = () => {

  console.log("Start:", startDate.value)
  console.log("End:", endDate.value)

  // Here you would fetch filtered data
}

/* INIT */
onMounted(() => {
  createCharts()
})
</script>