<template>
  <div class="qp-logo-wrapper" ref="wrapper">
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
    return {
      start: false
    };
  },

  mounted() {
    this.calculateHeight();
    this.start = true;
  },

  methods: {
    calculateHeight: function() {
      this.$refs.wrapper.style.height =
        parseInt((8 / 29) * this.$refs.wrapper.offsetWidth) + "px";
    }
  }
};
</script>

<style lang="less">
/* *** import own less files *** */
@import "~@/assets/style/anim.less";
</style>
