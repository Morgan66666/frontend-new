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
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const vuetify = createVuetify({
    components,
    directives,
})

const pinia = createPinia()

const app = createApp(App);

app.use(ElementPlus, {
    locale: zhCn,
})


app.use(vuetify).use(router).use(pinia).use(axios).use(store).mount('#app')
