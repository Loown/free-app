<script setup>
import { reactive, ref, watch, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import router from '@/router'
import { addDays } from 'date-fns';
import { http } from '../http';

const payload = reactive({
  range: {
    start: new Date(),
    end: addDays(new Date(), 7),
  },
  kilometers: 100
})

const data = reactive({
  vehicle: null,
})

const book = () => {
  console.log(payload)
  http.post('/bookings').then((booking) => {
    console.log('booking', booking)
  })
}

onMounted(() => {
  http.get('/vehicles/1').then(({ data: vehicle }) => {
    data.vehicle = vehicle
    console.log(data)
  })
})
</script>

<template>
    <div v-if="data.vehicle">
      <h1>Véhicule</h1>
      <p>Type : {{ data.vehicle.type }}</p>
      <p>Marque : {{ data.vehicle.brand }}</p>
      <p>Modèle : {{ data.vehicle.model }}</p>
      <p>Couleur : {{ data.vehicle.color }}</p>
      <p>Registration number : {{ data.vehicle.registration_number }}</p>
      <p>Kilometres : {{ data.vehicle.kilometer }}</p>
      <p>Prix : {{ data.vehicle.price }}€ / Jour</p>
    </div>
    <div>
      <h1>Résérver</h1>
      <va-slider v-model="payload.kilometers" :step="50" :max="2000" :min="100" track-label-visible class="my-4" pins></va-slider>
      <va-date-input mode="range" v-model="payload.range" />
    </div>
    <va-button @click="book()"> Résérver </va-button>
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
  