<script setup>
import { reactive, onMounted } from 'vue';
import { http } from '../http';
import { useRouter } from 'vue-router'
// import VehicleCard from '@/components/VehicleCard. vue'
import VehicleCardVue from '../components/VehicleCard.vue';
const router = useRouter()

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

const goToVehicle = (vehicle) => {
  router.push('/vehicle/' + vehicle.id);
}

</script>

<template>
  <main>
    <VehicleCardVue v-for="vehicle in data.vehicles" :vehicle="vehicle" class="my-3" @click="goToVehicle(vehicle)"></VehicleCardVue>
  </main>
</template>
