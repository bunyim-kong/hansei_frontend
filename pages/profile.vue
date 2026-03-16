<template>
  <div class="p-6 max-w-4xl mx-auto space-y-6">

    <!-- Profile Header -->
    <div class="bg-white rounded-xl shadow-sm p-6 flex items-center gap-6">
      <div class="flex-1">
        <div class="profile_name flex items-center gap-6">
            <h2 class="text-2xl font-bold text-gray-800">{{ user.name }}</h2>

            <span class=" inline-block px-6 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold">
            {{ user.role }}
            </span>
        </div>
        
        <p class="text-gray-500">{{ user.email }}</p>
        
      </div>

      <NuxtLink to="/settings" class="ml-auto text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
        Settings
      </NuxtLink>
    </div>

    <!-- Key Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="bg-white rounded-xl shadow-sm p-4 text-center">
        <p class="text-gray-400 text-sm">Present</p>
        <p class="text-2xl font-bold text-green-600">18</p>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-4 text-center">
        <p class="text-gray-400 text-sm">Absent</p>
        <p class="text-2xl font-bold text-red-600">2</p>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-4 text-center">
        <p class="text-gray-400 text-sm">Late</p>
        <p class="text-2xl font-bold text-yellow-600">3</p>
      </div>
    </div>

    <!-- Tabbed Info Section -->
    <div class="bg-white rounded-xl shadow-md">
      <div class="border-b border-gray-100 flex">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="activeTab = tab"
          class="flex-1 py-3 text-center font-semibold"
          :class="activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'"
        >
          {{ tab }}
        </button>
      </div>

      <div class="p-6">
        <div v-if="activeTab === 'Attendance'">
          <ul class="space-y-2">
            <li class="flex justify-between border-b border-gray-100 py-2">
              <span>Last Check-in</span>
              <span class="text-gray-500">Today 9:00 AM</span>
            </li>
            <li class="flex justify-between border-b border-gray-100 py-2">
              <span>Total Present Days</span>
              <span class="text-gray-500">18</span>
            </li>
            <li class="flex justify-between py-2">
              <span>Total Absent Days</span>
              <span class="text-gray-500">2</span>
            </li>
          </ul>
        </div>

        <div v-if="activeTab === 'Personal Info'">
          <ul class="space-y-4 text-gray-700">
            <li><strong>Name:</strong> {{ user.name }}</li>
            <li><strong>Email:</strong> {{ user.email }}</li>
            <li><strong>Role:</strong> {{ user.role }}</li>
            <li><strong>Joined:</strong> Jan 15, 2026</li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
const { user } = useAuth()

const tabs = ['Attendance', 'Personal Info']
const activeTab = ref('Attendance')
</script>