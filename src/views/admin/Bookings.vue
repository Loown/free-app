<script setup>
import { reactive, onMounted } from 'vue';
import { http } from '../../http';
import { useRouter } from 'vue-router';
const data = reactive({
  bookings: []
})

const router = useRouter()
const loadBookings = () => {
  http.get('/bookings').then(({ data: bookings }) => {
    data.bookings = bookings
  })
}

const columns = [
  {
    key: 'id',
    sortable: true,
  },
  {
    key: 'start_at',
    sortable: true,
  },
  {
    key: 'end_at',
    sortable: true,
  },
  {
    key: 'kilometers',
    sortable: true,
  },
  {
    key: 'status',
    sortable: true,
  },
]

const goToBooking = (event) => {
  const booking = data.bookings[event.item.id - 1]
  router.push('/booking/' + booking.id)
}

onMounted(() => {
  loadBookings()
})
</script>

<template>
  <va-data-table
    :items="data.bookings"
    :columns="columns"
    hoverable
    @row:click="goToBooking"
    clickable
    >
    <template #header(start_at)="{label}">Début</template>
    <template #header(end_at)="{label}">Fin</template>
    <template #header(kilometers)="{label}">Kilomètres</template>
    <template #header(status)="{label}">Statut</template>
  </va-data-table>
</template>