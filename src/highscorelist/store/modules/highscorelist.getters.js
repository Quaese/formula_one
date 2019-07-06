const getters = {
  getSeasonById: state => id => {
    const season =
      state.seasons !== null
        ? state.seasons.find(season => String(season.id) === String(id))
        : null;

    return season;
  },

  getRaceById: state => options => {
    const { seasonId, raceId } = options;
    let race = null;

    const season =
      state.seasons !== null
        ? state.seasons.find(season => String(season.id) === String(seasonId))
        : null;

    if (season !== null) {
      race = season.races.find(race => String(race.id) === String(raceId));
    }

    return race;
  },

  getCurrent: state => () => {
    return state.current;
  }
};

export default getters;
