<template>
  <div>
    <h2>Highscorelist</h2>
    <highscorelist-table v-bind:list="highscorelist" v-bind:fields="fields"></highscorelist-table>
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
      return this.$store.state.highscorelist.lists[this.id];
    },
    fields() {
      return this.$store.state.highscorelist.fields;
    }
  },

  created() {
    // get fields
    if (this.$store.state.highscorelist.fields === null) {
      this.$store.dispatch("highscorelist/getFields");
    }

    // if (this.$store.state.highscorelist.lists === null) {
    this.$store.dispatch("highscorelist/getById", { id: this.id });
    // }
  }
};
</script>

<style>
</style>
