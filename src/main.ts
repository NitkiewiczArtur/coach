import {createApp} from 'vue'
import App from './App.vue'
import "@/plugins/firebase";
import router from './router'
import {store} from './store'
import {onAuthStateChanged} from '@/services/authService'
import VueApexCharts from "vue3-apexcharts";

let app;
onAuthStateChanged(() => {
    if (!app) {
        app = createApp(App)
            .use(store)
            .use(router)
            .use(VueApexCharts)
            .mount('#app');

    }
})
