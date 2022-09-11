<script setup>
import { reactive, ref, watch } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router';

const router = useRouter()
const authStore = useAuthStore()

const credentials = reactive({
  email: '',
  password: '',
})

const login = () => {
  authStore.loginAsAdmin(credentials)
}

const goTo = () => {
  router.push({ name: 'about' })
}

authStore.$subscribe(({ payload }) => {
  if (payload?.isConnected) {
    console.log('connected')
    router.push('/admin/vehicles')
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