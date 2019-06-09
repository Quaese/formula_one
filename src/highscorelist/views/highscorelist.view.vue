<template>
  <div>
    <h2>Highscorelist</h2>
    <highscorelist-table v-bind:list="highscorelist"></highscorelist-table>
    <p>{{new Date().getTime() }}</p>
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
      id: 1
    };
  },

  computed: {
    highscorelist() {
      console.log("computed");
      return this.$store.state.highscorelist.lists[this.id];
    }
  },

  created() {
    // if (this.$store.state.highscorelist.lists === null) {
    this.$store.dispatch("highscorelist/getById", { id: this.id });
    // }
  }
};
</script>

<style>
</style>
