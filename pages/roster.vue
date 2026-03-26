<template>
  <div class="space-y-6">

    <!-- Week Navigation (both admin and employee see this) -->
    <div class="flex justify-between items-center flex-wrap gap-4">
      <h3 class="text-lg font-semibold text-gray-800">Week of {{ currentWeek }}</h3>
      <div class="flex gap-2">
        <button @click="prevWeek" class="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
          <i class="fas fa-chevron-left mr-2"></i>Previous
        </button>
        <button @click="nextWeek" class="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
          Next<i class="fas fa-chevron-right ml-2"></i>
        </button>
      </div>
    </div>

    <!-- ========== EMPLOYEE VIEW ========== -->
    <template v-if="!isAdmin">
      <div class="bg-white rounded-xl shadow-sm overflow-x-auto">
        <!-- Header -->
        <div class="grid grid-cols-8 min-w-[900px] border-b border-gray-200 bg-gray-50">
          <div class="p-4 font-semibold text-gray-700">Employee</div>
          <div v-for="day in weekDays" :key="day" class="p-4 text-center font-semibold text-gray-700 text-sm">
            {{ day }}
          </div>
        </div>
        <!-- My Schedule Row -->
        <div class="grid grid-cols-8 min-w-[900px] border-b border-gray-100 hover:bg-gray-50">
          <div class="p-4 font-medium text-gray-800 flex items-center gap-3">
            <div class="w-9 h-9 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {{ user.name.charAt(0) }}
            </div>
            <span>You</span>
          </div>
          <div v-for="(shift, idx) in personalShifts" :key="idx" class="p-2">
            <div :class="`rounded-lg p-2 text-center text-xs ${shift.color} ${shift.text}`">
              <p class="font-bold">{{ shift.time }}</p>
              <p class="opacity-75">{{ shift.type }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Employee Legend -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h4 class="font-semibold text-gray-700 mb-4">Schedule Legend</h4>
        <div class="flex flex-wrap gap-4">
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 rounded bg-blue-100"></div>
            <span class="text-sm text-gray-600">Office</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 rounded bg-green-100"></div>
            <span class="text-sm text-gray-600">Remote</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 rounded bg-gray-100"></div>
            <span class="text-sm text-gray-600">Off</span>
          </div>
        </div>
      </div>
    </template>

    <!-- ========== ADMIN VIEW ========== -->
    <template v-if="isAdmin">

      <!-- Admin Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div class="bg-white rounded-xl shadow-sm p-6 text-center">
          <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-building text-blue-600 text-2xl"></i>
          </div>
          <h3 class="text-3xl font-bold text-gray-800">{{ officeCount }}</h3>
          <p class="text-gray-500">In Office</p>
        </div>
        <div class="bg-white rounded-xl shadow-sm p-6 text-center">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-home text-green-600 text-2xl"></i>
          </div>
          <h3 class="text-3xl font-bold text-gray-800">{{ remoteCount }}</h3>
          <p class="text-gray-500">Remote</p>
        </div>
        <div class="bg-white rounded-xl shadow-sm p-6 text-center">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-moon text-gray-500 text-2xl"></i>
          </div>
          <h3 class="text-3xl font-bold text-gray-800">{{ offCount }}</h3>
          <p class="text-gray-500">Day Off</p>
        </div>
      </div>

      <!-- Admin Schedule Table -->
      <div class="bg-white rounded-xl shadow-sm overflow-x-auto">
        <!-- Header -->
        <div class="grid grid-cols-8 min-w-[900px] border-b border-gray-200 bg-gray-50">
          <div class="p-4 font-semibold text-gray-700">Employee</div>
          <div v-for="day in weekDays" :key="day" class="p-4 text-center font-semibold text-gray-700 text-sm">
            {{ day }}
          </div>
        </div>

        <!-- Employee Rows -->
        <div
          v-for="employee in employeeRosters"
          :key="employee.id"
          class="grid grid-cols-8 min-w-[900px] border-b border-gray-100 hover:bg-gray-50"
        >
          <!-- Employee Name -->
          <div class="p-4 flex items-center gap-3">
            <div class="w-9 h-9 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {{ employee.name.charAt(0) }}
            </div>
            <div>
              <p class="font-medium text-gray-800 text-sm">{{ employee.name }}</p>
              <p class="text-xs text-gray-400">{{ employee.department }}</p>
            </div>
          </div>

          <!-- Shift Cells -->
          <div v-for="(shift, idx) in employee.shifts" :key="idx" class="p-2">
            <div
              :class="`rounded-lg p-2 text-center text-xs cursor-pointer hover:opacity-80 transition-opacity ${getShiftStyle(shift).color} ${getShiftStyle(shift).text}`"
              @click="openEditShift(employee, idx, shift)"
            >
              <p class="font-bold">{{ getShiftStyle(shift).time }}</p>
              <p class="opacity-75 capitalize">{{ shift }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Legend -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h4 class="font-semibold text-gray-700 mb-4">
          Schedule Legend
          <span class="text-sm font-normal text-gray-400 ml-2">— Click any cell to edit</span>
        </h4>
        <div class="flex flex-wrap gap-4">
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 rounded bg-blue-100"></div>
            <span class="text-sm text-gray-600">Office</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 rounded bg-green-100"></div>
            <span class="text-sm text-gray-600">Remote</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 rounded bg-gray-100"></div>
            <span class="text-sm text-gray-600">Off</span>
          </div>
        </div>
      </div>

      <!-- Edit Shift Modal -->
      <div
        v-if="editModal.show"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      >
        <div class="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
          <h3 class="font-bold text-gray-800 text-lg mb-1">Edit Schedule</h3>
          <p class="text-sm text-gray-500 mb-6">
            {{ editModal.employeeName }} — {{ weekDays[editModal.dayIndex] }}
          </p>

          <div class="space-y-3 mb-6">
            <button
              v-for="option in shiftOptions"
              :key="option.value"
              @click="editModal.selected = option.value"
              :class="`w-full p-3 rounded-xl border-2 text-left flex items-center gap-3 transition-all ${
                editModal.selected === option.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`"
            >
              <div :class="`w-4 h-4 rounded ${option.color}`"></div>
              <div>
                <p class="font-medium text-gray-800">{{ option.label }}</p>
                <p class="text-xs text-gray-400">{{ option.desc }}</p>
              </div>
            </button>
          </div>

          <div class="flex gap-3">
            <button
              @click="saveShift"
              class="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Save
            </button>
            <button
              @click="editModal.show = false"
              class="flex-1 border border-gray-200 text-gray-600 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

    </template>
  </div>
</template>

<script setup>
const { user, isAdmin } = useAuth()

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

// ===== WEEK NAVIGATION =====
const weekOffset = ref(0)

const currentWeek = computed(() => {
  const now = new Date()
  now.setDate(now.getDate() - now.getDay() + 1 + weekOffset.value * 7)
  return now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
})

const prevWeek = () => weekOffset.value--
const nextWeek = () => weekOffset.value++

// ===== EMPLOYEE DATA =====
const personalShifts = ref([
  { time: '9:00-17:00', type: 'Office',  color: 'bg-blue-100',  text: 'text-blue-700' },
  { time: '9:00-17:00', type: 'Office',  color: 'bg-blue-100',  text: 'text-blue-700' },
  { time: 'Remote',     type: 'Remote',  color: 'bg-green-100', text: 'text-green-700' },
  { time: '9:00-17:00', type: 'Office',  color: 'bg-blue-100',  text: 'text-blue-700' },
  { time: '9:00-17:00', type: 'Office',  color: 'bg-blue-100',  text: 'text-blue-700' },
  { time: 'Off',        type: 'Rest',    color: 'bg-gray-100',  text: 'text-gray-500' },
  { time: 'Off',        type: 'Rest',    color: 'bg-gray-100',  text: 'text-gray-500' },
])

// ===== ADMIN DATA =====
const employeeRosters = ref([
  { id: 1,  name: 'Sophea Chan',   department: 'HR',         shifts: ['office', 'office', 'office', 'office', 'office', 'off', 'off'] },
  { id: 2,  name: 'Dara Meas',     department: 'HR',         shifts: ['office', 'office', 'remote', 'office', 'office', 'off', 'off'] },
  { id: 3,  name: 'Ratha Lim',     department: 'IT',         shifts: ['office', 'office', 'office', 'remote', 'office', 'off', 'off'] },
  { id: 4,  name: 'Pisey Keo',     department: 'IT',         shifts: ['remote', 'remote', 'remote', 'remote', 'remote', 'off', 'off'] },
  { id: 5,  name: 'Virak Sorn',    department: 'IT',         shifts: ['office', 'office', 'office', 'office', 'off',    'off', 'off'] },
  { id: 6,  name: 'Channary Ros',  department: 'Finance',    shifts: ['office', 'office', 'office', 'office', 'office', 'off', 'off'] },
  { id: 7,  name: 'Borey Phan',    department: 'Finance',    shifts: ['office', 'remote', 'office', 'office', 'off',    'off', 'off'] },
  { id: 8,  name: 'Sreyleak Noun', department: 'Operations', shifts: ['office', 'office', 'office', 'office', 'office', 'off', 'off'] },
  { id: 9,  name: 'Kosal Heng',    department: 'Operations', shifts: ['off',    'off',    'office', 'office', 'office', 'off', 'off'] },
  { id: 10, name: 'Leak Sok',      department: 'Marketing',  shifts: ['office', 'remote', 'remote', 'office', 'office', 'off', 'off'] },
  { id: 11, name: 'Menghour Thy',  department: 'Marketing',  shifts: ['office', 'office', 'office', 'office', 'remote', 'off', 'off'] },
])

// ===== SHIFT STYLES =====
const getShiftStyle = (shift) => {
  const styles = {
    office: { color: 'bg-blue-100',  text: 'text-blue-700',  time: '9:00-17:00' },
    remote: { color: 'bg-green-100', text: 'text-green-700', time: 'Remote' },
    off:    { color: 'bg-gray-100',  text: 'text-gray-500',  time: 'Off' },
  }
  return styles[shift] || styles.off
}

// ===== ADMIN STATS =====
const officeCount = computed(() => {
  return employeeRosters.value.filter(e => e.shifts[0] === 'office').length
})
const remoteCount = computed(() => {
  return employeeRosters.value.filter(e => e.shifts[0] === 'remote').length
})
const offCount = computed(() => {
  return employeeRosters.value.filter(e => e.shifts[0] === 'off').length
})

// ===== EDIT MODAL =====
const shiftOptions = [
  { value: 'office', label: 'Office',  desc: '9:00 AM - 5:00 PM',  color: 'bg-blue-100' },
  { value: 'remote', label: 'Remote',  desc: 'Work from home',      color: 'bg-green-100' },
  { value: 'off',    label: 'Day Off', desc: 'Rest day',            color: 'bg-gray-100' },
]

const editModal = ref({
  show: false,
  employeeId: null,
  employeeName: '',
  dayIndex: null,
  selected: 'office',
})

const openEditShift = (employee, dayIndex, currentShift) => {
  editModal.value = {
    show: true,
    employeeId: employee.id,
    employeeName: employee.name,
    dayIndex,
    selected: currentShift,
  }
}

const saveShift = () => {
  const employee = employeeRosters.value.find(e => e.id === editModal.value.employeeId)
  if (employee) {
    employee.shifts[editModal.value.dayIndex] = editModal.value.selected
  }
  editModal.value.show = false
}
</script>