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
export default {
  name: "app-logo",

  data() {
    const self = this;

    return {
      start: false,
      observe: {
        handler: function(entry) {
          self.calculateHeight(entry.target);
        }
      }
    };
  },

  mounted() {
    if (!ResizeObserver) {
      console.log("ResizeObserver undefined!");
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
