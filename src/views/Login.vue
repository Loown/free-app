<script setup>
import { reactive, ref, watch } from 'vue';
import { useAuthStore } from '../stores/auth';
import router from '@/router'

const authStore = useAuthStore()

const credentials = reactive({
  email: '',
  password: '',
})

const login = () => {
  authStore.login(credentials)
}

const goTo = () => {
  router.push({ name: 'about' })
}

authStore.$subscribe(({ payload }) => {
  console.log('ici')
  if (payload?.isConnected) {
    router.push({ name: 'home' })
  }
})

</script>

<template>
  <div>
    <input type="text" placeholder="email" v-model="credentials.email">
    <input type="password" placeholder="password" v-model="credentials.password">
    <button @click="login()">Se connecter</button>
  </div>
</template>