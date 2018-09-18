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
    commit("logout");
  },
  refreshToken({ commit }, minValidity) {
    keyCloak
      .updateToken(minValidity || 10)
      .then(() => {
        console.log("Refreshed Token Successfully");
        commit("refreshToken");
      })
      .catch(() => {
        commit("logout");
        console.error("Unable to refresh token, clearing existing sessions");
      });
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
