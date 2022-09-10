import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/admin',
      component: () => import('../views/admin/Admin.vue'),
    },
    {
      path: '/booking',
      component: () => import('../views/Booking.vue'),
    },
    {
      path: '/me/bookings',
      component: () => import('../views/MyBookings.vue'),
    },
  ]
})

export default router
