<template>
  <div class="min-h-screen flex items-center bg-[#f8fafc] justify-center bg-cover bg-center">
    <div class="flex">

      <div class="backdrop-blur-md bg-white/10 border border-white/30 rounded-[10px] p-10 w-[380px] text-black shadow-2xl">
      <h1 class="text-3xl font-semibold text-center mb-8">Register</h1>
      
      <div class="mb-5">
        <input type="name" placeholder="Fullname" class="w-full px-4 py-3 rounded-[5px] bg-transparent border border-gray-400 placeholder-black "/>
      </div>

      <div class="mb-5">
        <input type="email" placeholder="Email " class="w-full px-4 py-3 rounded-[5px] bg-transparent border border-gray-400 placeholder-black "/>
      </div>

   
      <div class="mb-5">
        <input type="password" placeholder="Password" class="w-full px-4 py-3 rounded-[5px] bg-transparent border border-gray-400 placeholder-black "/>
      </div>

  
      <div class="flex justify-between text-sm mb-6">
        <label class="flex items-center gap-2">
          <input type="checkbox" class="accent-white" />
          Remember me
        </label>

        <a href="#" class="hover:underline"></a>
      </div>


      <button class="w-full bg-blue-600 text-black py-3 rounded-[6px] font-semibold hover:bg-gray-200 transition">
        Register
      </button>

      <p class="text-center text-sm mt-6">
        Don’t have an account?
        <NuxtLink to="/login" class="underline">
                Login
        </NuxtLink>
      </p>

      </div>
     

    </div>
    
  </div>
</template>

