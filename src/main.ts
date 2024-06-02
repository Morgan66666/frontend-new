// main.js
import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from "./router"
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { createPinia } from "pinia"
import store from "./store/index"
import api from "./api/index"

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import './style.css'
import { ElMessage } from 'element-plus'

const vuetify = createVuetify({
    components,
    directives,
})

const axiosInstance = axios.create({
    baseURL: 'http://localhost:23309/api', // API基础路径
    timeout: 1000, // 请求超时时间
    headers: { 'X-Custom-Header': 'foobar' },
    withCredentials: true
})

export default axiosInstance

const pinia = createPinia()

const app = createApp(App)

app.provide('$router', router)

app.use(router)

app.config.globalProperties.$axios = axios
app.config.globalProperties.$message = ElMessage

app.use(ElementPlus, {
    locale: zhCn,
})

app.provide('$axios', axios)
app.provide('$api', api)
app.provide('$store', store)

app.use(vuetify)

app.use(pinia)
app.use(store)
app.mount('#app')
    