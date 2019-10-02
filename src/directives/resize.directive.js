import Vue from "vue";

let observer;

export const QPResizeObserver = {
  bind: function(el, binding, vnode) {
    const handler =
      binding.value && binding.value.handler
        ? binding.value.handler
        : undefined;

    vnode;

    // if resize observe is supported
    if (ResizeObserver) {
      // register observer
      observer = new ResizeObserver(entries => {
        for (let entry of entries) {
          if (entry.target === el) {
            handler(entry);
          }
        }
      });

      // observe element
      observer.observe(el);
    }

    // vnode.context[binding.arg][binding.value.field] = binding.value.value;
  },

  unbind: function(el) {
    observer && observer.unobserve(el);
  }
};

Vue.directive("resize-observer", QPResizeObserver);
