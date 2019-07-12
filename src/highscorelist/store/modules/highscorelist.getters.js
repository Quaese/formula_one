const getters = {
  getSeasonById: state => id => {
    const season = state.seasons !== null ? state.seasons.byId[id] : null;

    return season;
  }
};

export default getters;
