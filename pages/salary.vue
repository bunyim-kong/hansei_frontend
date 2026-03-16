<template>
  <div class="bg-white rounded-xl shadow-sm p-6">
    <h3 class="font-bold text-gray-800 mb-6">My Salary - March 2026</h3>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

    <div class="h-64 bg-gray-50 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-200">
      <div class="text-center text-gray-400">
        <i class="fas fa-chart-bar text-4xl mb-2"></i>
        <p>Salary Trend Chart (coming soon)</p>
      </div>
    </div>
  </div>
</template>