import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import { createVuestic } from 'vuestic-ui'
import 'vuestic-ui/css'

const app = createApp(App)

app.use(createVuestic())
app.use(createPinia())
app.use(router)

app.mount('#app')
