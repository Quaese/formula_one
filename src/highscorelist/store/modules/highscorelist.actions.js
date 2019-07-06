//import BandsService from "../../services/bands.service";
import highscores from "../../mock/highscorelist";
import { Seasons, Races, fields } from "../../mock/saisons.mock";

const loadRaces = ids => {
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

  getSeasons({ commit }) {
    // ToDo: get seasons from JSON, database or sth. else
    const seasons = [...Seasons];

    // mutation with seasons array
    commit("getSeasonsSuccess", { seasons });
  },

  getRacesForSeasonId({ commit }, payload) {
    const id = payload.id;

    const races = [...loadRaces(payload.racesIDs)];

    // set state to loading
    commit("getRacesForSeasonIdSuccess", { races, id });
  },

  setCurrent({ commit }, payload) {
    commit("setCurrentSuccess", payload);
  },

  updateResult({ commit }, payload) {
    commit("updateResultSuccess", payload);
  },
  /*
   * Old Actions below ... test if needed anymore
   */

  getById({ commit }, payload) {
    const highscore = highscores[payload.id || 1];

    // set state to loading
    commit("getByIdSuccess", { id: payload.id || 1, highscore: highscore });
  },

  addItem({ commit }, payload) {
    commit("addItem", payload);
  }
};

export default actions;
