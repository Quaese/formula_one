<template>
  <fieldset :class="css.fieldset">
    <label v-if="label !== null" :class="css.label">{{ label }}</label>
    <input
      type="text"
      :class="[
        classes.input,
        valid ? '' : classes.error,
        { 'dummy-class': !valid }
      ]"
      :placeholder="placeholder"
      name="fieldName"
      v-model="val"
      @keyup="$emit('keyup', $event)"
    />
    <span v-if="!valid" :class="[valid ? '' : classes.error]">{{
      error.text
    }}</span>
  </fieldset>
</template>

<script>
export default {
  name: "field-validation",

  data() {
    return {
      val: this.value,
      valid: this.error.validator ? this.error.validator(this.value) : "true",
      classes: (function(css) {
        let obj = {
            fieldset: "form-fieldset",
            input: "form-control",
            lable: "form-label",
            error: "form-error"
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
      type: String
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
    }
  },

  watch: {
    val(newVal) {
      this.valid = this.error.validator(newVal);
      this.$emit("input", newVal);
    }

    // invalid(newVal) {
    //   console.log("validator: ", this.error.validator(newVal));
    //   return this.error.validator(newVal);
    // }
  }
};
</script>

<style lang="less" scoped>
.form-error {
  border: 1px solid red;
}
</style>
