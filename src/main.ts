import { createApp } from 'vue'
import { registerApp } from './global'
import 'normalize.css'
import './assets/css/index.less'
import router from './router'
import store from './store'
import App from './App.vue'

const app = createApp(App)

// 注册element-plus
registerApp(app)
app.use(router)
app.use(store)
app.mount('#app')
