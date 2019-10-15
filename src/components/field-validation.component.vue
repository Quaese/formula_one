<template>
  <fieldset :class="[classes.fieldset, valid ? '' : classes.error]">
    <label v-if="label !== null" :class="css.label">{{ label }}</label>
    <input
      type="text"
      v-model="val"
      :name="fieldName"
      :ref="fieldName"
      :class="[
        'form-control',
        classes.input,
        valid ? '' : classes.error,
        { 'dummy-class': !valid }
      ]"
      :placeholder="placeholder"
      @keyup="$emit('keyup', $event)"
      @blur="$emit('blur', $event)"
    />
    <span v-if="!valid" :class="[valid ? '' : classes.error]">
      {{ error.text }}
    </span>
  </fieldset>
</template>

<script>
export default {
  name: "field-validation",

  data() {
    return {
      val: this.value.value,
      valid: true,
      // valid: this.error.validator ? this.error.validator(this.value) : "true",
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
    value: {
      type: Object
    },
    css: {
      type: Object
    },
    placeholder: {
      type: String,
      deafault: ""
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
    this.focus && this.$refs[this.fieldName].focus(); //[this.fieldName][0]);
  },

  watch: {
    val(newVal) {
      this.valid = this.error.validator ? this.error.validator(newVal) : true;
      this.$emit("input", {
        value: newVal,
        valid: this.valid,
        required: this.value.required || false
      });
    }

    // invalid(newVal) {
    //   console.log("validator: ", this.error.validator(newVal));
    //   return this.error.validator(newVal);
    // }
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
