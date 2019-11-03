<template>
  <fieldset :class="[classes.fieldset, initial || valid ? '' : classes.error]">
    <label v-if="label !== null" :class="css.label">{{ label }}</label>
    <select
      :ref="fieldName"
      :class="[
        'form-control',
        classes.input,
        initial || valid ? '' : classes.error,
        { 'dummy-class': !initial && !valid }
      ]"
      :disabled="disabled"
      @keyup="$event => hKeyUp($event)"
      @change="
        $event => {
          hChange($event);
        }
      "
    >
      <option
        v-for="(option, index) in options"
        :value="option.id"
        :selected="model.value && model.value === option.id"
        :key="index"
      >
        {{ option.name }}
      </option>
    </select>
    <span
      v-if="!initial && !valid"
      :class="[initial || valid ? '' : classes.error]"
    >
      {{ error.text }}
    </span>
  </fieldset>
</template>

<script>
export default {
  name: "select-validation",

  data() {
    const value = this.model.value ? this.model.value : "";

    return {
      // observed properties:
      initial: this.model.initial,
      val: value,
      // validate value on init
      valid: this.model.validator ? this.model.validator(value) : true,
      fieldName: this.model.fieldName
        ? this.model.fieldName
        : new Date().getTime(),
      classes: (function(css) {
        let obj = {
            fieldset: "qp-form-fieldset",
            input: "qp-form-control",
            lable: "qp-form-label",
            error: "qp-form-error"
          },
          _key;

        for (_key in obj) {
          obj[_key] = css[_key] ? css[_key] : obj[_key];
        }

        return obj;
      })(this.css)
    };
  },

  props: {
    // Eventbus
    bus: {
      type: Object,
      default: null
    },
    // model for input (properties: fieldName, initial, required, valid, value, validator)
    model: {
      type: Object
    },
    options: {
      type: Array
    },
    css: {
      type: Object
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: null
    },
    error: {
      type: Object
    },
    focus: {
      type: Boolean,
      default: false
    }
  },

  mounted() {
    this.focus && this.$refs[this.fieldName].focus();

    // register bus if instantiated in parent component
    if (this.bus) {
      this.bus.$on("save", this.onSave);
      this.bus.$on("validate", this.onValidate);
    }

    // emit input event with current values to trigger reactive elements
    this.fnValueWatcher(this.val);
  },

  watch: {
    val(newVal) {
      // set initial flag to false if value changes
      this.initial = false;
      // execute value watchter method to validate and emit changed model
      this.fnValueWatcher(newVal);
    }
  },

  methods: {
    fnValueWatcher: function(value) {
      this.valid = this.model.validator ? this.model.validator(value) : true;

      this.$emit("input", {
        ...this.model,
        value: value,
        valid: this.valid,
        required: this.model.required || false
      });
    },

    hChange: function(evt) {
      this.val = evt.target.value;
    },

    hKeyUp: function(evt) {
      this.onSave();

      this.$emit("keyup", evt);
    },

    hBlur: function(evt) {
      this.$emit("blur", evt);
    },

    onSave: function() {
      // if component is still in initial state
      if (this.initial) {
        this.initial = false;
        this.fnValueWatcher(this.val);
      }
    },

    onValidate: function() {
      // if component is still in initial state
      if (this.initial) {
        this.initial = false;
      }
      // validate and emit 'input' event from parent
      this.fnValueWatcher(this.val);
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../assets/style/form.less");
</style>
