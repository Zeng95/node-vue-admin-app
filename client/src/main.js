import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/echarts-vue'
import '@babel/polyfill'
import 'mutationobserver-shim'
import './plugins/bootstrap-vue'
import './assets/css/custom.css'
import './assets/css/utility.css'
import './assets/css/main.css'

Vue.use(Vuelidate)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
