<script setup>
import { reactive, onMounted, ref } from 'vue';
import { http } from '../../http';
import { useRouter } from 'vue-router';

const data = reactive({
  vehicles: []
})

const typeOptions = [
  {
    value: 'scooter',
    text: 'Scooter',
  },
  {
    value: 'car',
    text: 'Voiture'
  }
]

const colorOptions = [
{
    value: 'white',
    text: 'Blanc',
  },
  {
    value: 'grey',
    text: 'Gris'
  },
  {
    value: 'black',
    text: 'Noir'
  },
  {
    value: 'green',
    text: 'Vert'
  },
  {
    value: 'red',
    text: 'Rouge'
  },
  {
    value: 'pink',
    text: 'Rose'
  },
  {
    value: 'purple',
    text: 'Violet'
  },
  {
    value: 'blue',
    text: 'Bleu'
  },
  {
    value: 'brown',
    text: 'Marron'
  },
  {
    value: 'orange',
    text: 'Orange'
  },
  {
    value: 'yellow',
    text: 'Jaune'
  },
]

const payload = reactive({
  type: typeOptions[0],
  brand: null,
  model: null,
  color: colorOptions[0],
  serial_number: null,
  registration_number: null,
  kilometers: null,
  buying_date: new Date(),
  price: null,
})

const showModal = ref(false)
const router = useRouter()

const loadVehicles = () => {
  http.get('/vehicles').then(({ data: vehicles }) => {
    data.vehicles = vehicles
  })
}

const columns = [
  {
    key: 'id',
    sortable: true,
  },
  {
    key: 'type',
    sortable: true,
  },
  {
    key: 'brand',
    sortable: true,
  },
  {
    key: 'model',
    sortable: true,
  },
  {
    key: 'serial_number',
    sortable: true,
  },
  {
    key: 'color',
    sortable: true,
  },
  {
    key: 'registration_number',
    sortable: true,
  },
  {
    key: 'kilometers',
    sortable: true,
  },
  {
    key: 'buying_date',
    sortable: true,
  },
  {
    key: 'price',
    sortable: true,
  },
]

const goToVehicle = (event) => {
  const vehicle = data.vehicles[event.item.id - 1]
  router.push('/vehicle/' + vehicle.id)
}

const add = () => {
  console.log('add', payload);
  showModal.value = false
}

onMounted(() => {
  loadVehicles()
})
</script>

<template>
  <va-button color="success" @click="showModal = !showModal">Ajouter un vehicule </va-button>
  <va-data-table
    :items="data.vehicles"
    :columns="columns"
    hoverable
    @row:click="goToVehicle"
    clickable
    >
    <!-- <template #header(start_at)="{label}">Début</template>
    <template #header(end_at)="{label}">Fin</template>
    <template #header(kilometers)="{label}">Kilomètres</template>
    <template #header(status)="{label}">Statut</template> -->
  </va-data-table>
  <va-modal
    v-model="showModal"
    no-padding
  >
    <template #content="{ ok }">
      <va-image :ratio="16/9" src="https://picsum.photos/1500" />
      <va-card-title>
        Ajouter un nouveaux véhicule à la flotte!
      </va-card-title>
      <va-card-content>
        <div>
          <va-select label="Type" name="type" v-model="payload.type" :options="typeOptions"></va-select>
          <va-input label="Marque" type="text" placeholder="Marque" v-model="payload.brand" class="my-2"/>
          <va-input label="Modèle" type="text" placeholder="Modèle" v-model="payload.model" class="my-2"/>
          <va-input label="Numéro de série" type="text" placeholder="Numéro de série" v-model="payload.serial_number" class="my-2"/>
          <va-select label="Couleur" name="couleur" v-model="payload.color" :options="colorOptions"></va-select>
          <va-input label="Plaque d\'immatriculation'" type="text" placeholder="Plaque d\'immatriculation" v-model="payload.registration_number" class="my-2"/>
          <va-input label="Kilomètrage" type="number" placeholder="Kilomètres" v-model="payload.kilometers" class="my-2"/>
          <va-date-input label="Date d'achat" placeholder="Date d\'achat" v-model="payload.buying_date" class="my-2"/>
          <va-input label="Prix (/J)" type="number" placeholder="Prix" v-model="payload.price" class="my-2"/>
        </div>
      </va-card-content>
      <va-card-actions>
        <va-button @click="ok" color="warning">Annuler</va-button>
        <va-button @click="add" color="success">Ajouter</va-button>
      </va-card-actions>
    </template>
  </va-modal>
</template>