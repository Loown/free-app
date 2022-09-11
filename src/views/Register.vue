<script setup>
import { reactive, ref, watch } from 'vue';
import { useAuthStore } from '../stores/auth';
import router from '@/router'

const authStore = useAuthStore()

const payload = reactive({
  email: '',
  password: '',
  password_confirmation: '',
})

const register = () => {
  authStore.register(payload)
}

authStore.$subscribe(({ payload }) => {
  if (payload?.isConnected) {
    router.push('/')
  }
})

</script>

<template>
  <div>
    <input type="text" label="Email" placeholder="Email" v-model="payload.email">
    <input type="password" label="Mot de passe" placeholder="Mot de passe" v-model="payload.password">
    <input type="password" label="Confirmation du mot de passe" placeholder="Confirmation du mot de passe" v-model="payload.password_confirmation">
    <button @click="register()">S'inscrire</button>
  </div>
</template>