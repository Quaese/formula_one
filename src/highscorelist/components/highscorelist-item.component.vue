<template>
  <tr
    v-bind:id="`item_${item.id}`"
    class="qp-table-results-item-row"
    :class="{ 'qp-table-results-item-row-last': last }"
  >
    <!--  @click="!edit && setEdit(true)" -->
    <td v-for="(cell, idxCell) in fields" :key="idxCell" class="align-middle">
      <div v-if="edit">
        <span v-if="cell.name === 'place'">{{ idxLine + 1 }}</span>
        <span v-else-if="cell.name === 'name'">
          <input
            ref="name"
            class="form-control"
            v-model="itemData.name"
            v-init-input:itemData="{ field: 'name', value: item[cell.name] }"
            v-bind:placeholder="item[cell.name]"
          />
        </span>
        <span v-else-if="cell.name === 'time'">
          <input
            class="form-control"
            v-model="itemData.time"
            v-init-input:itemData="{
              field: 'time',
              value: formatTime(item[cell.name])
            }"
            v-bind:placeholder="formatTime(item[cell.name])"
            v-bind:class="{ error: hasError }"
            pattern="[0-5]?[0-9]:[0-5]?[0-9]:[0-9][0-9][0-9]"
          />
        </span>
        <span v-else-if="cell.name === 'diff_first'">{{
          formatTime(item[cell.name])
        }}</span>
        <span v-else-if="cell.name === 'diff_prev'">{{
          formatTime(item[cell.name])
        }}</span>
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
        <span v-else>{{ item[cell.name] }}</span>
      </div>

      <div v-else>
        <span v-if="cell.name === 'place'">{{ idxLine + 1 }}</span>
        <span v-else-if="cell.name === 'name'">{{ item[cell.name] }}</span>
        <span v-else-if="cell.name === 'time'">{{
          formatTime(item[cell.name])
        }}</span>
        <span v-else-if="cell.name === 'diff_first'">{{
          formatTime(item[cell.name])
        }}</span>
        <span v-else-if="cell.name === 'diff_prev'">{{
          formatTime(item[cell.name])
        }}</span>
        <span v-else-if="cell.name === 'actions'">
          <action-icon
            @click="setEdit(true)"
            :wrapper="{
              title: $t('common.edit')
            }"
            :actions="{
              class: 'qp-action-icon-edit',
              icon: ['fas', 'pencil-alt']
            }"
          />

          <action-icon
            @click="remove(item.id)"
            :wrapper="{
              title: $t('common.delete')
            }"
            :actions="{
              class: 'qp-action-icon-remove',
              icon: ['far', 'trash-alt']
            }"
          />
        </span>
        <span v-else>{{ item[cell.name] }}</span>
      </div>
    </td>
  </tr>
</template>

<script>
// InitInput from "../../directives/init-input.directive" is globally registered in main.js
// import ActionIconLayered from "./actionicon-layered.component" is globally registered in main.js

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
    raceId: {
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
    },
    last: {
      type: Boolean,
      default: false
    }
  },

  updated() {
    if (this.hasError) {
      this.edit = true;
    }
    // if (this.edit) this.$refs["name"][0].focus();
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
        this.$nextTick(() => {
          this.$refs["name"][0].focus();
        });
      }
    },

    save: function() {
      const pattern = /^[0-5]?[0-9]:[0-5]?[0-9]:[0-9][0-9][0-9]$/;

      if (this.itemData.time && pattern.test(this.itemData.time)) {
        this.hasError = false;

        this.$store.dispatch("highscorelist/modifyItem", {
          raceId: this.raceId,
          item: {
            id: this.item.id,
            ...this.itemData
          }
        });
      } else {
        this.hasError = true;
      }
    },

    remove: async function(id) {
      try {
        // get result
        const result = await this.$store.getters["highscorelist/getResultById"](
          id
        );

        // show dialog
        await this.$dialog.confirm(
          {
            title: this.$t("dialog.confirmDeleteHeader"),
            body: this.$t("dialog.confirmDeleteResultText", {
              name: result.name
            })
          },
          {
            cancelText: this.$t("dialog.cancelText"),
            okText: this.$t("dialog.deleteText")
          }
        );

        // delete result
        this.$store.dispatch("highscorelist/removeItem", {
          raceId: this.raceId,
          resultId: id
        });
      } catch (error) {
        console.log("nicht löschen ...");
      }
    }
  }
};
</script>

<style lang="less">
.error {
  border: 1px solid red;
}
</style>
