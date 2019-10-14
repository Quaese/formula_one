<template>
  <tr>
    <td v-for="(cell, idxCell) in fields" :key="idxCell" class="align-middle">
      <div v-if="edit">
        <span v-if="cell.name === 'name'">
          <!-- <input
            ref="name"
            class="form-control"
            v-model="itemData.name.value"
            v-on:keyup="onKeyUp"
            placeholder="Name"
            name="name"
          />-->

          <field-validation
            fieldName="name"
            v-bind:value="itemData.name.value"
            v-on:input="evt => (itemData.name = evt)"
            @keyup="onKeyUp"
            :css="{ input: 'qp-form-control', error: 'qp-form-error' }"
            :focus="true"
            :error="{
              text: $t('error.required.name'),
              validator: val => {
                return val.length > 0;
              }
            }"
            placeholder="Name"
            label_="Label"
          />
        </span>
        <span v-else-if="cell.name === 'time'">
          <!-- <input
            class="form-control"
            placeholder="mm:ss:ddd"
            pattern="[0-5]?[0-9]:[0-5]?[0-9]:[0-9][0-9][0-9]"
            v-model="itemData.time.value"
            v-on:keyup="onKeyUp"
            v-bind:class="{ error: hasError }"
          /> -->
          <field-validation
            fieldName="time"
            v-bind:value="itemData.time.value"
            v-on:input="evt => (itemData.time = evt)"
            @keyup="onKeyUp"
            :css="{ input: 'qp-form-control', error: 'qp-form-error' }"
            :error="{
              text: $t('error.required.time'),
              validator: val => {
                const pattern = /^[0-5]?[0-9]:[0-5]?[0-9]:[0-9][0-9][0-9]$/;
                return val.length > 0 && pattern.test(val);
              }
            }"
            placeholder="mm:ss:ddd"
            label_="Label"
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

  data() {
    return {
      edit: false,
      hasError: false,
      itemData: {
        name: { value: "", valid: true, required: true },
        time: { value: "", valid: true, required: true }
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

  components: {
    "field-validation": FieldValidation
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
        // reset name
        this.itemData.name.value = "";
        this.itemData.name.valid = true;
        // reset time
        this.itemData.time.value = "";
        this.itemData.time.valid = true;
      }
    },

    onKeyUp: function(evt) {
      console.log(evt);
      if (evt.keyCode === 13) {
        this.setEdit(false);
        this.save();
      }
    },

    validate: function(evt) {
      return true;
    },

    save: function() {
      // const isValid = true,
      //   _this = this;

      // Object.keys(this.itemData).reduce((accu, key) => {
      //   const valid = _this.itemData[key].required
      //     ? _this.itemData[key].valid
      //     : true;
      //   return accu && valid;
      // }, isValid);
      // console.log("isValid: ", isValid);
      // return;

      console.log(this.itemData.name.value);
      // debugger;
      const pattern = /^[0-5]?[0-9]:[0-5]?[0-9]:[0-9][0-9][0-9]$/;

      if (this.itemData.name.value.length === 0) {
        this.hasError = true;
        return;
      }

      if (
        this.itemData.time.value.length > 0 &&
        pattern.test(this.itemData.time.value)
      ) {
        this.hasError = false;
        this.$store.dispatch("highscorelist/addItem", {
          raceId: this.raceId,
          item: {
            //...this.itemData
            time: this.itemData.time.value,
            name: this.itemData.name.value
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
