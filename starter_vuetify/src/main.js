import Vue from 'vue'
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify';

import App from './App.vue'
import Home from './components/Home'
import Accordion from './pages/Accordion'
import DataTable from './pages/DataTable'
import SelectionCheckboxDataTable from './pages/SelectionCheckboxDataTable'
import SimpleCheckbox from './pages/SimpleCheckbox'
import SimpleCheckboxTemplate from './pages/SimpleCheckboxTemplate'
import TreeViewDataTable from './pages/TreeViewDataTable'

Vue.use(VueRouter)
Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/home', name: 'home', component: Home },
    { path: '/accordion', name: 'accordion', component: Accordion },
    { path: '/dataTable', name: 'dataTable', component: DataTable },
    { path: '/selectionCheckboxDataTable', name: 'selectionCheckboxDataTable', component: SelectionCheckboxDataTable },
    { path: '/simpleCheckbox', name: 'SimpleCheckbox', component: SimpleCheckbox },
    { path: '/simpleCheckboxTemplate', name: 'simpleCheckboxTemplate', component: SimpleCheckboxTemplate },
    { path: '/treeViewDataTable', name: 'treeViewDataTable', component: TreeViewDataTable },
    
    // { path: '/bar/:id', name: 'bar', component: Bar }
  ]
})


new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
