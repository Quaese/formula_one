<template>
  <div>
    <table v-if="results!==null">
      <thead>
        <th v-for="(header, index) in fields" :key="index">{{header.value}}</th>
      </thead>
      <tbody>
        <highscorelist-item
          v-for="(resultId, idxLine) in race.results"
          v-bind:listId="resultId"
          v-bind:fields="fields"
          v-bind:item="results[resultId]"
          v-bind:idxLine="idxLine"
          :key="idxLine"
        ></highscorelist-item>

        <!-- <highscorelist-item-add v-bind:listId="list.id" v-bind:fields="fields"></highscorelist-item-add> -->
      </tbody>
    </table>
  </div>
</template>

<script>
import TimeService from "../services/time.service";

import HighscorelistItem from "./highscorelist-item.component";
import HighscorelistItemAdd from "./highscorelist-itemadd.component";

export default {
  name: "highscorelist-table",

  components: {
    "highscorelist-item": HighscorelistItem,
    "highscorelist-item-add": HighscorelistItemAdd
  },

  data() {
    return {};
  },

  props: {
    race: {
      type: Object,
      default() {
        return {};
      }
    },
    fields: {
      type: Array,
      default() {
        return [
          { name: "place", value: "Platz" },
          { name: "name", value: "Name" },
          { name: "time", value: "Zeit" },
          { name: "diff_first", value: "+" },
          { name: "diff_prev", value: "+" },
          { name: "actions", value: "Aktionen" }
        ];
      }
    }
  },

  computed: {
    results() {
      return this.$store.state.highscorelist.results;
    }
  },

  // Larissa Rosenthal
  // Ladyna Wittscher

  mounted() {
    console.log(this.race, this.fields);
  },

  methods: {
    formatTime: function(time) {
      return TimeService.secondsToString(time);
    }
  }
};
</script>

<style>
</style>
