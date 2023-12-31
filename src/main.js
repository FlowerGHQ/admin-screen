/*
 * @Date: 2023-10-25 15:19:42
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import directives from './directives'
import { fitChartSize } from "./utils/echartsUtils";
import '@/assets/fonts/font-family.css';
import "amfe-flexible/index.js";
import Core from './core';

import './assets/main.css'
import '@/styles/utils.less'

const app = createApp(App)

directives(app)
app.config.globalProperties.$fitChartSize = fitChartSize; // 挂载全局
app.config.globalProperties.$U = Core.Util
app.use(createPinia())
app.use(router)

app.mount('#app')
