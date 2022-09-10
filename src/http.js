import axios from 'axios';
import { useAuthStore } from './stores/auth';



const http = axios.create({
  baseURL: 'http://api.free.localhost/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
})

http.interceptors.request.use((config) => {
  const authStore = useAuthStore()

  if (config.headers) {
    config.headers.Authorization = 'Bearer ' + authStore.getToken
  }

  return config
})

export { http }
