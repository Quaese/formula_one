<template>
  <fieldset :class="[classes.fieldset, initial || valid ? '' : classes.error]">
    <label v-if="label !== null" :class="css.label">{{ label }}</label>
    <input
      type="text"
      v-model="val"
      v-init-input:model="{ field: fieldName, value: val }"
      :ref="fieldName"
      :class="[
        'form-control',
        classes.input,
        initial || valid ? '' : classes.error,
        { 'dummy-class': !initial && !valid }
      ]"
      :placeholder="placeholder"
      @keyup="$emit('keyup', $event)"
      @blur="$emit('blur', $event)"
    />
    <span
      v-if="!initial && !valid"
      :class="[initial || valid ? '' : classes.error]"
    >{{ error.text }}</span>
  </fieldset>
</template>

<script>
import "../directives/init-input.directive"; //"./directives/init-input.directive";

export default {
  name: "field-validation",

  data() {
    const value =
      this.init && this.init.value ? this.init.value : this.model.value;

    return {
      initial: this.model.initial,
      val: value,
      // valid: this.model.valid,
      valid: this.model.validator ? this.model.validator(value) : true,
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
    init: {
      type: Object,
      default: null
    },
    model: {
      type: Object
    },
    css: {
      type: Object
    },
    placeholder: {
      type: String,
      default: ""
    },
    fieldName: {
      type: String,
      default: ""
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
  },

  watch: {
    val(newVal) {
      this.initial = false;
      this.valid = this.model.validator ? this.model.validator(newVal) : true;

      this.$emit("input", {
        ...this.model,
        value: newVal,
        valid: this.valid,
        required: this.model.required || false
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../assets/style/variables.less");

.qp-form-error {
  fieldset& {
    position: relative;
  }

  input {
    // border: 1px solid @color-danger;
    background: lighten(@color-danger, 40%);
  }

  span& {
    position: absolute;
    left: 0;
    right: 0;
    padding: 2px 5px;
    background: #fff;
    border: 1px solid @color-danger;
    font-size: 0.8em;
    color: @color-danger;
  }
}
</style>
