import actions from "./highscorelist.actions";
import mutations from "./highscorelist.mutations";
import getters from "./highscorelist.getters";
import state from "./highscorelist.state";

const highscorelist = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};

export default highscorelist;
