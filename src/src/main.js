import Vue from 'vue'
import App from './App.vue'
import ZkTable from 'vue-table-with-tree-grid'

Vue.use(ZkTable)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
