<template>
  <div>
    <table>
      <thead>
        <th v-for="(header, index) in list.fields" :key="index">{{header.value}}</th>
      </thead>
      <tbody>
        <tr v-for="(line, idxLine) in list.list" :key="idxLine">
          <td v-for="(cell, idxCell) in list.fields" :key="idxCell">
            <span v-if="cell.name === 'place'">{{idxLine + 1}}</span>
            <span v-else-if="cell.name === 'time'">{{ formatTime(line[cell.name]) }}</span>
            <span v-else-if="cell.name === 'diff_first'">{{ formatTime(line[cell.name]) }}</span>
            <span v-else-if="cell.name === 'diff_prev'">{{ formatTime(line[cell.name]) }}</span>
            <span v-else>{{ line[cell.name] }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ArrayService from "../../services/array.service";
import TimeService from "../services/time.service";

export default {
  name: "highscorelist-table",

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

  created() {
    this.sortHighscorelist();
  },

  methods: {
    sortHighscorelist: function() {
      let highscoreList = this.list.list.sort(
        ArrayService.sortObjectByProperty("time")
      );

      // add differences
      highscoreList.reduce((accu, curr, index, array) => {
        curr.diff_first = curr.time - array[0].time;
        curr.diff_prev = curr.time - accu;

        return curr.time;
      }, highscoreList[0].time);

      this.list.list = highscoreList;
    },

    formatTime: function(time) {
      return TimeService.secondsToString(time);
    }
  }
};
</script>

<style>
</style>
