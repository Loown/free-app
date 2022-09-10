<script async setup>
import { reactive, onMounted } from 'vue';
import { http } from '../http';
import { addDays } from 'date-fns';
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()

const data = reactive({
  booking: null
})

const loadBooking = () => {
  http.get(`/bookings/${route.params.id}`).then(({ data: booking }) => {
    data.booking = booking
  })
}

onMounted(async () => {
  loadBooking()
})

const cancel = () => {
  // cancel booking
}

</script>

<template>
  <div v-if="data.booking">
    <h1>Réservation</h1>
    <p>Début : {{ data.booking.start_at }}</p>
    <p>Fin : {{ data.booking.end_at }}</p>
    <p>Forfait kilometres : {{ data.booking.kilometers }}</p>
    <p>Statut : {{ data.booking.status }}</p>
    br
    <div v-if="data.booking.vehicle">
      <h1>Véhicule</h1>
      <p>Type : {{ data.booking.vehicle.type }}</p>
      <p>Marque : {{ data.booking.vehicle.brand }}</p>
      <p>Modèle : {{ data.booking.vehicle.model }}</p>
      <p>Couleur : {{ data.booking.vehicle.color }}</p>
      <p>Registration number : {{ data.booking.vehicle.registration_number }}</p>
      <p>Kilometres : {{ data.booking.vehicle.kilometer }}</p>
      <p>Prix : {{ data.booking.vehicle.price }}€ / Jour</p>
    </div>

    <va-button @click="cancel()" color="danger">Annuler</va-button>
  </div>
</template>