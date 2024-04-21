import { createApp } from 'vue'
import axios from 'axios'

import App from './App.vue'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import router from "./router";
import {createPinia} from "pinia";
import store from "./store/index";
//@ts-ignore
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import './style.css'

const vuetify = createVuetify({
    components,
    directives,
})



const axiosInstance = axios.create({
    baseURL: 'http://localhost:23309/api', // API基础路径
    timeout: 1000, // 请求超时时间
    headers: {'X-Custom-Header': 'foobar'},
    withCredentials: true
});

export default axiosInstance


const pinia = createPinia()

const app = createApp(App);
app.config.globalProperties.$axios = axios;
app.use(ElementPlus, {
    locale: zhCn,
})


app.use(vuetify).use(router).use(pinia).use(store).use(axios).mount('#app')
