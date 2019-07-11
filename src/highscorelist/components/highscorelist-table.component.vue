<template>
  <table v-if="race" class="table table-hover">
    <thead>
      <th v-for="(header, index) in fields" :key="index">{{header.value}}</th>
    </thead>
    <tbody>
      <highscorelist-item
        v-for="(result, idxLine) in race.results"
        v-bind:raceId="race.id"
        v-bind:fields="fields"
        v-bind:result="result"
        v-bind:seasonId="seasonId"
        v-bind:idxLine="idxLine"
        :key="idxLine"
      ></highscorelist-item>

      <highscorelist-item-add v-bind:listId="race.id" v-bind:fields="fields"></highscorelist-item-add>
    </tbody>
    <tfoot>
      <td :colspan="fields.length">{{this.appName}}</td>
    </tfoot>
  </table>
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
    seasonId: {
      type: String,
      default: "1"
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
    appName() {
      return this.$store.state.app.name;
    }
  }

  // Larissa Rosenthal
  // Ladyna Wittscher
};
</script>

<style>
</style>
