<template>
  <tr>
    <td v-for="(cell, idxCell) in fields" :key="idxCell" class="align-middle">
      <div v-if="edit">
        <span v-if="cell.name === 'name'">
          <field-validation
            fieldName="name"
            label_="Label"
            placeholder="Name"
            :css="{ input: 'qp-form-control', error: 'qp-form-error' }"
            :error="{
              text: $t('error.required.name')
            }"
            :focus="true"
            :init="{}"
            :model="model.name"
            @input="evt => (model.name = evt)"
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
            fieldName="time"
            label_="Label"
            placeholder="mm:ss:ddd"
            :css="{ input: 'qp-form-control', error: 'qp-form-error' }"
            :error="{
              text: $t('error.required.time')
            }"
            :model="model.time"
            @input="evt => (model.time = evt)"
            @keyup="onKeyUp"
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
import FieldValidation from "../../components/field-validation.component";

export default {
  name: "highscorelist-item-add",

  components: {
    "field-validation": FieldValidation
  },

  data() {
    return {
      edit: false,
      hasError: false,
      model: {
        name: {
          value: "",
          valid: false,
          required: true,
          initial: true,
          validator: val => {
            return val.length > 0;
          }
        },
        time: {
          value: "",
          valid: false,
          required: true,
          initial: true,
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

    onKeyUp: function(evt) {
      if (evt.keyCode === 13) {
        this.setEdit(false);
        this.save();
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
      }
    },

    save: function() {
      let isValid = true,
        _this = this;

      isValid = Object.keys(this.model).reduce((accu, key) => {
        const valid = _this.model[key].required ? _this.model[key].valid : true;
        return accu && valid;
      }, isValid);

      if (isValid) {
        this.hasError = false;

        this.$store.dispatch("highscorelist/addItem", {
          raceId: this.raceId,
          item: {
            //...this.model
            time: this.model.time.value,
            name: this.model.name.value
          }
        });
      } else {
        this.model.name.initial = false;
        this.model.time.initial = false;

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
