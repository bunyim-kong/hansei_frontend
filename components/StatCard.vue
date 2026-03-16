<template>
  <div class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
    <div class="flex justify-between items-start">
      <div>
        <p class="text-sm text-gray-500 mb-1">{{ title }}</p>
        <h3 class="text-2xl font-bold text-gray-800">{{ value }}</h3>
        <p class="text-xs mt-2" :class="trend > 0 ? 'text-green-600' : 'text-red-600'">
          <i :class="trend > 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down'"></i>
          {{ Math.abs(trend) }}% from last month
        </p>
      </div>
      <div :class="`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center`">
        <i :class="`${icon} ${color} text-xl`"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: String,
  trend: Number,
  icon: String,
  color: String,
  bgColor: String
})
</script>