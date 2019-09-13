<template>
  <div
    class="dropdown-menu"
    :class="{ show: show }"
    aria-labelledby="navbarDropdown"
  >
    <a
      class="dropdown-item"
      href="#"
      v-for="lang in languages"
      :key="lang"
      @click="changeLang(lang, $event)"
      v-bind:class="{ 'qp-languageswitcher-active': lang === mLanguage }"
    >
      {{ lang }}
    </a>
  </div>
</template>

<script>
import dict from "@/dictionary/index.js";

export default {
  name: "language-switcher",

  props: {
    language: {
      type: String,
      default: "de"
    },

    show: {
      type: Boolean,
      default: false
    }
  },

  data: function() {
    return {
      languages: Object.keys(dict),
      mLanguage: this.language
    };
  },

  methods: {
    changeLang(lang, event) {
      event && event.preventDefault();

      this.$i18n.locale = lang;
      this.mLanguage = lang;
    }
  }
};
</script>

<style lang="less" scoped>
.qp-languageswitcher-active {
  font-weight: bold;
}
</style>
