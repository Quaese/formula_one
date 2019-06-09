import TimeService from "../../services/time.service";

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
  },

  modifyEntry(state, item) {
    console.log("mutation.modifyEntry: ");
    const index = state.lists[1].list.findIndex(entry => entry.id === item.id);

    item.time_string = item.time;
    item.time = TimeService.stringToSeconds(item.time);

    let array = [...state.lists[1].list];
    array[index] = item;

    console.log("mutation.modifyEntry: ", array);

    // ToDo: time Eigenschaft aus aktueller time Eigenschaft berechnen
    //       aktuelle time Eigenschaft wird time_string Eigenschaft

    state.lists[1].list = [...array];
    // state.lists[1].list = { ...state.lists[1].list, [index]: item };
    // state.lists[1].list = [...state.lists[1].list, item];
    // state.lists[1].list = [...state.lists[1].list, array[index]];

    // state.lists = { ...state.lists };
  }
};

export default mutations;
