<template>

      <!-- Content -->
      <main class="p-6">

        <div class="flex justify-between items-center mb-6">

          <h1 class="text-2xl font-bold">Members</h1>

          <div class="space-x-2">

            <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Add new
            </button>

            <button class="border px-4 py-2 rounded hover:bg-gray-100">
              Import members
            </button>

            <button class="border px-4 py-2 rounded hover:bg-gray-100">
              Export Excel
            </button>

          </div>

        </div>

        <!-- Table -->
        <div class="bg-white rounded-lg shadow">

          <table class="w-full text-left">

            <thead class="border-b bg-gray-50">
              <tr>
                <th class="p-4">Photo</th>
                <th>Member name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              <tr
                v-for="user in users"
                :key="user.name"
                class="border-b hover:bg-gray-50"
              >

                <td class="p-4">
                  <img
                    :src="user.avatar"
                    class="w-10 h-10 rounded-full object-cover"
                  />
                </td>

                <td class="font-medium">{{ user.name }}</td>
                <td>{{ user.phone }}</td>
                <td>{{ user.email }}</td>

                <td>
                  <span
                    :class="user.status == 'Active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'"
                    class="px-2 py-1 rounded text-sm"
                  >
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
    id:1,
    name:"IU",
    phone:"097 85 97 99",
    email:"iu@gmail.com",
    status:"Active",
    avatar:"https://i.pinimg.com/1200x/ab/80/38/ab8038797fe891d7674339f3da04f0d9.jpg"
  },
  {
    id:2,
    name:"Kim Jisoo",
    phone:"088 52 99 168",
    email:"kimjisoo@gmail.com",
    status:"Active",
    avatar:"https://i.pinimg.com/736x/3f/1b/7e/3f1b7eba74e0112e4991d8e9f8042d51.jpg"
  },
  {
    id:3,
    name:"Ashley Williams",
    phone:"012 34 56 78",
    email:"ashley@gmail.com",
    status:"Inactive",
    avatar:"https://i.pinimg.com/736x/98/12/ee/9812ee31889cf2f84cc8c40bbf4b19a8.jpg"
  },
  {
    id:4,
    name:"Nick Jackel",
    phone:"097 85 56 999",
    email:"nick@gmail.com",
    status:"Active",
    avatar:"https://i.pinimg.com/736x/7a/9b/da/7a9bda4e4eace4e082727409ec2773e6.jpg"
  }
]

</script>