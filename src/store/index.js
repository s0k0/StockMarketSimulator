import Vuex from "vuex";
import Vue from 'vue'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    market: null
  },
  mutations: {
    updateMarket(state, newname) {
      state.name = newname;
    }
  },
  actions: {
    updateMarket({ commit }) {
      commit("updateMarket", {});
    }
  }
});