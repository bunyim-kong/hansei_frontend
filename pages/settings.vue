<template>
  <div class="p-6 max-w-2xl mx-auto space-y-6">

    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-800">Account Settings</h1>
      <NuxtLink to="/profile" class="text-blue-600 hover:underline text-sm">
        Back to Profile
      </NuxtLink>
    </div>

    <!-- Profile Avatar -->
    <div class="bg-white rounded-xl shadow p-6 flex items-center gap-6">
      <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
        {{ user.name?.charAt(0) }}
      </div>
      <div>
        <h2 class="text-xl font-bold text-gray-800">{{ user.name }}</h2>
        <span class="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
          {{ user.role }}
        </span>
      </div>
    </div>

    <!-- Settings Form -->
    <div class="bg-white rounded-xl shadow p-6 space-y-4">

      <div>
        <label class="block text-gray-500 font-medium mb-1">Full Name</label>
        <input
          v-model="form.name"
          type="text"
          class="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        >
      </div>

      <div>
        <label class="block text-gray-500 font-medium mb-1">Email</label>
        <input
          v-model="form.email"
          type="email"
          class="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        >
      </div>

      <div>
        <label class="block text-gray-500 font-medium mb-1">Password</label>
        <input
          v-model="form.password"
          type="password"
          placeholder="••••••••"
          class="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        >
      </div>

      <div>
        <label class="block text-gray-500 font-medium mb-1">Role</label>
        <input
          v-model="user.role"
          type="text"
          disabled
          class="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
        >
      </div>

      <button
        @click="saveChanges"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
      >
        Save Changes
      </button>

    </div>

  </div>
</template>

<script setup>
const { user, updateUser } = useAuth()

const form = reactive({
  name: user.name,
  email: user.email,
  password: ''
})

const saveChanges = () => {
  // Update user info
  updateUser({
    name: form.name,
    email: form.email,
    ...(form.password && { password: form.password })
  })

  alert('Profile updated successfully!')
}
</script>