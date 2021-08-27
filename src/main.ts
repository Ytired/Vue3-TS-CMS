import { createApp } from 'vue'
import { registerApp } from './global'
import router from './router'
import store from './store'
import App from './App.vue'

const app = createApp(App)

registerApp(app)
app.use(router)
app.use(store)
app.mount('#app')
