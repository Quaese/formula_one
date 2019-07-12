<template>
  <div class="container-fluid" v-if="season">
    <div class="row">
      <div class="col-12">
        <h2>Season - {{season.title}}</h2>
      </div>
    </div>
    <ol class="row">
      <li
        class="col-12"
        v-for="raceId in season.races"
        :key="raceId"
        @click="navigate(raceId)"
      >{{races[raceId].title}}</li>
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
    },

    races() {
      return this.$store.state.highscorelist.races;
    }
  },

  created() {
    if (this.$store.state.highscorelist.seasons === null) {
      // back to season list
      this.$router.push(`/highscorelist`);
    }
  },

  methods: {
    navigate(id) {
      // // set id's of current objects (season, race)
      // this.$store.dispatch("highscorelist/setCurrent", {
      //   seasonId: this.seasonId,
      //   raceId: id
      // });

      // navigate to requested race
      this.$router.push(`/highscorelist/season/${this.seasonId}/race/${id}`);
    }
  }
};
</script>

<style>
</style>
