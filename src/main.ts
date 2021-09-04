import { createApp } from 'vue'
import { registerApp } from './global'
import 'normalize.css'
import './assets/css/index.less'
import router from './router'
import store from './store'
import App from './App.vue'
import { setupStore } from '@/store'

const app = createApp(App)

// 注册element-plus
registerApp(app)
app.use(router)
app.use(store)
app.mount('#app')
setupStore() //每次页面刷新执行
