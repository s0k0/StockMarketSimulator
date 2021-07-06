import Vue from 'vue'
import App from './App.vue'
import Vuex from "vuex";
import { store } from "./store/index.js";

Vue.config.productionTip = false

Vue.use(Vuex);

new Vue({
  render: h => h(App),
  store: store,
}).$mount('#app')
