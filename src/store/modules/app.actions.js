const actions = {
  setupApp({ commit }, payload) {
    payload.created = new Date().getTime();

    // set state to loading
    commit("setupApp", payload);
  },

  setAppName({ commit, state }, payload) {
    commit("setAppNameSuccess", payload);
  }
};

export default actions;
