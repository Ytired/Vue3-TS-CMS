import { createApp } from 'vue'
import { globalRegister } from './global'
import 'normalize.css'
import './assets/css/index.less'
import router from './router'
import store from './store'
import App from './App.vue'
import { setupStore } from '@/store'

const app = createApp(App)

// 注册element-plus
app.use(globalRegister)
app.use(store)
setupStore() //每次页面刷新执行
app.use(router)
app.mount('#app')
