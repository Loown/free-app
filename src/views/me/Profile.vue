<script setup>
import { storeToRefs } from 'pinia';
import { reactive, onMounted, watch, computed } from 'vue';
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth';

const router = useRouter()

const authStore = storeToRefs(useAuthStore())

const payload = reactive({
  firstname: null,
  lastname: null,
  email: null,
  day_of_birth: null,
  address: null,
  phone_number: null,
  driving_licence_number: null,
})

const buildForm = (user) => {
  payload.firstname = user.firstname
  payload.lastname = user.lastname
  payload.email = user.email
  payload.day_of_birth = new Date(user.day_of_birth)
  payload.address = user.address
  payload.phone_number = user.phone_number
  payload.driving_licence_number = user.driving_licence_number
}

if (authStore.getUser.value) {
  buildForm(authStore.getUser.value)
}

watch(authStore.getUser, (oldValue) => {
  buildForm(oldValue)
})

const data = reactive({
  vehicles: []
})

onMounted(() => {
  // loadVehicles()
})

const goToBookings = () => {
  router.push('/me/bookings');
}

</script>

<template>
  <div>
    <div class="flex flex-col">
      <va-input class="my-2" label="Prénom" v-model="payload.firstname"></va-input>
      <va-input class="my-2" label="Nom" v-model="payload.lastname"></va-input>
      <va-input class="my-2" label="Email" v-model="payload.email" disabled></va-input>
      <va-date-input class="my-2" v-if="payload.day_of_birth" label="Date de naissance"/>
      <va-input class="my-2" label="Adresse" v-model="payload.address"></va-input>
      <va-input class="my-2" label="Numéro de téléphone" v-model="payload.phone_number"></va-input>
      <va-input class="my-2" label="Numéro de permis" v-model="payload.driving_licence_number"></va-input>
    </div>
    <va-button @click="goToBookings()">Mes résérvations</va-button>
  </div>
</template>
    