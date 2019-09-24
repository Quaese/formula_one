<template>
  <tr>
    <td v-for="(cell, idxCell) in fields" :key="idxCell" class="align-middle">
      <div v-if="edit">
        <span v-if="cell.name === 'name'">
          <input
            ref="name"
            class="form-control"
            v-model="itemData.name"
            placeholder="Name"
          />
        </span>
        <span v-else-if="cell.name === 'time'">
          <input
            class="form-control"
            placeholder="mm:ss:ddd"
            pattern="[0-5]?[0-9]:[0-5]?[0-9]:[0-9][0-9][0-9]"
            v-model="itemData.time"
            v-bind:class="{ error: hasError }"
          />
        </span>
        <span v-else-if="cell.name === 'actions'">
          <action-icon
            @click="
              setEdit(false);
              save();
            "
            :wrapper="{
              title: $t('common.save')
            }"
            :actions="{
              class: 'qp-action-icon-ok',
              icon: ['fas', 'check']
            }"
          />

          <action-icon
            @click="setEdit(false)"
            :wrapper="{
              title: $t('common.cancel')
            }"
            :actions="{
              class: 'qp-action-icon-cancel',
              icon: ['fas', 'times']
            }"
          />
        </span>
        <span v-else></span>
      </div>

      <div v-else>
        <span v-if="cell.name === 'actions'">
          <action-icon
            @click="setEdit(true)"
            :wrapper="{
              title: $t('common.add')
            }"
            :actions="{
              class: 'qp-action-icon-primary',
              icon: ['fas', 'plus']
            }"
          />
        </span>
        <span v-else></span>
      </div>
    </td>
  </tr>
</template>

<script>
// InitInput from "../../directives/init-input.directive" is globally registered in main.js
// import ActionIconLayered from "./actionicon-layered.component" is globally registered in main.js

import TimeService from "../services/time.service";

export default {
  name: "highscorelist-item-add",

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
    raceId: {
      type: String,
      default: "1"
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
      // disable error first before leaving edit mode
      if (!enable) {
        this.hasError = false;
      }
      // leave edit mode
      this.edit = enable;

      if (enable) {
        this.itemData.name = "";
        this.itemData.time = "";
        this.$nextTick(() => {
          this.$refs["name"][0].focus();
        });
      }
    },

    save: function() {
      const pattern = /^[0-5]?[0-9]:[0-5]?[0-9]:[0-9][0-9][0-9]$/;

      if (this.itemData.time.length === 0 && this.itemData.name.length === 0) {
        return;
      }

      if (this.itemData.time.length > 0 && pattern.test(this.itemData.time)) {
        this.hasError = false;
        this.$store.dispatch("highscorelist/addItem", {
          raceId: this.raceId,
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
