const state = {
  avatar: null
};

const getters = {
  avatar(state) {
    return state.avatar;
  }
};

const mutations = {
  saveAvatar(state, avatar) {
    state.avatar = avatar;
  },
  clearAvatar(state) {
    state.avatar = null;
  }
};

const actions = {
  applyFilter({ commit }, avatar) {
    commit("saveAvatar", avatar);
  },
  clearAvatar({ commit }) {
    commit("clearAvatar");
  }
};

export default { state, getters, mutations, actions };
