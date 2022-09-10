<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth';
import router from '@/router'

const authStore = useAuthStore()

authStore.retrieveToken()

// authStore.$subscribe(({ payload }) => {
//   console.log('ici')
//   if (payload?.isConnected) {
//     router.push({ name: 'home' })
//   }
// })

</script>

<template>
  <div>Status de connection : {{ authStore.getIsConnected ? 'Connecté' : 'Déconnecté'}}</div>
  <br>
  <div v-if="authStore.getIsConnected">Connecté en tant que : {{ authStore.getUser.email }}</div>
  <RouterView />
</template>