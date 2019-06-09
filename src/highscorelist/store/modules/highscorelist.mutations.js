import TimeService from "../../services/time.service";
import HighscoreService from "../../services/highscore.service";

const mutations = {
  getByIdSuccess(state, payload) {
    state.lists = { ...state.lists } || {};

    const list = HighscoreService.sortHighscorelist(payload.highscore.list);
    payload.highscore.list = [...list];

    state.lists = {
      ...state.lists,
      [payload.id]: payload.highscore
    };
  },

  modifyItem(state, payload) {
    // find index of modified highscore item
    const index = state.lists[payload.listId].list.findIndex(
      entry => entry.id === payload.item.id
    );

    // set time and time_string properties
    payload.item.time_string = payload.item.time;
    payload.item.time = TimeService.stringToSeconds(payload.item.time);

    // rebuild highscore list
    let list = [...state.lists[payload.listId].list];
    list[index] = payload.item;

    // sort and recalculate new highscore list
    list = HighscoreService.sortHighscorelist(list);

    // set new state
    state.lists[payload.listId].list = [...list];
  }
};

export default mutations;
