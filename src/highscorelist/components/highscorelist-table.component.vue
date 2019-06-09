<template>
  <div>
    <table>
      <thead>
        <th v-for="(header, index) in list.fields" :key="index">{{header.value}}</th>
      </thead>
      <tbody>
        <highscorelist-item
          v-for="(item, idxLine) in list.list"
          v-bind:listId="list.id"
          v-bind:fields="list.fields"
          v-bind:item="item"
          v-bind:idxLine="idxLine"
          :key="idxLine"
        ></highscorelist-item>
      </tbody>
    </table>
  </div>
</template>

<script>
import TimeService from "../services/time.service";

import HighscorelistItem from "./highscorelist-item.component";

export default {
  name: "highscorelist-table",

  components: {
    "highscorelist-item": HighscorelistItem
  },

  data() {
    return {};
  },

  props: {
    list: {
      type: Object,
      default() {
        return {};
      }
    }
  },

  // Larissa Rosenthal
  // Ladyna Wittscher

  methods: {
    formatTime: function(time) {
      return TimeService.secondsToString(time);
    }
  }
};
</script>

<style>
</style>
