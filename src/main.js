import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import authService from '@/services/authService';

// Свіжий логін при кожному запуску: initData визначає поточного користувача Telegram.
// Запити до API самі дочекаються цього логіну (див. interceptor в apiService).
authService.validateAndLogin();

createApp(App).use(store).use(router).mount('#app')
