import { createApp } from 'vue'
import App from './App.vue'
import axios from "axios";
import './theme.css'
import router from "./router";

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

createApp(App)
    .use(router)
    .mount('#app')
