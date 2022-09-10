<script setup>
import { reactive, onMounted } from 'vue';
import { http } from '../http';
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()

const stripe = Stripe("pk_test_51Lf69IFL5bQoYvhz26sxWmZ9zMnnOCkYwpwKzyABaegOdYRNbzzoIMoY3VGb6l9hL2k6FHy31BK5FI7LAZY8W5nb00JdN9ZOHm");
const data = reactive({
  vehicles: []
})

const completeBooking = () => {
  http.post('/bookings/' + route.params.id + '/complete').then(({ data: booking }) => {
    console.log('COMPLETE BOOKING', booking)
  })
}

const checkStatus = async () => {
  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );

  if (!clientSecret) {
    return;
  }

  const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

  console.log('paymentIntent', paymentIntent)
  switch (paymentIntent.status) {
    case "succeeded":
      http.post(`/bookings/${route.params.id}/complete`).then(({ data: booking }) => {
        console.log('booking', booking)
      })
      // showMessage("Payment succeeded!");
      break;
    case "processing":
      // showMessage("Your payment is processing.");
      break;
    case "requires_payment_method":
      // showMessage("Your payment was not successful, please try again.");
      break;
    default:
      // showMessage("Something went wrong.");
      break;
  }
}

onMounted(() => {
  // completeBooking()
  checkStatus()
})

</script>

<template>
  <div class="about">
    <h1>This is an complete booking page</h1>
  </div>
</template>
  