import TimeService from "../../services/time.service";
import HighscoreService from "../../services/highscore.service";

const mutations = {
  getFieldsSuccess(state, payload) {
    state.fields = [...payload.fields];
  },

  fetchStateSuccess(state, payload) {
    // set state
    state.seasons = { ...payload.state.seasons };
    state.races = { ...payload.state.races };
    state.results = { ...payload.state.results };
  },

  getByIdSuccess(state, payload) {
    state.lists = { ...state.lists } || {};

    const list = HighscoreService.sortHighscorelist(payload.highscore.list);
    payload.highscore.list = [...list];

    state.lists = {
      ...state.lists,
      [payload.id]: payload.highscore
    };
  },

  // getSeasonsIDsSuccess(state, payload) {
  //   state.seasonsIDs = { ...payload.ids };
  // },

  getSeasonsSuccess(state, payload) {
    state.seasons = [...payload.seasons];
  },

  getSeasonByIdSuccess(state, payload) {
    // const id = payload.id;
    // const season = state.seasons.find(season => String(season.id) === id);

    // ToDo:
    // test if (season.races === undefined)
    // if so => load races by IDs from racesIDs array

    state.season = { ...payload.season };
  },

  getRacesForSeasonIdSuccess(state, payload) {
    const id = payload.id;
    // let season = state.seasons.find(season => String(season.id) === id);
    state.seasons.forEach(season => {
      if (String(season.id) === id) {
        season.races = [...payload.races];
      }
    });

    console.log("getRacesForSeasonIdSuccess");

    // ToDo:
    // test if (season.races === undefined)
    // if so => load races by IDs from racesIDs array

    // state.season = { ...payload.season };
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
  },

  addItem(state, payload) {
    // 04:16:123
    // create new id
    const id = HighscoreService.createId(state.lists[payload.listId].list);

    // set time and time_string properties
    payload.item.time_string = payload.item.time;
    payload.item.time = TimeService.stringToSeconds(payload.item.time);
    payload.item.id = id;

    // create temporary list
    let list = [...state.lists[payload.listId].list, payload.item];
    // sort temporary list
    list = HighscoreService.sortHighscorelist(list);

    // set new state
    state.lists[payload.listId].list = [...list];
  }
};

export default mutations;
