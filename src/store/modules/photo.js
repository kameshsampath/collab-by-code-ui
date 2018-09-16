import { eventBus } from "../../main";

const state = {
  snapshot: null
};

const getters = {
  snapshot(state) {
    return state.snapshot;
  }
};

const mutations = {
  saveSnapshot(state, snapshot) {
    state.snapshot = snapshot;
  },
  clearSnapshot(state) {
    state.snapshot = null;
  }
};

const actions = {
  previewSnapshot({ commit }, snapshot) {
    commit("saveSnapshot", snapshot);
    eventBus.previewSnapshot();
  },
  clearSnapshot({ commit }) {
    commit("clearSnapshot");
  }
};

export default { state, getters, mutations, actions };
