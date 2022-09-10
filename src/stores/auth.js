import { defineStore } from "pinia";
import { http } from '@/http';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    isConnected: false,
    user: null,
    token: null,
  }),
  getters: {
    getIsConnected: (state) => state.isConnected,
    getIsGuest: (state) => !state.isConnected,
    getUser: (state) => state.user,
    getToken: (state) => state.token,
  },
  actions: {
    async login({ email, password }) {
      try {
        const { data: { token } } = await http.post('/auth/login', { email, password })
        this.$patch({
          token,
        });
        localStorage.setItem('free-4-jwt', token)
        const store = useAuthStore();
        store.loadProfile();
      } catch (error) {
        return error
      }
    },
    async loadProfile() {
      try {
        const { data: user } = await http.get('/me/profile')
        this.$patch({
          user,
          isConnected: true,
        })
      } catch (error) {
        return error
      }
    },
    retrieveToken() {
      const token = localStorage.getItem('free-4-jwt')
      if (!token) {
        // logout()
        return
      }
      this.$patch({
        token,
      })
      const store = useAuthStore();
      store.loadProfile();
      return
    },
    logout() {
      this.$patch({
        isConnected: false,
        user: null,
        token: null,
      })
    }
  }
});
