import Vue from "vue";
import { debounce } from "../_tools/common.tools";

let observer;

export const QPResizeObserver = {
  // eslint-disable-next-line
  bind: function(el, binding, vnode) {
    const handler =
      binding.value && binding.value.handler
        ? binding.value.handler
        : undefined;
    const delay =
      binding.value && binding.value.delay ? binding.value.delay : 200;

    // observe only if a handler is present
    if (handler) {
      // if ResizeObserver API is supported
      if (ResizeObserver) {
        // register observer
        observer = new ResizeObserver(entries => {
          for (let entry of entries) {
            // entry.target is equal to el (observed element)
            if (entry.target === el) {
              handler(el);
            }
          }
        });

        // observe element
        observer.observe(el);
      } else {
        // create unique namespace or use handed over name
        observer =
          binding.value && binding.value.namespace
            ? binding.value.namespace
            : "id_" + new Date().getTime();

        // register native resize event on window object (namespaced)
        window.on(
          "resize." + observer,
          debounce(
            () => {
              handler(el);
            },
            delay,
            false
          )
        );
      }
    }
  },

  unbind: function(el) {
    // unobserve events on unbind event of driective

    if (observer) {
      if (ResizeObserver) {
        observer.unobserve(el);
      } else {
        window.off("resize." + observer);
      }
    }
  }
};

Vue.directive("resize-observer", QPResizeObserver);
