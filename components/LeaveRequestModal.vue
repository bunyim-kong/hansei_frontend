<template>
  <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl w-full max-w-md p-6">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold text-gray-800">Request Leave</h3>
        <button @click="showLeaveRequest = false" class="text-gray-400 hover:text-gray-600">
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>
      
      <form @submit.prevent="submit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
          <select v-model="form.type" class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
            <option>Annual Leave</option>
            <option>Sick Leave</option>
            <option>Personal Leave</option>
            <option>Unpaid Leave</option>
          </select>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input v-model="form.startDate" type="date" required class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input v-model="form.endDate" type="date" required class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Reason</label>
          <textarea v-model="form.reason" rows="3" required class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
        </div>
        
        <div class="flex gap-3 mt-6">
          <button 
            type="button" 
            @click="showLeaveRequest = false" 
            class="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const { showLeaveRequest } = useModals()

const form = ref({
  type: 'Annual Leave',
  startDate: '',
  endDate: '',
  reason: ''
})

const submit = () => {
  showLeaveRequest.value = false
  form.value = { type: 'Annual Leave', startDate: '', endDate: '', reason: '' }
}
</script>