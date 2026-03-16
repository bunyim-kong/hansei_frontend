<template>
  <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl w-full max-w-md p-6">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold text-gray-800">Add New Employee</h3>
        <button @click="showAddEmployee = false" class="text-gray-400 hover:text-gray-600">
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>
      
      <form @submit.prevent="submit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input v-model="form.name" type="text" required class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input v-model="form.email" type="email" required class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Department</label>
          <select v-model="form.department" class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
            <option v-for="d in departments" :key="d" :value="d">{{ d }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Position</label>
          <input v-model="form.position" type="text" required class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
        </div>
        
        <div class="flex gap-3 mt-6">
          <button 
            type="button" 
            @click="showAddEmployee = false" 
            class="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Employee
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const { showAddEmployee } = useModals()

const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations']

const form = ref({
  name: '',
  email: '',
  department: 'Engineering',
  position: '',
  status: 'Active'
})

const submit = () => {
  showAddEmployee.value = false
  form.value = { name: '', email: '', department: 'Engineering', position: '', status: 'Active' }
}
</script>