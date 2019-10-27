const raceResults = (state, race) => {
  const results = state.results
    ? race.results.reduce((accu, resultId) => {
        accu.push(state.results[resultId]);
        return accu;
      }, [])
    : null;

  return results;
};

const getters = {
  /*
   * Get a season by its ID
   */
  getSeasonById: state => id => {
    const season = state.seasons !== null ? state.seasons.byId[id] : null;

    return season;
  },

  /*
   * Get a race by its ID
   */
  getResultById: state => id => {
    const result = state.results !== null ? state.results[id] : null;

    return result;
  },

  /*
   * Get a race by its ID
   */
  getRaceById: state => id => {
    const race = state.races !== null ? state.races[id] : null;

    return race;
  },

  /*
   * Get all results from a race
   */
  getAllRaceResults: state => race => {
    // const results = state.results
    //   ? race.results.reduce((accu, resultId) => {
    //       accu.push(state.results[resultId]);
    //       return accu;
    //     }, [])
    //   : null;

    // return results;

    return raceResults(state, race);
  },

  /*
   * Get drivers
   */
  getDrivers: state => () => {
    const drivers = state.drivers !== null ? state.drivers : null;

    return drivers;
  },

  /*
   * Get all drivers from a race without a result as object (hash)
   */
  getAvailableDriversForRace: state => race => {
    const results = raceResults(state, race);
    let availableDrivers = state.drivers !== null ? { ...state.drivers } : null;

    if (
      (results && results.length === 0) ||
      results === null ||
      availableDrivers === null
    )
      return availableDrivers;

    // loop over results and filter availableDrivers
    results.forEach(result => {
      delete availableDrivers[result.driverId];
    });

    console.log(availableDrivers);
    return availableDrivers;
  },

  /*
   * Get all drivers from a race without a result as array
   */
  getAvailableDriversForRaceAsArray: state => race => {
    const results = raceResults(state, race);
    let availableDrivers = state.drivers !== null ? { ...state.drivers } : null;

    if (
      (results && results.length === 0) ||
      results === null ||
      availableDrivers === null
    )
      return availableDrivers;

    // loop over results and filter availableDrivers
    results.forEach(result => {
      delete availableDrivers[result.driverId];
    });

    console.log(availableDrivers);
    const ret = Object.entries(availableDrivers).reduce((arr, driver) => {
      arr.push(driver[1]);
      return arr;
    }, []);

    console.log(ret);

    return ret;
  },

  /*
   * Get the current modify state
   */
  getModifyState: state => () => {
    return state.modify;
  }
};

export default getters;
