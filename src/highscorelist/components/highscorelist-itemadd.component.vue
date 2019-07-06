<template>
  <tr>
    <td v-for="(cell, idxCell) in fields" :key="idxCell">
      <div v-if="edit">
        <span v-if="cell.name === 'name'">
          <input v-model="itemData.name" placeholder="Name" />
        </span>
        <span v-else-if="cell.name === 'time'">
          <input
            v-model="itemData.time"
            placeholder="mm:ss:ddd"
            v-bind:class="{error: hasError}"
            pattern="[0-5]?[0-9]:[0-5]?[0-9]:[0-9][0-9][0-9]"
          />
        </span>
        <span v-else-if="cell.name === 'actions'">
          <button @click="setEdit(false); save();">done</button>
        </span>
        <span v-else></span>
      </div>

      <div v-else>
        <span v-if="cell.name === 'actions'">
          <button @click="setEdit(true)" class="w-100 btn btn-primary">add</button>
        </span>
        <span v-else></span>
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
      type: Number,
      default: 1
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

      if (this.itemData.time.length === 0 && this.itemData.name.length === 0) {
        return;
      }

      if (this.itemData.time.length > 0 && pattern.test(this.itemData.time)) {
        this.hasError = false;
        this.$store.dispatch("highscorelist/addItem", {
          listId: this.listId,
          item: {
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
