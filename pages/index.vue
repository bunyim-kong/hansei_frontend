<template>
  <div class="min-h-screen bg-[#f8fafc] p-6 font-sans">
    <div class="mb-8 flex flex-wrap gap-4">
      <div v-for="card in summary" :key="card.title" class="flex-1 min-w-[200px] bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
        <p class="text-sm text-slate-500">{{ card.title }}</p>
        <h3 class="text-2xl font-bold text-slate-800">{{ card.count }}</h3>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <section class="lg:col-span-4 bg-white p-8 rounded-3xl shadow-sm border border-blue-50 text-center">
        <h2 class="text-xl font-bold text-slate-800 mb-6">Attendance</h2>
        
        <div class="mb-8">
          <div class="text-5xl font-mono font-bold text-blue-600 mb-2">02:45</div>
          <p class="text-slate-400 text-sm">Tuesday, March 10, 2026</p>
        </div>

        <div class="space-y-3">
          <button @click="handleCheckIn" class="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold transition-all shadow-lg shadow-blue-100">
            Check In
          </button>
          <button @click="handleCheckOut" class="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-semibold transition-all">
            Check Out
          </button>
        </div>
      </section>

      <section class="lg:col-span-8 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div class="p-6 border-b border-slate-50 flex justify-between items-center">
          <h2 class="font-bold text-slate-800 text-lg">Recent Workforce Activity</h2>
          <NuxtLink to="/employees" class="text-blue-600 text-sm font-medium hover:underline">View All</NuxtLink>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead class="bg-slate-50/50 text-slate-400 text-xs uppercase">
              <tr>
                <th class="px-6 py-4">Employee</th>
                <th class="px-6 py-4">Module</th>
                <th class="px-6 py-4">Status</th>
                <th class="px-6 py-4">Time</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-50">
              <tr v-for="log in logs" :key="log.id" class="hover:bg-slate-50/50 transition-colors">
                <td class="px-6 py-4 font-medium text-slate-700">{{ log.name }}</td>
                <td class="px-6 py-4 text-slate-500 text-sm">{{ log.module }}</td>
                <td class="px-6 py-4">
                  <span :class="log.statusColor" class="px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                    {{ log.status }}
                  </span>
                </td>
                <td class="px-6 py-4 text-slate-400 text-sm">{{ log.time }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
const summary = [
  { title: 'Total Staff', count: '12' },
  { title: 'In Office', count: '8' },
  { title: 'On Leave', count: '2' },
  { title: 'Roster Tasks', count: '5' }
]

const logs = [
  { id: 1, name: 'Sok Dara', module: 'Attendance', status: 'In', statusColor: 'bg-green-100 text-green-700', time: '08:02 AM' },
  { id: 2, name: 'Chan Ty', module: 'Leave Mgt', status: 'Pending', statusColor: 'bg-orange-100 text-orange-700', time: '09:15 AM' },
  { id: 3, name: 'Keo Roth', module: 'Roster', status: 'Assigned', statusColor: 'bg-blue-100 text-blue-700', time: '10:00 AM' }
]

const handleCheckIn = () => alert('Checking in...')
const handleCheckOut = () => alert('Checking out...')
</script>