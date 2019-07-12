<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h2>Race</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <highscorelist-table v-bind:race="race" v-bind:fields="fields" v-bind:seasonId="seasonId"></highscorelist-table>
      </div>
    </div>
  </div>
</template>

<script>
import HighscorelistTable from "../components/highscorelist-table.component.vue";
export default {
  name: "highscorelist-view",

  components: {
    "highscorelist-table": HighscorelistTable
  },

  data() {
    return {
      seasonId: this.$route.params.seasonId,
      raceId: this.$route.params.id
    };
  },

  computed: {
    fields() {
      return this.$store.state.highscorelist.fields;
    },
    race() {
      console.log(
        "highscorelist-race.view (computed.race)",
        this.$store.state.highscorelist.races[this.raceId]
      );
      return this.$store.state.highscorelist.races[this.raceId];
    },
    results() {
      return this.$store.state.highscorelist.results;
    }
  },

  created() {
    if (this.$store.state.highscorelist.seasons !== null) {
      // get fields
      if (this.$store.state.highscorelist.fields === null) {
        this.$store.dispatch("highscorelist/getFields");
      }
    } else {
      // back to season list
      this.$router.push(`/highscorelist`);
    }
  },

  methods: {
    // getRaceById() {
    //   return this.$store.getters["highscorelist/getRaceById"]({
    //     raceId: this.raceId,
    //     // seasonId: this.$route.params.seasonId,
    //     seasonId: this.seasonId
    //   });
    // }
  }
};
</script>

<style>
</style>
