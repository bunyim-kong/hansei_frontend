<template>
    <aside class="w-64 bg-blue-700 text-white">
      <div class="px-6 py-6 flex items-center gap-3">
      <!-- Modern geometric icon -->
      <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
        <svg class="w-6 h-6 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zm0 7.5l10-5v10l-10 5-10-5v-10l10 5z" />
        </svg>
      </div>

      <div>
        <h1 class="text-xl font-bold tracking-tight">Hansei</h1>
        <p class="text-xs opacity-70">Workforce System</p>
      </div>
    </div>


      <nav class="mt-6">
        <NuxtLink to="/dashboard" class="block px-6 py-4 hover:bg-blue-600 font-bold">Dashboard</NuxtLink>
        <NuxtLink to="/employee" class="block px-6 py-4 bg-blue-600 font-bold">Employees</NuxtLink>
        <NuxtLink to="/attendance" class="block px-6 py-4 hover:bg-blue-600 font-bold">Attendance</NuxtLink>
        <NuxtLink to="/roster" class="block px-6 py-4 hover:bg-blue-600 font-bold">Roster</NuxtLink>
        <NuxtLink to="/leave" class="block px-6 py-4 hover:bg-blue-600 font-bold">Leave</NuxtLink>
        <NuxtLink to="/reports" class="block px-6 py-4 hover:bg-blue-600 font-bold">Reports</NuxtLink>
      </nav>
    </aside>
</template>