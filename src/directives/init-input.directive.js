import Vue from "vue";

export const InitInput = {
  bind: function(el, binding, vnode) {
    console.log(
      "init: ",
      binding.arg,
      binding.value,
      vnode.context[binding.arg],
      binding.value.value
    );

    vnode.context[binding.arg][binding.value.field] = binding.value.value;
  }
};

Vue.directive("init-input", InitInput);
