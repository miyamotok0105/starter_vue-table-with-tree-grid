import Vue from 'vue'
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify';

import App from './App.vue'
import Home from './components/Home'
import Accordion from './pages/Accordion'

Vue.use(VueRouter)
Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/home', name: 'home', component: Home },
    { path: '/accordion', name: 'accordion', component: Accordion },
    // { path: '/bar/:id', name: 'bar', component: Bar }
  ]
})


new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
