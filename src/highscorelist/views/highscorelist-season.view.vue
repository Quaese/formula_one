<template>
  <div class="container-fluid" v-if="season">
    <div class="row">
      <div class="col-12">
        <h2>Season - {{season.title}}</h2>
      </div>
    </div>
    <ol class="row">
      <li
        @click="navigate(race.id)"
        class="col-12"
        v-for="race in season.races"
        :key="race.id"
      >{{race.title}}</li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "highscorelist-season-view",

  data() {
    return {
      seasonId: this.$route.params.id
    };
  },

  computed: {
    season() {
      return this.$store.getters["highscorelist/getSeasonById"](this.seasonId);
    }
  },

  created() {
    if (this.$store.state.highscorelist.seasons !== null) {
      // get season by id
      const season = this.$store.getters["highscorelist/getSeasonById"](
        this.seasonId
      );

      // no races loaded yet => dispatch action to load season races
      if (season.races === undefined) {
        this.$store.dispatch("highscorelist/getRacesForSeasonId", {
          id: this.seasonId,
          racesIDs: season.racesIDs
        });
      }
    } else {
      console.log("...:", this.$store.state.highscorelist.current);
      // back to season list
      this.$router.push(`/highscorelist`);
    }
  },

  methods: {
    navigate(id) {
      // set id's of current objects (season, race)
      this.$store.dispatch("highscorelist/setCurrent", {
        seasonId: this.seasonId,
        raceId: id
      });

      // navigate to requested race
      this.$router.push(`/highscorelist/season/${this.seasonId}/race/${id}`);
    }
  }
};
</script>

<style>
</style>
