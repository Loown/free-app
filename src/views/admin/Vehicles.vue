<script setup>
import { reactive, onMounted, ref } from 'vue';
import { http } from '../../http';
import { useRouter } from 'vue-router';

const data = reactive({
  vehicles: []
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
  console.log('add');
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
        Title!
      </va-card-title>
      <va-card-content>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Id perferendis, illum rem dolorum obcaecati dolorem. Laborum, odio ipsum qui quaerat itaque reiciendis error nemo tenetur beatae. Vel obcaecati magni maxime!
      </va-card-content>
      <va-card-actions>
        <va-button @click="ok" color="warning">Annuler</va-button>
        <va-button @click="add" color="success">Ajouter</va-button>
      </va-card-actions>
    </template>
  </va-modal>
</template>