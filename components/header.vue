<template>
  <header class="bg-blue-700 text-white px-6 py-4 flex justify-between items-center">

    <!-- Search -->
    <div class="relative">
      <input
        type="text"
        placeholder="Search members..."
        class="w-80 pl-10 pr-4 py-3 rounded-lg bg-blue-600/70 border border-blue-400 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/40"
      />

      <!-- Search Icon -->
      <svg
        class="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-blue-200"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M21 21l-4.35-4.35m1.6-5.15a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
    </div>

    <!-- Profile & Notification -->
    <div class="flex items-center gap-6">
      <!-- Optional notification bell -->
      <button class="relative hover:opacity-80">
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2"
          viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5"/>
        </svg>
        <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">3</span>
      </button>

      <!-- User -->
      <div class="flex items-center gap-3">
        <img
          src="https://i.pinimg.com/736x/81/a6/01/81a601fb54fc8718cdf1683be7e6e3b4.jpg"
          class="w-12 h-12 rounded-full border border-blue-400 object-cover"
        />
        <div class="leading-tight">
          <p class="text-sm font-semibold">Luke Asote</p>
          <p class="text-xs text-blue-200">Admin</p>
        </div>
      </div>
    </div>

  </header>
</template>