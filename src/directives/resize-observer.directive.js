import Vue from "vue";

let observer;

export const QPResizeObserver = {
  // eslint-disable-next-line
  bind: function(el, binding, vnode) {
    const handler =
      binding.value && binding.value.handler
        ? binding.value.handler
        : undefined;

    // if ResizeObserver API is supported
    if (ResizeObserver && handler) {
      // register observer
      observer = new ResizeObserver(entries => {
        for (let entry of entries) {
          if (entry.target === el) {
            // entry.target is equal to el (observed element)
            handler(entry, el);
          }
        }
      });

      // observe element
      observer.observe(el);
    }
  },

  unbind: function(el) {
    observer && observer.unobserve(el);
  }
};

Vue.directive("resize-observer", QPResizeObserver);
