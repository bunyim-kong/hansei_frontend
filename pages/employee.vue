<template>
      <!-- Content -->
      <main class="p-6">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-bold">Members</h1>

          <div class="space-x-2">
            <NuxtLink to="/employees/add" class="solid_btn">
              Add new
            </NuxtLink>

            <NuxtLink to="/employees/import" class="btn">
              Import members
            </NuxtLink>

            <NuxtLink to="/employees/export" class="btn">
              Export Excel
            </NuxtLink>
          </div>
        </div>

        <!-- Table -->
        <div class="bg-white rounded-2xl p-4">
          <table class="w-full text-left">
            <thead class="border-b border-gray-400 bg-gray-">
              <tr>
                <th class="p-4">ID</th>
                <th>Member name</th>
                <th>Position</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="user in users" :key="user.id" class="border-b border-gray-400 hover:bg-gray-50">
                <td class=" p-4 py-5">
                  {{ user.id }}
                </td>

                <td class="font-medium">{{ user.name }}</td>
                <td>{{ user.position }}</td>
                <td>{{ user.email }}</td>

                <td>
                  <span :class="user.status == 'Active'? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'" class="px-2 py-1 rounded text-sm">
                    {{ user.status }}
                  </span>
                </td>

                <td class="space-x-3">
                  <button class="text-blue-600 hover:underline">
                    Edit
                  </button>

                  <button class="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </main>
</template>

<script setup>

const users = [
  {
    id: 1,
    name: "IU",
    position: "UI Designer",
    email: "iu@gmail.com",
    status: "Active",
  },
  {
    id: 2,
    name: "Kim Jisoo",
    position: "Frontend Developer",
    email: "kimjisoo@gmail.com",
    status: "Active",
  },
  {
    id: 3,
    name: "Ashley Williams",
    position: "Backend Developer",
    email: "ashley@gmail.com",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Nick Jackel",
    position: "Project Manager",
    email: "nick@gmail.com",
    status: "Active",
  }
]
</script>