<script setup>
import { reactive, ref, watch, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import router from '@/router'
import { addDays } from 'date-fns';
import { http } from '../http';
import VehicleCard from '@/components/VehicleCard.vue'

// const payload = reactive({
//   range: {
//     start: new Date(),
//     end: addDays(new Date(), 7),
//   },
//   kilometers: 100
// })

const data = reactive({
  bookings: [],
})

const book = () => {
  console.log(payload)
  http.post('/bookings').then((booking) => {
    console.log('booking', booking)
  })
}

onMounted(() => {
  http.get('/me/bookings').then(({ data: bookings }) => {
    console.log(bookings)
    data.bookings = bookings
  })
})
</script>

<template>
    <div v-for="booking in data.bookings">
      <va-card color="primary" gradient class="my-4">
        <va-card-title>Résérvation du {{ booking.start_at }} au {{ booking.end_at }}</va-card-title>
        <va-card-content>
          <VehicleCard></VehicleCard>
          <p>ID: {{ booking.id }}</p>
          <p>Kilometres: {{ booking.kilometers }}</p>
        </va-card-content>
      </va-card>
    </div>
  </template>
  
  <style>
  @media (min-width: 1024px) {
    .about {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }
</style>
      