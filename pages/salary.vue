<script setup>
const { user, isAdmin } = useAuth()

const selectedMonth = ref('march-2026')
const months = [
  { value: 'january-2026',  label: 'January 2026' },
  { value: 'february-2026', label: 'February 2026' },
  { value: 'march-2026',    label: 'March 2026' },
]

const employeeReports = ref([
  { id: 1,  name: 'Sophea Chan',   position: 'HR Manager',         department: 'Human Resources', salary: 1500, attendance: 95, status: 'Paid',    statusClass: 'bg-green-100 text-green-700' },
  { id: 2,  name: 'Dara Meas',     position: 'HR Officer',         department: 'Human Resources', salary: 900,  attendance: 90, status: 'Paid',    statusClass: 'bg-green-100 text-green-700' },
  { id: 3,  name: 'Ratha Lim',     position: 'IT Manager',         department: 'IT',              salary: 1800, attendance: 88, status: 'Paid',    statusClass: 'bg-green-100 text-green-700' },
  { id: 4,  name: 'Pisey Keo',     position: 'Software Developer', department: 'IT',              salary: 1200, attendance: 92, status: 'Paid',    statusClass: 'bg-green-100 text-green-700' },
  { id: 5,  name: 'Virak Sorn',    position: 'Software Developer', department: 'IT',              salary: 1200, attendance: 85, status: 'Pending', statusClass: 'bg-yellow-100 text-yellow-700' },
  { id: 6,  name: 'Channary Ros',  position: 'Finance Manager',    department: 'Finance',         salary: 1600, attendance: 97, status: 'Paid',    statusClass: 'bg-green-100 text-green-700' },
  { id: 7,  name: 'Borey Phan',    position: 'Accountant',         department: 'Finance',         salary: 1000, attendance: 91, status: 'Paid',    statusClass: 'bg-green-100 text-green-700' },
  { id: 8,  name: 'Sreyleak Noun', position: 'Operations Manager', department: 'Operations',      salary: 1400, attendance: 93, status: 'Paid',    statusClass: 'bg-green-100 text-green-700' },
  { id: 9,  name: 'Kosal Heng',    position: 'Logistics Staff',    department: 'Operations',      salary: 800,  attendance: 80, status: 'Pending', statusClass: 'bg-yellow-100 text-yellow-700' },
  { id: 10, name: 'Leak Sok',      position: 'Marketing Manager',  department: 'Marketing',       salary: 1300, attendance: 94, status: 'Paid',    statusClass: 'bg-green-100 text-green-700' },
  { id: 11, name: 'Menghour Thy',  position: 'Content Creator',    department: 'Marketing',       salary: 750,  attendance: 87, status: 'Paid',    statusClass: 'bg-green-100 text-green-700' },
])

const totalSalary = computed(() =>
  employeeReports.value.reduce((sum, emp) => sum + emp.salary, 0)
)

const avgAttendance = computed(() => {
  const avg = employeeReports.value.reduce((sum, emp) => sum + emp.attendance, 0) / employeeReports.value.length
  return Math.round(avg)
})

const departmentSummary = computed(() => {
  const deptMap = {}
  employeeReports.value.forEach(emp => {
    if (!deptMap[emp.department]) {
      deptMap[emp.department] = { name: emp.department, count: 0, salary: 0 }
    }
    deptMap[emp.department].count++
    deptMap[emp.department].salary += emp.salary
  })
  return Object.values(deptMap)
})
</script>

<template>
  <div class="space-y-6">

    <!-- ========== EMPLOYEE VIEW ========== -->
    <template v-if="!isAdmin">
      <!-- Month Header -->
      <div class="flex justify-between items-center flex-wrap gap-4">
        <h3 class="text-lg font-semibold text-gray-800">My Salary Report</h3>
        <select v-model="selectedMonth" class="border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option v-for="month in months" :key="month.value" :value="month.value">{{ month.label }}</option>
        </select>
      </div>

      <!-- Salary Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="p-4 bg-blue-50 rounded-xl">
          <p class="text-sm text-gray-600 mb-1">Base Salary</p>
          <p class="text-2xl font-bold text-gray-800">$4,500</p>
        </div>
        <div class="p-4 bg-green-50 rounded-xl">
          <p class="text-sm text-gray-600 mb-1">Overtime</p>
          <p class="text-2xl font-bold text-gray-800">$320</p>
        </div>
        <div class="p-4 bg-purple-50 rounded-xl">
          <p class="text-sm text-gray-600 mb-1">Bonus</p>
          <p class="text-2xl font-bold text-gray-800">$250</p>
        </div>
        <div class="p-4 bg-orange-50 rounded-xl">
          <p class="text-sm text-gray-600 mb-1">Net Pay</p>
          <p class="text-2xl font-bold text-gray-800">$4,820</p>
        </div>
      </div>

      <!-- Attendance Summary -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h4 class="font-bold text-gray-800 mb-4">Attendance Summary</h4>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="flex items-center gap-4 p-4 bg-green-50 rounded-xl">
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <i class="fas fa-check text-green-600 text-lg"></i>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-800">20</p>
              <p class="text-sm text-gray-500">Present Days</p>
            </div>
          </div>
          <div class="flex items-center gap-4 p-4 bg-yellow-50 rounded-xl">
            <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <i class="fas fa-clock text-yellow-600 text-lg"></i>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-800">2</p>
              <p class="text-sm text-gray-500">Late Days</p>
            </div>
          </div>
          <div class="flex items-center gap-4 p-4 bg-red-50 rounded-xl">
            <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <i class="fas fa-times text-red-600 text-lg"></i>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-800">1</p>
              <p class="text-sm text-gray-500">Absent Days</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Leave Summary -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h4 class="font-bold text-gray-800 mb-4">Leave Summary</h4>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="p-4 bg-blue-50 rounded-xl text-center">
            <p class="text-2xl font-bold text-gray-800">14</p>
            <p class="text-sm text-gray-500">Available Days</p>
          </div>
          <div class="p-4 bg-green-50 rounded-xl text-center">
            <p class="text-2xl font-bold text-gray-800">8</p>
            <p class="text-sm text-gray-500">Used This Year</p>
          </div>
          <div class="p-4 bg-yellow-50 rounded-xl text-center">
            <p class="text-2xl font-bold text-gray-800">1</p>
            <p class="text-sm text-gray-500">Pending Request</p>
          </div>
        </div>
      </div>

      <!-- Payslip Download -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h4 class="font-bold text-gray-800">Payslip</h4>
            <p class="text-sm text-gray-500">Download your payslip for the selected month</p>
          </div>
          <button class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <i class="fas fa-download"></i> Download Payslip
          </button>
        </div>
      </div>
    </template>

    <!-- ========== ADMIN VIEW ========== -->
    <template v-if="isAdmin">

      <!-- Month Header -->
      <div class="flex justify-between items-center flex-wrap gap-4">
        <h3 class="text-lg font-semibold text-gray-800">Company Report</h3>
        <select v-model="selectedMonth" class="border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option v-for="month in months" :key="month.value" :value="month.value">{{ month.label }}</option>
        </select>
      </div>

      <!-- Admin Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="p-4 bg-blue-50 rounded-xl">
          <p class="text-sm text-gray-600 mb-1">Total Employees</p>
          <p class="text-2xl font-bold text-gray-800">{{ employeeReports.length }}</p>
        </div>
        <div class="p-4 bg-green-50 rounded-xl">
          <p class="text-sm text-gray-600 mb-1">Total Salary Paid</p>
          <p class="text-2xl font-bold text-gray-800">${{ totalSalary.toLocaleString() }}</p>
        </div>
        <div class="p-4 bg-yellow-50 rounded-xl">
          <p class="text-sm text-gray-600 mb-1">Avg Attendance</p>
          <p class="text-2xl font-bold text-gray-800">{{ avgAttendance }}%</p>
        </div>
        <div class="p-4 bg-red-50 rounded-xl">
          <p class="text-sm text-gray-600 mb-1">Pending Leaves</p>
          <p class="text-2xl font-bold text-gray-800">3</p>
        </div>
      </div>

      <!-- Department Summary -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h4 class="font-bold text-gray-800 mb-4">Department Summary</h4>
        <div class="space-y-3">
          <div
            v-for="dept in departmentSummary"
            :key="dept.name"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
          >
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <i class="fas fa-users text-blue-600 text-sm"></i>
              </div>
              <div>
                <p class="font-medium text-gray-800">{{ dept.name }}</p>
                <p class="text-xs text-gray-400">{{ dept.count }} employees</p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-bold text-gray-800">${{ dept.salary.toLocaleString() }}</p>
              <p class="text-xs text-gray-400">Total Salary</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Employee Salary Table -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h4 class="font-bold text-gray-800">Employee Salary Report</h4>
          <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm">
            <i class="fas fa-download"></i> Export Report
          </button>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="w-full min-w-[700px]">
            <thead>
              <tr class="bg-gray-50 rounded-xl">
                <th class="text-left p-4 text-sm font-semibold text-gray-600">Employee</th>
                <th class="text-left p-4 text-sm font-semibold text-gray-600">Department</th>
                <th class="text-left p-4 text-sm font-semibold text-gray-600">Base Salary</th>
                <th class="text-left p-4 text-sm font-semibold text-gray-600">Attendance</th>
                <th class="text-left p-4 text-sm font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="emp in employeeReports"
                :key="emp.id"
                class="border-t border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td class="p-4">
                  <div class="flex items-center gap-3">
                    <div class="w-9 h-9 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {{ emp.name.charAt(0) }}
                    </div>
                    <div>
                      <p class="font-medium text-gray-800 text-sm">{{ emp.name }}</p>
                      <p class="text-xs text-gray-400">{{ emp.position }}</p>
                    </div>
                  </div>
                </td>
                <td class="p-4 text-sm text-gray-600">{{ emp.department }}</td>
                <td class="p-4 text-sm font-medium text-gray-800">${{ emp.salary.toLocaleString() }}</td>
                <td class="p-4">
                  <div class="flex items-center gap-2">
                    <div class="flex-1 bg-gray-200 rounded-full h-2 w-20">
                      <div
                        class="bg-blue-500 h-2 rounded-full"
                        :style="`width: ${emp.attendance}%`"
                      ></div>
                    </div>
                    <span class="text-xs text-gray-600">{{ emp.attendance }}%</span>
                  </div>
                </td>
                <td class="p-4">
                  <span :class="`px-3 py-1 rounded-full text-xs font-medium ${emp.statusClass}`">
                    {{ emp.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </template>
  </div>
</template>