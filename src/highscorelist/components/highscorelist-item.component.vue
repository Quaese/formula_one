<template>
  <tr v-bind:id="`item_${item.id}`">
    <td v-for="(cell, idxCell) in fields" :key="idxCell">
      <div v-if="edit">
        <span v-if="cell.name === 'place'">{{idxLine + 1}}</span>
        <span v-else-if="cell.name === 'name'">
          <input
            v-model="itemData.name"
            v-init-input:itemData="{field: 'name', value: item[cell.name]}"
            v-bind:placeholder="item[cell.name]"
          />
        </span>
        <span v-else-if="cell.name === 'time'">
          <input
            v-model="itemData.time"
            v-init-input:itemData="{field: 'time', value: formatTime(item[cell.name])}"
            v-bind:placeholder="formatTime(item[cell.name])"
            v-bind:class="{error: hasError}"
            pattern="[0-5]?[0-9]:[0-5]?[0-9]:[0-9][0-9][0-9]"
          />
        </span>
        <span v-else-if="cell.name === 'diff_first'">{{ formatTime(item[cell.name]) }}</span>
        <span v-else-if="cell.name === 'diff_prev'">{{ formatTime(item[cell.name]) }}</span>
        <span v-else-if="cell.name === 'actions'">
          <button @click="setEdit(false); save();">done</button>
        </span>
        <span v-else>{{ item[cell.name] }}</span>
      </div>

      <div v-else>
        <span v-if="cell.name === 'place'">{{idxLine + 1}}</span>
        <span v-else-if="cell.name === 'name'">{{ item[cell.name] }}</span>
        <span v-else-if="cell.name === 'time'">{{ formatTime(item[cell.name]) }}</span>
        <span v-else-if="cell.name === 'diff_first'">{{ formatTime(item[cell.name]) }}</span>
        <span v-else-if="cell.name === 'diff_prev'">{{ formatTime(item[cell.name]) }}</span>
        <span v-else-if="cell.name === 'actions'">
          <button @click="setEdit(true)">edit</button>
        </span>
        <span v-else>{{ item[cell.name] }}</span>
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
      itemData: {
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
    listId: {
      type: String,
      // type: Number,
      default: "1"
      // default: 1
    },
    item: {
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

      if ((this.itemData.time, pattern.test(this.itemData.time))) {
        this.hasError = false;
        this.$store.dispatch("highscorelist/modifyItem", {
          listId: this.listId,
          item: {
            id: this.item.id,
            ...this.itemData
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
