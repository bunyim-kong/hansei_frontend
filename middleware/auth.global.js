export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAuth()
  
  // Allow access to login page (index) when not authenticated
  if (to.path === '/' && !isAuthenticated.value) {
    return // Allow access to login
  }
  
  // Redirect to login if not authenticated and trying to access other pages
  if (!isAuthenticated.value && to.path !== '/') {
    return navigateTo('/')
  }
  
  // Redirect authenticated users away from login page to dashboard
  if (isAuthenticated.value && to.path === '/') {
    return navigateTo('/dashboard')
  }
})