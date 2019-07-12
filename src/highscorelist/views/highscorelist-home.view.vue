<template>
  <div>
    <h2>Highscorelist Home - Seasons-List</h2>
    <ol v-if="seasons!==null">
      <li v-for="(seasonId) in order" :key="seasonId">
        <span @click="navigate(seasonId)">{{seasons[seasonId].title}} (ID: {{seasons[seasonId].id}})</span>
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
      return this.$store.state.highscorelist.seasons
        ? this.$store.state.highscorelist.seasons.byId
        : null;
    },
    order() {
      return this.$store.state.highscorelist.seasons.order;
    }
  },

  created() {
    // get seasons
    if (this.$store.state.highscorelist.seasons === null) {
      this.$store.dispatch("highscorelist/fetchState");
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
