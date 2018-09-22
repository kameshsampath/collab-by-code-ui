import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth";
import quiz from "./modules/quiz";
import photo from "./modules/photo";
import photoFilter from "./modules/photoFilter";
import gallery from "./modules/gallery";
import appMessages from "./modules/appMessages";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    progressIndex: 0
  },
  mutations: {
    progress(state, progVal) {
      state.progressIndex = progVal;
    },
    clearProgress(state) {
      state.progressIndex = 0;
    }
  },
  getters: {
    progress(state) {
      return Math.ceil((state.progressIndex / 5) * 100);
    }
  },
  actions: {
    progress({ commit }, step) {
      commit("progress", step);
    },
    clearProgress({ commit }) {
      commit("clearProgress");
    }
  },
  modules: {
    auth,
    quiz,
    photo,
    photoFilter,
    gallery,
    appMessages
  }
});
