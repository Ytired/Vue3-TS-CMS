import { createApp } from 'vue'
import { registerApp } from './global'
import './service/axios_demo'
import router from './router'
import store from './store'
import App from './App.vue'
import j_Request from './service/index'

const app = createApp(App)

// 注册element-plus
registerApp(app)
app.use(router)
app.use(store)
app.mount('#app')
j_Request.request({
  url: 'home/multidata',
  method: 'GET',
  interceptors: {
    requestInterceptors: config => {
      console.log('单独设置的拦截器')
      return config
    }
  }
})
