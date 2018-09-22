import * as _ from "lodash";
import { getAvatars } from "@/utils/apiUtils";

const state = {
  avatars: [],
  pageSize: 25,
  pages: []
};

const getters = {
  avatars(state) {
    return state.avatars;
  },
  pageSize(state) {
    return state.pageSize;
  },
  pages(state) {
    return state.pages;
  }
};

const mutations = {
  addAvatar(state, e) {
    state.avatars.push({
      email: e.email,
      url: `${process.env.VUE_APP_COLLABORATORS_AVATAR_URL}/${e.avatar}`
    });
  },
  pages(state) {
    state.pages = _.chunk(state.avatars, state.pageSize);
  },
  page(state, pageNo) {
    return state.pages[pageNo];
  },
  clearAvatars(state) {
    state.pages = [];
    state.avatars = [];
  }
};

const actions = {
  addAvatar({ commit }, avatar) {
    commit("addAvatar", avatar);
    commit("pages");
  },
  fetchAvatars({ commit }) {
    getAvatars()
      .then(res => {
        const docs = res.data;
        _.map(docs, e => {
          commit("addAvatar", e);
        });
        commit("pages");
      })
      .catch(err => {
        console.log(err);
      });
  },
  clearAvatars({ commit }) {
    commit("clearAvatars");
  },
  pages({ commit }) {
    commit("pages");
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
