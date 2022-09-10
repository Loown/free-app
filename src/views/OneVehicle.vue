<script async setup>
import { reactive, ref, watch, onMounted } from 'vue';
import { http } from '../http';
import { addDays } from 'date-fns';
import { useRouter, useRoute } from 'vue-router'

const stripe = Stripe("pk_test_51Lf69IFL5bQoYvhz26sxWmZ9zMnnOCkYwpwKzyABaegOdYRNbzzoIMoY3VGb6l9hL2k6FHy31BK5FI7LAZY8W5nb00JdN9ZOHm");
let elements;

const route = useRoute()

const data = reactive({
  vehicle: null,
  range: {
    start: new Date(),
    end: addDays(new Date(), 7),
  },
  kilometers: 100,
  booking: null
})

const loadVehicle = () => {
  http.get(`/vehicles/${route.params.id}`).then(({ data: vehicle }) => {
    data.vehicle = vehicle
  })
}

const handlePaymentFormSubmit = async (e) => {
  e.preventDefault();
  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      // Make sure to change this to your payment completion page
      return_url: `http://localhost:5173/booking/${data.booking.id}/complete`,
    },
  });
  console.log('error_payment', error)
}

onMounted(async () => {
  loadVehicle()
})

const book = () => {
  http.post('/bookings', {
    start_at: data.range.start,
    end_at: data.range.end,
    kilometers: data.kilometers,
    vehicle: data.vehicle.id
  }).then(({ data: { booking, payment_intent } }) => {
    data.booking = booking
    elements = stripe.elements({
      clientSecret: payment_intent.client_secret,
      locale: 'fr'
    })
    const paymentElement = elements.create('payment');
    paymentElement.mount('#payment-element')
  })
}
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
    <va-slider v-model="data.kilometers" :step="50" :max="2000" :min="100" track-label-visible class="my-4" pins></va-slider>
    <va-date-input mode="range" v-model="data.range" />
  </div>
  <va-button @click="book()"> Résérver </va-button>
  <div>
    <form id="payment-form" @submit="handlePaymentFormSubmit">
      <div id="payment-element"></div>
      <va-button id="submit" type="submit"> Confirmer paiement </va-button>
    </form>
  </div>
</template>