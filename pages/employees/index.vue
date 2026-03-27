<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search employees..."
          class="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-full sm:w-64"
        >
        <select
          v-model="filterDepartment"
          class="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">All Departments</option>
          <option v-for="dept in departments" :key="dept.id" :value="dept.name">{{ dept.name }}</option>
        </select>
      </div>
      <button
        @click="showAddEmployee = true"
        class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 whitespace-nowrap"
      >
        <i class="fas fa-plus"></i> Add Employee
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="text-center text-gray-400">
        <i class="fas fa-spinner fa-spin text-4xl mb-3"></i>
        <p>Loading employees...</p>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center py-20 text-red-500">
      <i class="fas fa-exclamation-circle text-4xl mb-3"></i>
      <p>Failed to load employees. Please try again.</p>
    </div>

    <!-- Table -->
    <div v-else class="bg-white rounded-xl shadow-sm overflow-x-auto">
      <table class="w-full min-w-[800px]">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Employee</th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Department</th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Position</th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr
            v-for="emp in filteredEmployees"
            :key="emp.id"
            class="hover:bg-gray-50 transition-colors"
          >
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {{ emp.name.charAt(0) }}
                </div>
                <div>
                  <p class="font-medium text-gray-800">{{ emp.name }}</p>
                  <p class="text-sm text-gray-500">{{ emp.email }}</p>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 text-gray-600">{{ emp.departments?.name ?? '-' }}</td>
            <td class="px-6 py-4 text-gray-600">{{ emp.positions?.name ?? '-' }}</td>
            <td class="px-6 py-4">
              <button class="text-blue-600 hover:text-blue-800 mr-3">
                <i class="fas fa-edit"></i>
              </button>
              <button @click="deleteEmployee(emp.id)" class="text-red-600 hover:text-red-800">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>

          <!-- Empty state -->
          <tr v-if="filteredEmployees.length === 0">
            <td colspan="4" class="text-center py-12 text-gray-400">
              <i class="fas fa-users text-4xl mb-3 block"></i>
              No employees found
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

definePageMeta({
  middleware: 'admin'
})

const { showAddEmployee } = useModals()

const employees = ref([])
const departments = ref([])
const searchQuery = ref('')
const filterDepartment = ref('')
const loading = ref(true)
const error = ref(false)

onMounted(() => {
  fetchEmployees()
  fetchDepartments()
})

async function fetchEmployees() {
try {
    const response = await axios.get('http://127.0.0.1:8000/api/employees')
      employees.value = response.data
      console.log(employees.value)
  }   
    
  catch (err) {
    console.error('Error fetching employees:', err)
    error.value = true
  } 
    
  finally {
    loading.value = false
  }
}

async function fetchDepartments() {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/departments')
      departments.value = response.data
      console.log(departments.value)
  } 
  
  catch (err) {
    console.error('Error fetching departments:', err)
  }
}

async function deleteEmployee(id) {
  if (!confirm('Delete this employee?')) return
  try {
    await axios.delete(`http://127.0.0.1:8000/api/employees/${id}`)
      employees.value = employees.value.filter(emp => emp.id !== id)
  } 
  
  catch (err) {
    console.error('Error deleting employee:', err)
  }
}

const filteredEmployees = computed(() => {
  return employees.value.filter(emp => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesDept =
      !filterDepartment.value ||
      emp.department?.name === filterDepartment.value
    return matchesSearch && matchesDept
  })
})
</script>