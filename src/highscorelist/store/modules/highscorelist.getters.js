const getters = {
  getSeasonById: state => id => {
    const season =
      state.seasons !== null
        ? state.seasons.find(season => String(season.id) === String(id))
        : null;

    return season;
  }
};

export default getters;
