import Vue from 'vue'
import Vuelidate from 'vuelidate'
import moment from 'moment'
import App from './App.vue'
import router from './router'
import store from './store'
import '@babel/polyfill'
import 'mutationobserver-shim'
import './plugins/bootstrap-vue'

Vue.use(Vuelidate)
Vue.prototype.moment = moment
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
