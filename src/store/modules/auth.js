import { keyCloak } from "../../keycloak/keycloak";
import { router } from "../../router";

const state = {
  accessToken: null
};

const getters = {
  accessToken(state) {
    return state.accessToken;
  },
  authed(state) {
    return state.accessToken !== null;
  }
};

const mutations = {
  saveToken(state, token) {
    state.accessToken = token;
  },
  refreshToken(state) {
    state.accessToken = keyCloak.token;
  },
  logout(state) {
    state.accessToken = null;
  }
};

const actions = {
  logout({ commit }) {
    keyCloak.logout();
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
