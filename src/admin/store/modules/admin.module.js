import actions from "./admin.actions";
import mutations from "./admin.mutations";
import getters from "./admin.getters";
import state from "./admin.state";

const admin = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};

export default admin;
