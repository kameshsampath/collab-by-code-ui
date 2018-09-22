const state = {
  title: "Collab by Code",
  messages: []
};

const getters = {
  messages(state) {
    return state.messages;
  },
  title(state) {
    return state.title;
  },
  hasError(state) {
    return state.messages !== null && state.messages.length > 0;
  }
};

const mutations = {
  messages(state, appMessages) {
    //console.log("Mutating Messages", JSON.stringify(appMessages.message));
    const message = appMessages.message;
    if (message.statusCode !== null && message.statusCode >= 400) {
      state.title = `Error: ${appMessages.title}` || state.title;
    } else {
      state.title = appMessages.title || state.title;
    }

    state.messages.push(message.message);
  },
  clearMessages(state) {
    state.messages = [];
    state.title = "Collab by Code";
  }
};

const actions = {
  messages({ commit }, appMessages) {
    commit("clearMessages");
    commit("messages", appMessages);
  },
  clearMessages({ commit }) {
    commit("clearMessages");
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
