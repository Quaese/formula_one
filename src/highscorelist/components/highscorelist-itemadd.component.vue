<template>
  <tr>
    <td v-for="(cell, idxCell) in fields" :key="idxCell" class="align-middle">
      <div v-if="edit">
        <span v-if="cell.name === 'name'">
          <field-validation
            v-if="addDriver"
            label_="Label"
            :bus="bus"
            :css="{ input: 'qp-form-control', error: 'qp-form-error' }"
            :error="{
              text: $t('error.required.name')
            }"
            :focus="true"
            :init="{}"
            :model="model.name"
            :placeholder="$t('seasons.name')"
            @input="evt => onInput(evt, 'name')"
            @keyup="onKeyUp"
          />
          <select-validation
            v-if="!addDriver"
            label_="Label"
            :bus="bus"
            :css="{ input: 'qp-form-control', error: 'qp-form-error' }"
            :error="{
              text: $t('error.select.nothing')
            }"
            :options="availableDriversOptions"
            :model="{ ...model.driver, value: '-1' }"
            @input="evt => onInput(evt, 'driver')"
            @keyup="onKeyUp"
          />
        </span>
        <span v-else-if="cell.name === 'time'">
          <!-- <input
            class="form-control"
            placeholder="mm:ss:ddd"
            pattern="[0-5]?[0-9]:[0-5]?[0-9]:[0-9][0-9][0-9]"
            v-model="model.time.value"
            v-on:keyup="onKeyUp"
            v-bind:class="{ error: hasError }"
          />-->
          <field-validation
            label_="Label"
            :bus="bus"
            :css="{ input: 'qp-form-control', error: 'qp-form-error' }"
            :error="{
              text: $t('error.required.time')
            }"
            :model="{ ...model.time, value: '' }"
            :placeholder="`mm:ss:ddd`"
            @input="evt => onInput(evt, 'time')"
            @keyup="onKeyUp"
          />
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
        <span v-else-if="cell.name === 'place'">
          <div class="qp-custom-switch custom-control custom-switch">
            <input
              type="checkbox"
              class="custom-control-input"
              id="addNewDriverId"
              v-model="addDriver"
              @change="() => onAddDriver()"
            />
            <label class="custom-control-label" for="addNewDriverId">{{
              $t("common.new")
            }}</label>
          </div>
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
import Vue from "vue";
import TimeService from "../services/time.service";
import FieldValidation from "../../components/field-validation.component";
import SelectValidation from "../../components/select-validation.component";

export default {
  name: "highscorelist-item-add",

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
        name: {
          fieldName: "name",
          required: this.showDriversSelectOnMount,
          initial: true,
          valid: false,
          value: "",

          validator: val => {
            return val.length > 0;
          }
        },
        driver: {
          fieldName: "driver",
          initial: true,
          required: !this.showDriversSelectOnMount,
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
      },
      // toggles true/false autmatically if checked/unchecked
      addDriver: false
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
    drivers: {
      type: Object
    },
    showDriversSelectOnMount: {
      type: Boolean,
      default: false
    },
    availableDriversOptions: {
      type: Array
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

    onAddDriver: function() {
      // if a new driver should be added
      if (this.addDriver) {
        this.model.name.required = true;
        this.model.driver.required = false;
        // if a driver from the select box should be added
      } else {
        this.model.name.required = false;
        this.model.driver.required = true;
      }
    },

    setEdit: function(enable) {
      // disable error first before leaving edit mode
      if (!enable) {
        this.hasError = false;
      }
      // leave edit mode
      this.edit = enable;

      if (enable) {
        // reset name
        this.model.name.value = "";
        this.model.name.valid = false;
        this.model.name.initial = true;
        // reset time
        this.model.time.value = "";
        this.model.time.valid = false;
        this.model.time.initial = true;
        // reset driver
        this.model.time.value = "-1";
        this.model.time.valid = false;
        this.model.time.initial = true;
      }
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

        this.$store.dispatch("highscorelist/addItem", {
          raceId: this.raceId,
          newDriver: this.addDriver,
          item: {
            time: this.model.time.value,
            driverId: this.model.driver.value,
            // just for compatibility for state.json's with name property on result object
            // maybe it can be removed after switching to select box for driver names
            name: this.addDriver
              ? this.model.name.value
              : this.drivers[this.model.driver.value].name
          }
        });
        this.setEdit(false);
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
