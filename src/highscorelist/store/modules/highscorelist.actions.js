import HighscoreService from "../../services/highscore.service";
import highscores from "../../mock/highscorelist";
import { Seasons, Races, fields } from "../../mock/saisons.mock";

const getRaces = ids => {
  const loadRaces = [...Races];

  let races = [];

  ids.forEach(id => {
    races.push(loadRaces.find(race => race.id === id));
  });

  return races;
};

const actions = {
  getFields({ commit }) {
    commit("getFieldsSuccess", { fields });
  },

  // getSeasonsIDs({ commit }) {
  //   const ids = Object.keys(Seasons);
  //   commit("getSeasonsIDsSuccess", { ids });
  // },

  fetchState({ commit }) {
    HighscoreService.fetchState().then(
      state => {
        commit("fetchStateSuccess", { state });
      },
      error => {
        console.log(error);
      }
    );
  },

  getSeasonById({ commit, dispatch, state }, payload) {
    let index = -1;
    const id = payload.id;
    const season = state.seasons.find((season, i) => {
      let found = false;
      if (String(season.id) === id) {
        index = i;
        found = true;
      }
      return found;
    });

    console.log(index);
    if (season.races === undefined) {
      season.races = [...getRaces(season.racesIDs)];
    }

    // set state to loading
    commit("getSeasonByIdSuccess", { season, index });
  },

  getRacesForSeasonId({ commit, dispatch, state }, payload) {
    const id = payload.id;

    const races = [...getRaces(payload.racesIDs)];

    // set state to loading
    commit("getRacesForSeasonIdSuccess", { races, id });
  },

  getById({ commit }, payload) {
    const highscore = highscores[payload.id || 1];

    // set state to loading
    commit("getByIdSuccess", { id: payload.id || 1, highscore: highscore });
  },

  modifyItem({ commit }, payload) {
    commit("modifyItem", payload);
  },

  addItem({ commit }, payload) {
    commit("addItem", payload);
  }
};

export default actions;
