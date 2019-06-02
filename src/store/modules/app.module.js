import actions from "./app.actions";
import mutations from "./app.mutations";
import state from "./app.state";

const app = {
  namespaced: true,
  state,
  actions,
  mutations
};

export default app;
