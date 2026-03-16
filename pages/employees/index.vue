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
          <option v-for="dept in departments" :key="dept" :value="dept">{{ dept }}</option>
        </select>
      </div>
      <button 
        @click="showAddEmployee = true" 
        class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 whitespace-nowrap"
      >
        <i class="fas fa-plus"></i> Add Employee
      </button>
    </div>

    <div class="bg-white rounded-xl shadow-sm overflow-x-auto">
      <table class="w-full min-w-[800px]">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Employee</th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Department</th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Position</th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
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
                <div class="w-10 h-10 bg-linear-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {{ emp.name.charAt(0) }}
                </div>
                <div>
                  <p class="font-medium text-gray-800">{{ emp.name }}</p>
                  <p class="text-sm text-gray-500">{{ emp.email }}</p>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 text-gray-600">{{ emp.department }}</td>
            <td class="px-6 py-4 text-gray-600">{{ emp.position }}</td>
            <td class="px-6 py-4">
              <span :class="`px-3 py-1 rounded-full text-xs font-medium ${emp.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`">
                {{ emp.status }}
              </span>
            </td>
            <td class="px-6 py-4">
              <button class="text-blue-600 hover:text-blue-800 mr-3">
                <i class="fas fa-edit"></i>
              </button>
              <button @click="deleteEmployee(emp.id)" class="text-red-600 hover:text-red-800">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'admin'
})

const { showAddEmployee } = useModals()

const searchQuery = ref('')
const filterDepartment = ref('')

const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations']

const employees = ref([
  { id: 1, name: 'John Smith', email: 'john@company.com', department: 'Engineering', position: 'Senior Developer', status: 'Active' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah@company.com', department: 'Marketing', position: 'Marketing Manager', status: 'Active' },
  { id: 3, name: 'Mike Chen', email: 'mike@company.com', department: 'Sales', position: 'Sales Rep', status: 'Active' },
  { id: 4, name: 'Emily Davis', email: 'emily@company.com', department: 'HR', position: 'HR Specialist', status: 'On Leave' },
  { id: 5, name: 'Robert Wilson', email: 'robert@company.com', department: 'Finance', position: 'Accountant', status: 'Active' },
])

const filteredEmployees = computed(() => {
  return employees.value.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesDept = !filterDepartment.value || emp.department === filterDepartment.value
    return matchesSearch && matchesDept
  })
})

const deleteEmployee = (id) => {
  if (!confirm('Delete this employee?')) return
  employees.value = employees.value.filter(e => e.id !== id)
}
</script>