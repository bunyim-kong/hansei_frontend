<template>
  <div class="min-h-screen bg-gray-50 flex">
    <AppSidebar class="hidden lg:block" />
    <MobileMenu />
    
    <main class="flex-1 lg:ml-64 pt-16 lg:pt-0">
      <AppHeader />
      <div class="p-6 sm:p-8">
        <slot />
      </div>
    </main>
    
    <AddEmployeeModal v-if="showAddEmployee" />
    <LeaveRequestModal v-if="showLeaveRequest" />
  </div>
</template>

<script setup>
const { showAddEmployee, showLeaveRequest } = useModals()
</script>