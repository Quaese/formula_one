import TimeService from "../../services/time.service";
import HighscoreService from "../../services/highscore.service";

// sorts results for every race in the state (state = {seasons, races, results})
const sortRaceResults = state => {
  let results;

  Object.keys(state.races).forEach(raceId => {
    results = [];

    // loop over race results
    state.races[raceId].results.forEach(resultId => {
      // push corresponding results to an array
      results.push(state.results[resultId]);
    });

    // sort temporary results array
    results = HighscoreService.sortHighscorelist(results);
    // get result IDs in sorted order
    results = results.map(result => result.id);
    // assign sorted results array to race
    state.races[raceId].results = [...results];
  });
};
const sortResultsByRaceId = (state, raceId) => {
  let results = [];

  // loop over race results
  state.races[raceId].results.forEach(resultId => {
    // push corresponding results to an array
    results.push(state.results[resultId]);
  });

  // sort temporary results array
  results = HighscoreService.sortHighscorelist(results);
  // get result IDs in sorted order
  results = results.map(result => result.id);
  // assign sorted results array to race
  state.races[raceId].results = [...results];
};

const mutations = {
  getFieldsSuccess(state, payload) {
    state.fields = [...payload.fields];
  },

  fetchStateSuccess(state, payload) {
    sortRaceResults(payload.state);

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
    // set time and time_string properties
    payload.item.time_string = payload.item.time;
    payload.item.time = TimeService.stringToSeconds(payload.item.time);

    // set changed/modified results to existing results
    state.results = { ...state.results, [payload.item.id]: payload.item };

    const tmpState = { ...state };

    // sortRaceResults(tmpState);
    // // set state
    // state.races = { ...tmpState.races };
    //

    sortResultsByRaceId(tmpState, payload.raceId);
    state.races[payload.raceId] = { ...state.races[payload.raceId] };

    // // rebuild highscore list
    // let list = [...state.lists[payload.listId].list];
    // list[index] = payload.item;
    //

    // // sort and recalculate new highscore list
    // list = HighscoreService.sortHighscorelist(list);

    // // set new state
    // state.lists[payload.listId].list = [...list];
  },

  modifyItem_old(state, payload) {
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
