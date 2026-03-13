<template>
  <div class="flex min-h-screen bg-gray-100">

    <Aside />

    <div class="flex-1 flex flex-col">

      <Header />

      <main class="p-6">

        <div class="bg-white rounded-xl shadow overflow-x-auto">
          <table class="w-full">

            <thead class="border-b text-gray-600">
              <tr>
                <th class="p-4 text-left">Employee</th>
                <th
                  v-for="day in days"
                  :key="day"
                  class="p-4 text-left"
                >
                  {{ day }}
                </th>
              </tr>
            </thead>

            <tbody>

              <tr
                v-for="employee in filteredEmployees"
                :key="employee.name"
                class="border-b"
              >
                <td class="p-4 font-medium">
                  {{ employee.name }}
                </td>

                <td
                  v-for="day in days"
                  :key="day"
                  class="p-4"
                >

                  <!-- Shift -->
                  <div
                    v-if="employee.shifts[day]"
                    :class="shiftClass(employee.shifts[day].type)"
                    class="p-4 rounded-lg text-sm"
                  >
                    {{ employee.shifts[day].time }}
                    <br />
                    {{ employee.shifts[day].role }}
                  </div>

                  <!-- Empty -->
                  <div
                    v-else
                    class="text-gray-400 cursor-pointer"
                    @click="addShift(employee, day)"
                  >
                    +
                  </div>

                </td>

              </tr>

            </tbody>

          </table>
        </div>

      </main>

    </div>

  </div>
</template>

<script setup>
import Aside from '~/components/aside.vue'
import Header from '~/components/header.vue'
import { ref, computed } from 'vue'

const search = ref("")

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"]

const employees = ref([
  {
    name: "IU",
    shifts: {
      Mon: { time: "8:00am - 5:00pm", role: "UI Designer", type: "work" },
      Tue: { time: "8:00am - 5:00pm", role: "UI Designer", type: "work" },
      Wed: { time: "8:00am - 5:00pm", role: "UI Designer", type: "work" },
      Thu: { time: "8:00am - 5:00pm", role: "UI Designer", type: "work" },
      Fri: { time: "8:00am - 5:00pm", role: "UI Designer", type: "work" }
    }
  },
  {
    name: "KIM Jisoo",
    shifts: {
      Mon: { time: "", role: "Annual leave", type: "leave" },
      Tue: { time: "9:00 - 5:00", role: "Frontend Developer", type: "work" }, 
      Wed: { time: "9:00 - 5:00", role: "Frontend Developer", type: "work" },
      Thu: { time: "9:00 - 5:00", role: "Frontend Developer", type: "work" },
      Fri: { time: "9:00 - 5:00", role: "Frontend Developer", type: "work" }
    }
  },
  {
    name: "Ashley Williams",
    shifts: {
      Mon: { time: "8:00 - 5:00", role: "Backend Developer", type: "work" },
      Tue: { time: "8:00 - 5:00", role: "Backend Developer", type: "work" }, 
      Wed: { time: "8:00 - 5:00", role: "Backend Developer", type: "work" },
      Thu: { time: "8:00 - 5:00", role: "Backend Developer", type: "work" },
      Fri: { time: "8:00 - 5:00", role: "Backend Developer", type: "work" }
    }
  },
  {
    name: "Nick Jackel",
    shifts: {
      Mon: { time: "9:00 - 5:00pm", role: "Project Manager", type: "work" },
      Tue: { time: "9:00 - 5:00pm", role: "Project Manager", type: "work" },
      Wed: { time: "9:00 - 5:00pm", role: "Project Manager", type: "work" },
      Thu: { time: "9:00 - 5:00pm", role: "Project Manager", type: "work" },
      Fri: { time: "9:00 - 5:00pm", role: "Project Manager", type: "work" }
    }
  }
])

const filteredEmployees = computed(() =>
  employees.value.filter(e =>
    e.name.toLowerCase().includes(search.value.toLowerCase())
  )
)

function shiftClass(type) {
  if (type === "work")
    return "bg-blue-50 border border-blue-400 text-blue-700"

  if (type === "leave")
    return "bg-red-100 border border-red-400 text-red-600"
}

</script>