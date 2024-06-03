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

app.use(store)

app.mount('#app')