<template>
  <div>
    <table>
      <thead>
        <th v-for="(header, index) in list.fields" :key="index">{{header.value}}</th>
      </thead>
      <tbody>
        <highscorelist-item
          v-for="(item, idxLine) in list.list"
          v-bind:fields="list.fields"
          v-bind:item="item"
          v-bind:idxLine="idxLine"
          :key="idxLine"
        ></highscorelist-item>
        <!-- <tr v-for="(line, idxLine) in list.list" :key="idxLine">
          <td v-for="(cell, idxCell) in list.fields" :key="idxCell">
            <span v-if="cell.name === 'place'">{{idxLine + 1}}</span>
            <span v-else-if="cell.name === 'time'">{{ formatTime(line[cell.name]) }}</span>
            <span v-else-if="cell.name === 'diff_first'">{{ formatTime(line[cell.name]) }}</span>
            <span v-else-if="cell.name === 'diff_prev'">{{ formatTime(line[cell.name]) }}</span>
            <span v-else>{{ line[cell.name] }}</span>
          </td>
        </tr>-->
      </tbody>
    </table>
    myList ... {{myList}}
  </div>
</template>

<script>
import ArrayService from "../../services/array.service";
import TimeService from "../services/time.service";

import HighscorelistItem from "./highscorelist-item.component";

export default {
  name: "highscorelist-table",

  components: {
    "highscorelist-item": HighscorelistItem
  },

  data() {
    return {
      // myList: {}
    };
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

  computed: {
    myList() {
      this.sortHighscorelist();
      return this.$store.state.highscorelist.lists[1].list;
    }
  },

  // updated() {
  //   this.sortHighscorelist();
  // },

  methods: {
    sortHighscorelist: function() {
      console.log("update highscorelist-table (sortHighscorelist)");
      let highscoreList = this.list.list.sort(
        ArrayService.sortObjectByProperty("time")
      );

      // add differences
      highscoreList.reduce((accu, curr, index, array) => {
        curr.diff_first = curr.time - array[0].time;
        curr.diff_prev = curr.time - accu;

        return curr.time;
      }, highscoreList[0].time);

      this.list.list = [...highscoreList];
    },

    formatTime: function(time) {
      return TimeService.secondsToString(time);
    }
  }
};
</script>

<style>
</style>
