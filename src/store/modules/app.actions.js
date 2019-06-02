const actions = {
  setupApp({ commit }, payload) {
    payload.created = new Date().getTime();

    // set state to loading
    commit("setupApp", payload);
  }
};

export default actions;
