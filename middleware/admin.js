export default defineNuxtRouteMiddleware((to, from) => {
  const { isAdmin } = useAuth()
  
  if (to.path === '/employees' && !isAdmin.value) {
    return navigateTo('/')
  }
})