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
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/admin',
      component: () => import('../views/admin/Admin.vue'),
    },
    {
      path: '/admin/bookings',
      component: () => import('../views/admin/Bookings.vue'),
    },
    {
      path: '/admin/vehicles',
      component: () => import('../views/admin/Vehicles.vue'),
    },
    {
      path: '/booking',
      component: () => import('../views/Booking.vue'),
    },
    {
      path: '/me/bookings',
      component: () => import('../views/me/Bookings.vue'),
    },
    {
      path: '/vehicle/:id',
      component: () => import('../views/OneVehicle.vue'),
    },
    {
      path: '/booking/:id',
      component: () => import('../views/OneBooking.vue'),
    },
  ]
})

export default router
