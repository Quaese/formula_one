const getters = {
  /*
   * Get a season by its ID
   */
  getSeasonById: state => id => {
    const season = state.seasons !== null ? state.seasons.byId[id] : null;

    return season;
  },

  /*
   * Get all results from a race
   */
  getAllRaceResults: state => race => {
    const results = state.results
      ? race.results.reduce((accu, resultId) => {
          accu.push(state.results[resultId]);
          return accu;
        }, [])
      : null;

    return results;
  },

  /*
   * Get the current modify state
   */
  getModifyState: state => () => {
    return state.modify;
  }
};

export default getters;
