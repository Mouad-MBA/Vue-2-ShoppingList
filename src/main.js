import '@babel/polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import './plugins/bootstrap-vue'
import App from './App.vue'

Vue.use(Vuex);
Vue.use(require('vue-moment'));

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
