import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import Dashboard from './views/Dashboard.vue'
import About from './views/About.vue'
import Calendar from './views/Calendar.vue'
import EmotionToolBox from './views/EmotionToolBox.vue'
import './index.css'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Dashboard },
    { path: '/about', component: About },
    { path: '/calendar', component: Calendar },
    { path: '/emotiontoolbox', component: EmotionToolBox }
  ]
})
const app = createApp(App)
app.use(router)
app.mount('#app')
