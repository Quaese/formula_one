<template>
  <tr v-bind:id="`item_${result.id}`">
    <td v-for="(cell, idxCell) in fields" :key="idxCell">
      <div v-if="edit">
        <span v-if="cell.name === 'place'">{{idxLine + 1}}</span>
        <span v-else-if="cell.name === 'name'">
          <input
            v-model="resultData.name"
            v-init-input:resultData="{field: 'name', value: result[cell.name]}"
            v-bind:placeholder="result[cell.name]"
          />
        </span>
        <span v-else-if="cell.name === 'time'">
          <input
            v-model="resultData.time"
            v-init-input:resultData="{field: 'time', value: formatTime(result[cell.name])}"
            v-bind:placeholder="formatTime(result[cell.name])"
            v-bind:class="{error: hasError}"
            pattern="[0-5]?[0-9]:[0-5]?[0-9]:[0-9][0-9][0-9]"
          />
        </span>
        <span v-else-if="cell.name === 'diff_first'">{{ formatTime(result[cell.name]) }}</span>
        <span v-else-if="cell.name === 'diff_prev'">{{ formatTime(result[cell.name]) }}</span>
        <span v-else-if="cell.name === 'actions'">
          <button @click="setEdit(false); save();" class="w-100 btn btn-primary">done</button>
        </span>
        <span v-else>{{ result[cell.name] }}</span>
      </div>

      <div v-else>
        <span v-if="cell.name === 'place'">{{idxLine + 1}}</span>
        <span v-else-if="cell.name === 'name'">{{ result[cell.name] }}</span>
        <span v-else-if="cell.name === 'time'">{{ formatTime(result[cell.name]) }}</span>
        <span v-else-if="cell.name === 'diff_first'">{{ formatTime(result[cell.name]) }}</span>
        <span v-else-if="cell.name === 'diff_prev'">{{ formatTime(result[cell.name]) }}</span>
        <span v-else-if="cell.name === 'actions'">
          <button @click="setEdit(true)" class="w-100 btn btn-success">edit</button>
        </span>
        <span v-else>{{ result[cell.name] }}</span>
      </div>
    </td>
  </tr>
</template>

<script>
// InitInput from "../../directives/init-input.directive" is globally registered in main.js

import TimeService from "../services/time.service";

export default {
  name: "highscorelist-item",

  data() {
    return {
      edit: false,
      hasError: false,
      resultData: {
        name: "",
        time: ""
      }
    };
  },

  props: {
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
    },
    seasonId: {
      type: String,
      default: "1"
    },
    raceId: {
      type: Number,
      default: 1
    },
    result: {
      type: Object,
      default() {
        return {
          id: 1,
          name: "Quaese",
          time: 310123,
          time_string: "05:10:123"
        };
      }
    },
    idxLine: {
      type: Number,
      default: 0
    }
  },

  // computed: {
  //   current() {
  //     return this.$store.getters["highscorelist/getCurrent"]();
  //   }
  // },

  updated() {
    if (this.hasError) {
      this.edit = true;
    }
  },

  methods: {
    formatTime: function(time) {
      return TimeService.secondsToString(time);
    },

    setEdit: function(enable) {
      this.edit = enable;
    },

    save: function() {
      const pattern = /^[0-5]?[0-9]:[0-5]?[0-9]:[0-9][0-9][0-9]$/;

      if ((this.resultData.time, pattern.test(this.resultData.time))) {
        this.hasError = false;
        console.log("save: ", {
          raceId: this.raceId,
          seasonId: this.seasonId,
          result: {
            id: this.result.id,
            ...this.resultData
          }
        });
        // return;

        this.$store.dispatch("highscorelist/updateResult", {
          raceId: this.raceId,
          seasonId: this.seasonId,
          result: {
            id: this.result.id,
            ...this.resultData
          }
        });
      } else {
        this.hasError = true;
      }
    }
  }
};
</script>

<style>
.error {
  border: 1px solid red;
}
</style>
