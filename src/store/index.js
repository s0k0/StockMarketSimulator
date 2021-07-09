import Vuex from "vuex";
import Vue from 'vue'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    stocks: {}
  },
  mutations: {
    updateStocks(state, event) {
      const data = JSON.parse(event.data)
      state.stocks[data.isin] = data.price;
      console.log(state.stocks)
    }
  },
  actions: {
    updateStocks({ commit }, event) {
      commit("updateStocks", event);
    }
  }
});