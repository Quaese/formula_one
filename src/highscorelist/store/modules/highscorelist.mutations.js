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

  modifyItemSuccess: async (state, payload) => {
    // set time and time_string properties
    payload.item.time_string = payload.item.time;
    payload.item.time = TimeService.stringToSeconds(payload.item.time);

    // set changed/modified results to existing results
    state.results = { ...state.results, [payload.item.id]: payload.item };

    const tmpState = { ...state };

    // sort results list for race by the raceId
    sortResultsByRaceId(tmpState, payload.raceId);
    state.races[payload.raceId] = { ...state.races[payload.raceId] };

    // update state.json file on server
    await HighscoreService.updateState(state);
  },

  addItemSuccess: async (state, payload) => {
    // 04:16:123
    const race = state.races[payload.raceId];
    // create new id
    const resultId = HighscoreService.createId(
      race.id,
      race.results,
      "_result"
    );

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

    // update state.json file on server
    await HighscoreService.updateState(state);
  },

  removeItemSuccess: async (state, payload) => {
    // get race by id
    const race = state.races[payload.raceId];
    // remove result id from results array
    race.results = race.results.filter(id => id !== payload.resultId);
    // update races in state
    state.races = { ...state.races, [payload.raceId]: race };
    // delete result object from state
    delete state.results[payload.resultId];

    // // update state.json file on server
    await HighscoreService.updateState(state);
  },

  setModifyStateSuccess(state, payload) {
    state.modify = { ...state.modify, [payload.object]: payload.id };
  },

  addSeasonSuccess: async (state, payload) => {
    const seasonId = HighscoreService.createId("season", state.seasons.order);
    const date = new Date().getTime();

    state.seasons.byId = {
      ...state.seasons.byId,
      [seasonId]: {
        id: seasonId,
        title: seasonId,
        created: date,
        modified: date,
        races: []
      }
    };
    state.seasons.order.push(seasonId);

    try {
      await HighscoreService.updateState(state);
      state.modify = { ...state.modify, [payload.object]: null };
    } catch (err) {
      console.log("ERROR: Could not update state on server");
    }
  },

  updateSeasonSuccess: async (state, payload) => {
    // update properties
    state.seasons.byId[payload.id] = {
      ...state.seasons.byId[payload.id],
      title: payload.title,
      modified: new Date().getTime()
    };

    try {
      await HighscoreService.updateState(state);
      state.modify = { ...state.modify, [payload.object]: null };
    } catch (err) {
      console.log("ERROR: Could not update state on server");
    }
  },

  removeSeasonSuccess: async (state, payload) => {
    var seasons = { ...state.seasons };
    const season = seasons.byId[payload.id];

    season.races.forEach(raceId => {
      // get race object from state
      const race = state.races[raceId];

      // remove all related results
      race.results.forEach(resultId => delete state.results[resultId]);

      // remove race from state
      delete state.races[raceId];
    });

    // remove season object from state
    delete seasons.byId[payload.id];
    // remove season id from order array
    seasons.order = [
      ...seasons.order.filter(seasonId => seasonId !== payload.id)
    ];

    // update seasons
    state.seasons = { ...seasons };

    try {
      await HighscoreService.updateState(state);
      state.modify = { ...state.modify, [payload.object]: null };
    } catch (err) {
      console.log("ERROR: Could not update state on server");
    }
  },

  updateRaceSuccess: async (state, payload) => {
    // update properties
    state.races[payload.id] = {
      ...state.races[payload.id],
      title: payload.title,
      location: payload.location,
      modified: new Date().getTime()
    };

    try {
      await HighscoreService.updateState(state);
      state.modify = { ...state.modify, [payload.object]: null };
    } catch (err) {
      console.log("ERROR: Could not update state on server");
    }
  },

  addRaceSuccess: async (state, payload) => {
    const raceId = HighscoreService.createId(
      payload.seasonId + "_race",
      state.seasons.byId[payload.seasonId].races
    );
    const date = new Date().getTime();

    // add new race to state
    state.races = {
      ...state.races,
      [raceId]: {
        id: raceId,
        season_id: payload.seasonId,
        title: "New Race",
        location: "New Location",
        created: date,
        modified: date,
        results: []
      }
    };

    // add new race id to related season
    state.seasons.byId[payload.seasonId] = {
      ...state.seasons.byId[payload.seasonId],
      races: [...state.seasons.byId[payload.seasonId].races, raceId],
      modified: date
    };

    try {
      await HighscoreService.updateState(state);
      state.modify = { ...state.modify, [payload.object]: null };
    } catch (err) {
      console.log("ERROR: Could not update state on server");
    }
  },

  removeRaceSuccess: async (state, payload) => {
    const race = state.races[payload.id];
    const date = new Date().getTime();

    // remove race id from related season object
    state.seasons.byId[race.season_id] = {
      ...state.seasons.byId[race.season_id],
      races: [
        ...state.seasons.byId[race.season_id].races.filter(
          race => race !== payload.id
        )
      ],
      modified: date
    };

    // remove related results from state
    race.results.forEach(resultId => delete state.results[resultId]);

    // remove race from state
    delete state.races[payload.id];

    try {
      await HighscoreService.updateState(state);
      state.modify = { ...state.modify, [payload.object]: null };
    } catch (err) {
      console.log("ERROR: Could not update state on server");
    }
  }
};

export default mutations;
