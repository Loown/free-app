<script setup>
import { reactive, onMounted } from 'vue';
import { http } from '@/http';
import VehicleCard from '@/components/VehicleCard.vue'

const data = reactive({
  bookings: [],
})

onMounted(() => {
  http.get('/me/bookings').then(({ data: bookings }) => {
    data.bookings = bookings
  })
})
</script>

<template>
    <div v-for="booking in data.bookings">
      <va-card color="primary" gradient class="my-4">
        <va-card-title>Résérvation du {{ booking.start_at }} au {{ booking.end_at }}</va-card-title>
        <va-card-content>
          <VehicleCard :vehicle="booking.vehicle"></VehicleCard>
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
          