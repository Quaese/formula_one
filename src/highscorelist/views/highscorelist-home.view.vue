<template>
  <div>
    <h2>Highscorelist Home - Seasons-List</h2>
    <ol>
      <li v-for="(season) in seasons" :key="season.id">
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
      this.$router.push(`/highscorelist/season/${id}`);
    }
  }
};
</script>

<style>
</style>
