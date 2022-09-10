<script setup>
import { reactive, onBeforeMount, ref } from 'vue';
import { http } from '../../http';

const payload = reactive({
  type: null,
  brand: null,
  model: null,
  serial_number: null,
  registration_number: null,
  kilometers: null,
  buying_date: null,
  price: null,
})

const vehicles = ref([])

onBeforeMount(() => {
  console.log('created')
  http.get('/vehicles').then(({ data }) => {
    vehicles.value = data
  })
})

const create = () => {
  http.post('/vehicles', payload).then(({ data }) => {
    vehicles.value.push(data)
  })
}
 
</script>

<template>
  <div>
    <div>
      <div v-for="vehicle of vehicles">
        {{ vehicle.price }}
      </div>
    </div>
    <div>
      <select name="type" v-model="payload.type">
        <option value="">--Please choose an option--</option>
        <option value="scooter">Scooter</option>
        <option value="car">Voiture</option>
      </select>
      <input type="text" placeholder="Marque" v-model="payload.brand">
      <input type="text" placeholder="Modèle" v-model="payload.model">
      <input type="text" placeholder="Numéro de série" v-model="payload.serial_number">
      <select name="couleur" v-model="payload.color">
        <option value="">--Please choose an option--</option>
        <option value="white">Blanc</option>
        <option value="grey">Gris</option>
        <option value="black">Noir</option>
        <option value="green">Vert</option>
        <option value="red">Rouge</option>
        <option value="pink">Rose</option>
        <option value="purple">Violet</option>
        <option value="blue">Bleu</option>
        <option value="brown">Marron</option>
        <option value="orange">Orange</option>
        <option value="yellow">Jaune</option>
      </select>
      <input type="text" placeholder="Plaque d\'immatriculation" v-model="payload.registration_number">
      <input type="number" placeholder="Kilomètres" v-model="payload.kilometers">
      <input type="date" placeholder="Date d\'achat" v-model="payload.buying_date">
      <input type="number" placeholder="Prix" v-model="payload.price">
      <button @click="create()">Créer</button>
    </div>
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
