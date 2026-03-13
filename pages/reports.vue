<template>
  <div class="min-h-screen bg-gray-100 p-10">


    <h1 class="text-3xl font-bold mb-8">Report</h1>


    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

      <div class="bg-white p-6 rounded-xl shadow">
        <p class="text-gray-500">Total Employees</p>
        <h2 class="text-3xl font-bold mt-2">120</h2>
      </div>

      <div class="bg-white p-6 rounded-xl shadow">
        <p class="text-gray-500">Active Staff</p>
        <h2 class="text-3xl font-bold mt-2">110</h2>
      </div>

      <div class="bg-white p-6 rounded-xl shadow">
        <p class="text-gray-500">On Leave</p>
        <h2 class="text-3xl font-bold mt-2">7</h2>
      </div>

      <div class="bg-white p-6 rounded-xl shadow">
        <p class="text-gray-500">New Employees</p>
        <h2 class="text-3xl font-bold mt-2">3</h2>
      </div>

    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

      <div class="bg-white rounded-xl shadow p-6">


        <h2 class="text-xl font-semibold mb-4">Attendance Chart</h2>

        <div class="h-60 flex  pl-2 pt-2 bg-gray-100 rounded-lg">
         <div>
            <span class="font-bold-md ">Present</span> 
         </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow p-6">
        <h2 class="text-xl font-semibold mb-4">Department Distribution</h2>

        <div class="h-60 flex items-center justify-center bg-gray-100 rounded-lg">
          Chart Here
        </div>
      </div>

    </div>

    <!-- Employee Table -->
    <div class="bg-white rounded-xl shadow p-6">

      <h2 class="text-xl font-semibold mb-4">Recent Attendance</h2>

      <table class="w-full text-left border-collapse">

        <thead>
          <tr class="border-b">
            <th class="p-3">Employee</th>
            <th class="p-3">Department</th>
            <th class="p-3">Date</th>
            <th class="p-3">Status</th>
          </tr>
        </thead>

        <tbody>

          <tr  v-for=" Attendance in Attendances ":key="Attendance.employee " class="border-b hover:bg-gray-50">
            <td class="p-3">{{ Attendance.employee }}</td>
            <td class="p-3">{{ Attendance.position }}</td>
            <td class="p-3">{{ Attendance.date }}</td>
            <td
                  class="p-3 font-medium"
                  :class="
                    Attendance.status === 'Present'
                      ? 'text-green-600'
                      : Attendance.status === 'Absent'
                      ? 'text-red-600'
                      : Attendance.status === 'Late'
                      ? 'text-yellow-500'
                      : Attendance.status === 'Leave'
                      ? 'text-blue-600'
                      : 'text-gray-500'">
                  {{ Attendance.status }}
            </td>
          </tr>


        </tbody>

      </table>

    </div>

  </div>
</template>

<script setup>




    const Attendances = [
        {
            employee: "yimyim",
            position: "IT",
            date: "5878435974590",
            status: "Absent"
        },

         
        {
            employee: "bobo",
            position: "boxer",
            date: "437596",
            status: "late"

        },
        {
            employee: "Khaii",
            position: "sleeper",
            date: "23521-1",
            status: "Present"

        },
        {
            employee: "Khaii",
            position: "sleeper",
            date: "23521-1",
            status: "Leave"

        }
    ]


</script>

<style>
</style>