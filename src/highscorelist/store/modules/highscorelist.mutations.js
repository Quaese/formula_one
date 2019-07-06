import TimeService from "../../services/time.service";
import HighscoreService from "../../services/highscore.service";

const mutations = {
  getFieldsSuccess(state, payload) {
    state.fields = [...payload.fields];
  },

  getSeasonsSuccess(state, payload) {
    state.seasons = [...payload.seasons];
  },

  getRacesForSeasonIdSuccess(state, payload) {
    // add races to season
    state.seasons.forEach(season => {
      if (String(season.id) === payload.id) {
        // sort race results
        payload.races.forEach(
          race =>
            (race.results = HighscoreService.sortHighscorelist(race.results))
        );

        season.races = [...payload.races];
      }
    });
  },

  setCurrentSuccess(state, payload) {
    state.current = { ...payload };
  },

  updateResultSuccess(state, payload) {
    let seasonIndex = 0;
    const season = state.seasons.find((season, index) => {
      if (String(season.id) === payload.seasonId) {
        seasonIndex = index;
        return true;
      } else {
        return false;
      }
    });
    // find index of modified highscore item
    const raceIndex = season.races.findIndex(
      race => race.id === payload.raceId
    );
    // find index of modified highscore item
    const resultIndex = season.races[raceIndex].results.findIndex(
      result => result.id === payload.result.id
    );
    // debugger;
    // set time and time_string properties
    payload.result.time_string = payload.result.time;
    payload.result.time = TimeService.stringToSeconds(payload.result.time);

    // rebuild highscore list
    let results = [...season.races[raceIndex].results];
    results[resultIndex] = payload.result;

    // sort and recalculate new highscore list
    results = HighscoreService.sortHighscorelist(results);

    // let races = [...season.races];
    // races[raceIndex] = { ...races[raceIndex], results };

    console.log("highscorelist.mutations (updateResultSuccess)");

    // set new state
    // state.seasons[seasonIndex].races = [...races];
    state.seasons[seasonIndex].races[raceIndex].results = [...results];
  },

  /*
   * Old Actions below ... test if needed anymore
   */

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

  getByIdSuccess(state, payload) {
    state.lists = { ...state.lists } || {};

    const list = HighscoreService.sortHighscorelist(payload.highscore.list);
    payload.highscore.list = [...list];

    state.lists = {
      ...state.lists,
      [payload.id]: payload.highscore
    };
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
