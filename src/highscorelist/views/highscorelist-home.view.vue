<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h2>Season List</h2>
      </div>
    </div>
    <ol class="row">
      <li class="col-12" v-for="(season) in seasons" :key="season.id">
        <span @click="navigate(season.id)">{{season.title}} (ID: {{season.id}})</span>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "highscorelist-home-view",

  data() {
    return {};
  },

  computed: {
    seasons() {
      return this.$store.state.highscorelist.seasons;
    }
  },

  created() {
    // get seasons
    if (this.$store.state.highscorelist.seasons === null) {
      this.$store.dispatch("highscorelist/getSeasons");
    }
  },

  methods: {
    navigate(id) {
      // set id's of current objects (season, race)
      this.$store.dispatch("highscorelist/setCurrent", {
        seasonId: id,
        raceId: null
      });

      // navigate to requested season
      this.$router.push(`/highscorelist/season/${id}`);
    }
  }
};
</script>

<style>
</style>
