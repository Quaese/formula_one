import actions from "./highscorelist.actions";
import mutations from "./highscorelist.mutations";
import state from "./highscorelist.state";

const highscorelist = {
  namespaced: true,
  state,
  actions,
  mutations
};

export default highscorelist;
