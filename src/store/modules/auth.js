//import { keyCloak } from "../../keycloak/keycloak";
import { router } from "../../router";

const state = {
  accessToken: null
};

const getters = {
  accessToken(state) {
    return "redhat";
  },
  authed(state) {
    return true;
  }
};

const mutations = {
  saveToken(state, token) {
    state.accessToken = token;
  },
  refreshToken(state) {
    state.accessToken = "redhat";
  },
  logout(state) {
    state.accessToken = "redhat";
  }
};

const actions = {
  logout({ commit }) {
    //keyCloak.logout();
    commit("logout");
    router.replace({ name: "home" });
  },
  refreshToken({ commit }) {
    commit("refreshToken");
  },
  saveToken({ commit }, token) {
    commit("saveToken", token);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
