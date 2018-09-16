import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth";
import quiz from "./modules/quiz";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {},
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    auth,
    quiz
  }
});
