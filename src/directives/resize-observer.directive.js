import Vue from "vue";
import { debounce, isElement } from "../_tools/common.tools";

import "../_tools/events.namespace";

let observer;

export const QPResizeObserver = {
  // eslint-disable-next-line
  bind: function(el, binding, vnode) {
    // get values from binding
    const handler =
      binding.value && binding.value.handler
        ? binding.value.handler
        : undefined;
    const delay =
      binding.value && binding.value.delay ? binding.value.delay : 10;
    const elem = binding.value && binding.value.elem ? binding.value.elem : el;

    // observe only if a handler is present
    if (handler) {
      // if ResizeObserver API is supported AND observed
      if (ResizeObserver && isElement(elem)) {
        // debounced handler function
        const fnObserverHandler = debounce(
          function() {
            handler(elem);
          },
          delay,
          false
        );

        // register observer
        observer = new ResizeObserver(entries => {
          for (let entry of entries) {
            // entry.target is equal to el (observed element)
            if (entry.target === elem) {
              // handler(elem);
              fnObserverHandler(elem);
            }
          }
        });

        // observe element
        observer.observe(elem);
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
            function() {
              handler(elem);
            },
            delay,
            false
          )
        );
      }
    }
  },

  // eslint-disable-next-line
  unbind: function(el, binding, vnode) {
    // unobserve events on unbind event of driective
    const elem = binding.value && binding.value.elem ? binding.value.elem : el;

    if (observer) {
      if (ResizeObserver && isElement(elem)) {
        observer.unobserve && observer.unobserve(elem);
      } else {
        window.off("resize." + observer);
      }
    }
  }
};

Vue.directive("resize-observer", QPResizeObserver);
