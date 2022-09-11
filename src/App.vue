<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore()
const router = useRouter()

authStore.retrieveToken()

const goToProfile = () => {
  router.push('/me/profile')
}

const goToLogin = () => {
  router.push('/login')
}

const goToRegister = () => {
  router.push('/register')
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
        <va-navbar-item v-if="authStore.getIsGuest">
          <va-button color="black" :rounded="false" @click="goToRegister()">S'inscrire</va-button>
        </va-navbar-item>
        <va-navbar-item v-if="authStore.getIsGuest">
          <va-button color="white" :rounded="false" @click="goToLogin()">Se connecter</va-button>
        </va-navbar-item>
        <va-navbar-item v-if="authStore.getIsConnected">
          <va-button color="grey" :rounded="false" @click="goToProfile()">Profil</va-button>
        </va-navbar-item>
      </template>
    </va-navbar>
  </div>
  <div class="mx-4">
    <RouterView/>
  </div>
</template>