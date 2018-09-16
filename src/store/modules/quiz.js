import { keyCloak } from "../../keycloak/keycloak";
import { getQuestions } from "../../utils/apiUtils";

const state = {
  questions: null
};

const getters = {
  questions(state) {
    return state.questions;
  },
  hasQuestions(state) {
    return state.questions !== null && state.questions.length > 0;
  }
};

const mutations = {
  saveQuestions(state, questions) {
    state.questions = questions;
  }
};

const actions = {
  fetchQuestions({ commit }) {
    //console.log("Fetching Questions from backend");
    getQuestions()
      .then(questions => {
        //console.log("Questions", questions);
        commit("saveQuestions", questions);
      })
      .catch(err => console.log("Error fetching questions", err));
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
