import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth";
import quiz from "./modules/quiz";
import photo from "./modules/photo";
import photoFilter from "./modules/photoFilter";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {},
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    auth,
    quiz,
    photo,
    photoFilter
  }
});
