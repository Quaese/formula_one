<!--
  This component renders an animated logo. For the animation vue's *transition* and
  CSS animation (transition) are used. Background images for the animated parts are SVGs.

  @Uses
  - resize.oberserver directive to handle resizing of the logo

  @Props
  - handler - [Function, Boolean] if a function it will be used as callback for the resize oberver,
                                  otherwise the element is not observed by the ResizeObserver and
                                  the dimension get only calculated on the *mounted* hook
-->

<template>
  <div class="qp-logo-wrapper" ref="wrapper" v-resize-observer="observe">
    <transition name="qp-logo-part-spoiler">
      <div v-if="start" class="qp-logo-part-spoiler"></div>
    </transition>
    <transition name="qp-logo-part-rearwheel">
      <div v-if="start" class="qp-logo-part-rearwheel"></div>
    </transition>
    <transition name="qp-logo-part-monocoque">
      <div v-if="start" class="qp-logo-part-monocoque"></div>
    </transition>
    <transition name="qp-logo-part-sclasse">
      <div v-if="start" class="qp-logo-part-sclasse"></div>
    </transition>
    <transition name="qp-logo-part-front">
      <div v-if="start" class="qp-logo-part-front"></div>
    </transition>
    <transition name="qp-logo-part-bottom">
      <div v-if="start" class="qp-logo-part-bottom"></div>
    </transition>
    <transition name="qp-logo-part-frontwheel">
      <div v-if="start" class="qp-logo-part-frontwheel"></div>
    </transition>
    <transition name="qp-logo-part-formulaonefont">
      <div v-if="start" class="qp-logo-part-formulaonefont"></div>
    </transition>
    <transition name="qp-logo-part-qp">
      <div v-if="start" class="qp-logo-part-qp"></div>
    </transition>
  </div>
</template>

<script>
import "../directives/resize-observer.directive";

export default {
  name: "app-logo",

  data() {
    const self = this;

    return {
      start: false,
      observe: {
        handler:
          typeof self.handler === "function" ? self.handler.bind(self) : false
      }
    };
  },

  props: {
    handler: {
      type: [Function, Boolean],
      // eslint-disable-next-line
      default: function (entry, observedElement) {
        this.calculateHeight(entry.target);
      }
    }
  },

  mounted() {
    // use resize observer if ResizeObserver API exists OR prop to handle resize is not a function (=> element is not observed by the ResizeObserver)
    if (!ResizeObserver || typeof this.handler !== "function") {
      this.calculateHeight(this.$refs.wrapper);
    }

    this.start = true;
  },

  methods: {
    calculateHeight: function(el) {
      el.style.height = parseInt((8 / 29) * el.offsetWidth) + "px";
    }
  }
};
</script>

<style lang="less">
/* *** import own less files *** */
@import "~@/assets/style/anim.less";
</style>
