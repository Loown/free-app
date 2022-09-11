import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/admin/login',
      component: () => import('../views/admin/Login.vue'),
    },
    {
      path: '/admin',
      component: () => import('../views/admin/Root.vue'),
      children: [
        {
          path: 'bookings',
          component: () => import('../views/admin/Bookings.vue'),
        },
        {
          path: 'vehicles',
          component: () => import('../views/admin/Vehicles.vue'),
        },
      ],
      beforeEnter: (to, from) => {
        const authStore = useAuthStore()
        if (authStore.getUser?.roles.map(role => role.name).includes('admin')) {
          return true
        }
        return false
      }
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
      path: '/me/profile',
      component: () => import('../views/me/Profile.vue'),
    },
    {
      path: '/vehicle/:id',
      component: () => import('../views/OneVehicle.vue'),
    },
    {
      path: '/booking/:id',
      component: () => import('../views/OneBooking.vue'),
    },
    {
      path: '/booking/:id/complete',
      component: () => import('../views/BookingComplete.vue'),
    },
  ]
})

export default router
