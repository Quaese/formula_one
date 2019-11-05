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
          <select-validation
            label_="Label"
            :bus="bus"
            :css="{ input: 'qp-form-control', error: 'qp-form-error' }"
            :error="{
              text: $t('error.select.nothing')
            }"
            :init="{ value: item['driverId'] }"
            :options="availableDriversOptions"
            :model="{ ...model.driver, value: item['driverId'] }"
            @input="evt => onInput(evt, 'driver')"
            @keyup="onKeyUp"
          />
        </span>
        <span v-else-if="cell.name === 'time'">
          <field-validation
            label_="Label"
            :bus="bus"
            :css="{ input: 'qp-form-control', error: 'qp-form-error' }"
            :error="{
              text: $t('error.required.time')
            }"
            :focus="true"
            :init="{ value: formatTime(item[cell.name]) }"
            :model="model.time"
            :placeholder="formatTime(item[cell.name])"
            @input="evt => onInput(evt, 'time')"
            @keyup="onKeyUp"
          />
        </span>
        <span v-else-if="cell.name === 'diff_first'">
          {{ formatTime(item[cell.name]) }}
        </span>
        <span v-else-if="cell.name === 'diff_prev'">
          {{ formatTime(item[cell.name]) }}
        </span>
        <span v-else-if="cell.name === 'actions'">
          <action-icon
            @click="save()"
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
        <span v-else-if="cell.name === 'name'">
          {{ drivers ? drivers[item["driverId"]].name : "n.d." }}
        </span>
        <span v-else-if="cell.name === 'time'">
          {{ formatTime(item[cell.name]) }}
        </span>
        <span v-else-if="cell.name === 'diff_first'">
          {{ formatTime(item[cell.name]) }}
        </span>
        <span v-else-if="cell.name === 'diff_prev'">
          {{ formatTime(item[cell.name]) }}
        </span>
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

import Vue from "vue";
import TimeService from "../services/time.service";
import FieldValidation from "../../components/field-validation.component";
import SelectValidation from "../../components/select-validation.component";

export default {
  name: "highscorelist-item",

  components: {
    "field-validation": FieldValidation,
    "select-validation": SelectValidation
  },

  data() {
    // event bus (using Vue instance to use $emit as event emitter)
    const bus = new Vue();

    return {
      bus: bus,
      edit: false,
      hasError: false,
      model: {
        driver: {
          fieldName: "driver",
          initial: true,
          required: true,
          valid: true,
          value: "",

          validator: val => {
            return Number(val) !== -1;
          }
        },
        time: {
          fieldName: "time",
          initial: true,
          required: true,
          valid: false,
          value: "",

          validator: val => {
            const pattern = /^[0-5]?[0-9]:[0-5]?[0-9]:[0-9][0-9][0-9]$/;
            return val.length > 0 && pattern.test(val);
          }
        }
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
    drivers: {
      type: Object
    },
    availableDrivers: {
      type: Object
    },
    availableDriversOptions: {
      type: Array
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
  },

  methods: {
    formatTime: function(time) {
      return TimeService.secondsToString(time);
    },

    onInput: function(evt, model) {
      this.model[model] = evt;
    },

    onKeyUp: function(evt) {
      switch (evt.keyCode) {
        // enter
        case 13:
          this.save();
          break;
        // escape
        case 27:
          this.setEdit(false);
          break;
      }
    },

    setEdit: function(enable) {
      // disable error first before leaving edit mode
      if (!enable) {
        this.hasError = false;
      }
      // leave edit mode
      this.edit = enable;
    },

    save: function() {
      let isValid = true,
        _this = this;

      // trigger save event on event bus
      this.bus.$emit("save");

      isValid = Object.keys(this.model).reduce((accu, key) => {
        const valid = _this.model[key].required ? _this.model[key].valid : true;
        return accu && valid;
      }, isValid);

      if (isValid) {
        this.hasError = false;

        this.$store.dispatch("highscorelist/modifyItem", {
          raceId: this.raceId,
          item: {
            id: this.item.id,
            time: this.model.time.value,
            driverId: this.model.driver.value,
            name: this.drivers[this.model.driver.value].name
          }
        });
        this.setEdit(false);
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
