import TimeService from "../../services/time.service";
import HighscoreService from "../../services/highscore.service";

/*
 * Sorts results for every race in the state (state = {seasons, races, results})
 */
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

/*
 * Sorts results for a race by the raceId (state = {seasons, races, results})
 */
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

  modifyItemSuccess(state, payload) {
    // set time and time_string properties
    payload.item.time_string = payload.item.time;
    payload.item.time = TimeService.stringToSeconds(payload.item.time);

    // set changed/modified results to existing results
    state.results = { ...state.results, [payload.item.id]: payload.item };

    const tmpState = { ...state };

    // sort results list for race by the raceId
    sortResultsByRaceId(tmpState, payload.raceId);
    state.races[payload.raceId] = { ...state.races[payload.raceId] };
    HighscoreService.updateState(state);
  },

  addItemSuccess(state, payload) {
    // 04:16:123
    const race = state.races[payload.raceId];
    // create new id
    const resultId = HighscoreService.createId(race.id, race.results);

    // set time and time_string properties
    payload.item.time_string = payload.item.time;
    payload.item.time = TimeService.stringToSeconds(payload.item.time);
    payload.item.id = resultId;

    // push new resultId to result IDs array
    race.results.push(resultId);
    // update race in state
    state.races[payload.raceId] = { ...state.races[payload.raceId] };
    // update results in state
    state.results = { ...state.results, [resultId]: payload.item };

    const tmpState = { ...state };

    // sort results list for race by the raceId
    sortResultsByRaceId(tmpState, payload.raceId);
    state.races[payload.raceId] = { ...state.races[payload.raceId] };
  }
};

export default mutations;
