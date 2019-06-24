<template>
  <div>
    <h2>Highscorelist Home - Season</h2>
    <p v-if="season">{{season.title}}</p>
  </div>
</template>

<script>
export default {
  name: "highscorelist-season-view",

  data() {
    return {};
  },

  computed: {
    seasons() {
      return this.$store.state.highscorelist.seasons;
    },
    season() {
      return this.$store.getters["highscorelist/getSeasonById"](
        this.$route.params.id
      );
    }
  },

  created() {
    const id = this.$route.params.id;
    // get season

    if (this.$store.state.highscorelist.seasons !== null) {
      const season = this.$store.getters["highscorelist/getSeasonById"](id);
      if (season.races === undefined) {
        this.$store.dispatch("highscorelist/getRacesForSeasonId", {
          id,
          racesIDs: season.racesIDs
        });
      }
      // this.$store.dispatch("highscorelist/getSeasonById", { id });
    } else {
      // ToDo: No seasons ...
    }
    // if (this.$store.state.highscorelist.seasons === null) {
    //   this.$store.dispatch("highscorelist/getSeasons");
    // }
  },

  methods: {
    navigate(id) {
      this.$router.push(`/highscorelist/season/${id}`);
    }
  }
};
</script>

<style>
</style>
