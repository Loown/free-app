<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore()
const router = useRouter()
authStore.retrieveToken()

// authStore.$subscribe(({ payload }) => {
//   console.log('ici')
//   if (payload?.isConnected) {
//     router.push({ name: 'home' })
//   }
// })

const goToProfile = () => {
  router.push('/me/profile')
}
</script>

<template>
  <div>
    <va-navbar color="primary" class="mb-2">
      <template #left>
        <va-navbar-item>Free 4 Motion</va-navbar-item>
      </template>
      <template #center>
        <va-navbar-item>
          <va-button color="grey" :rounded="false">Les offres</va-button>
        </va-navbar-item>
      </template>
      <template #right>
        <div v-if="authStore.getIsGuest">
          <va-navbar-item>
            <va-button color="black" :rounded="false">S'inscrire</va-button>
          </va-navbar-item>
          <va-navbar-item>
            <va-button color="white" :rounded="false">Se connecter</va-button>
          </va-navbar-item>
        </div>
        <div v-else>
          <va-navbar-item>
            <va-button color="grey" :rounded="false">Profil</va-button>
          </va-navbar-item>
        </div>
      </template>
    </va-navbar>
  </div>
  <div class="mx-4">
    <RouterView/>
  </div>
</template>