const mutations = {
  getByIdSuccess(state, payload) {
    state.lists = { ...state.lists } || {};

    state.lists = {
      ...state.lists,
      [payload.id]: payload.highscore
    };
  },

  getByIdSuccess__(state, payload) {
    state.highscorelist = { ...state.highscorelist } || {};

    state.highscorelist = {
      ...state.highscorelist,
      lists: {
        ...(state.highscorelist.lists || {}),
        [payload.id]: payload.highscore
      }
      // ...highscore
    };
  }
};

export default mutations;
