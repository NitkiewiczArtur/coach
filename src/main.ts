import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {onAuthStateChange} from '@/services/authService'
import VueApexCharts from "vue3-apexcharts";

let app;
onAuthStateChange(() => {
    if (!app) {
        app = createApp(App)
            .use(store)
            .use(router)
            .use(VueApexCharts)
            .mount('#app');
    }
})
