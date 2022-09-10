<script setup>
import { reactive, ref, watch, onMounted, defineProps } from 'vue';
import { useAuthStore } from '../stores/auth';
import router from '@/router'
import { addDays } from 'date-fns';
import { http } from '../http';

const props = defineProps(['vehicle'])

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

const getVehicleImage = (vehicle) => {
  return `../img/${vehicle.type}.png`
}
</script>

<template>
  <va-card>
    <div class="flex p-0 flex-col items-center">
      <va-card-title>{{ vehicle.brand }} - {{ vehicle.model }} - {{ vehicle.color }}</va-card-title>
      <img :src="getVehicleImage(vehicle)" class="w-20"/>
      <ul class="flex flex-col items-left p-3 pt-0">
        <h1 class="text-cyan-400 py-2 text-center">Informations</h1>
        <li class="text-xs"><span class="font-bold">Numéro de série</span> : {{ vehicle.serial_number }}</li> 
        <li class="text-xs"><span class="font-bold">Immatriculation</span> : {{ vehicle.registration_number }}</li> 
        <li class="text-xs"><span class="font-bold">Kilomètres compteur</span> : {{ vehicle.kilometers }}</li>
        <li class="text-xs"><span class="font-bold">Année</span> : {{ vehicle.buying_date }}</li>
        <li class="text-xs"><span class="font-bold">Prix</span> : {{ vehicle.price }}€ / Jour</li>
      </ul>
    </div>
  </va-card>
</template>
      