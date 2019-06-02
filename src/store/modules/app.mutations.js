const mutations = {
  setupApp(state, payload) {
    state.name = state.name || "";
    state.name = payload.name;
    state.created = state.created || 0;
    state.created = payload.created;
  }
};

export default mutations;
