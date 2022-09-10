<script setup>
import { reactive, onMounted } from 'vue';
import { http } from '../http';
// import VehicleCard from '@/components/VehicleCard. vue'
import VehicleCardVue from '../components/VehicleCard.vue';
const data = reactive({
  vehicles: []
})

const loadVehicles = () => {
  http.get('/vehicles').then(({ data: vehicles }) => {
    data.vehicles = vehicles
  })
}

onMounted(() => {
  loadVehicles()
})
</script>

<template>
  <main>
    <VehicleCardVue v-for="vehicle in data.vehicles" :vehicle="vehicle" class="my-3"></VehicleCardVue>
  </main>
</template>
