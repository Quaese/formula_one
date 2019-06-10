//import BandsService from "../../services/bands.service";
import highscores, { fields } from "../../mock/highscorelist";

const actions = {
  getFields({ commit }) {
    commit("getFieldsSuccess", { fields });
  },

  getById({ commit }, payload) {
    const highscore = highscores[payload.id || 1];

    // set state to loading
    commit("getByIdSuccess", { id: payload.id || 1, highscore: highscore });
  },

  modifyItem({ commit }, payload) {
    commit("modifyItem", payload);
  }
};

export default actions;
