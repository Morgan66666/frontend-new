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

const vuetify = createVuetify({
    components,
    directives,
})

const pinia = createPinia()

createApp(App).use(vuetify).use(router).use(pinia).use(store).mount('#app')
