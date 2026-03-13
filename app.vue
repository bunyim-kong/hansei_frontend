<template>
  <div class="flex min-h-screen bg-gray-100">
    <Aside />
    
    <div class="flex-1 flex flex-col">
      <Header /> 
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
import Aside from '~/components/aside.vue'
import Header from '~/components/header.vue'

</script>