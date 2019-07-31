import HighscoreService from "../../services/highscore.service";
import highscores from "../../mock/highscorelist";
import { fields } from "../../mock/fields.mock";

const actions = {
  getFields({ commit }) {
    commit("getFieldsSuccess", { fields });
  },

  fetchState: async ({ commit }) => {
    try {
      const state = await HighscoreService.fetchState();
      commit("fetchStateSuccess", { state });
    } catch (error) {
      console.log(error);
    }
  },

  getById({ commit }, payload) {
    const highscore = highscores[payload.id || 1];

    // set state to loading
    commit("getByIdSuccess", { id: payload.id || 1, highscore: highscore });
  },

  modifyItem({ commit }, payload) {
    commit("modifyItemSuccess", payload);
  },

  addItem({ commit }, payload) {
    commit("addItemSuccess", payload);
  },

  removeItem({ commit }, payload) {
    commit("removeItemSuccess", payload);
  }
};

export default actions;
