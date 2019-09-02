<template>
  <div id="app" class="container">
    <div class="row">
      <div class="col-12">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="collapse navbar-collapse">
            <ul id="nav" class="navbar-nav">
              <li class="nav-item">
                <router-link class="nav-link" to="/">{{ $t('nav.home') }}</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/highscorelist">{{ $t('nav.highscorelist') }}</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/about">{{ $t('nav.about') }}</router-link>
              </li>
              <li class="nav-item dropdown" :class="{'show': show}" @click="toggleDropdown()">
                <a
                  class="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >{{$t('language')}} ({{$t($i18n.locale)}})</a>
                <language-switcher v-bind:language="language" v-bind:show="show"></language-switcher>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
    <div class="row my-5">
      <div class="col-12">
        <router-view />
      </div>
    </div>
  </div>
  <!-- end: #id -->
</template>

<script>
import LanguageSwitcher from "./components/app-languageswitch.component";

export default {
  name: "app",

  components: {
    "language-switcher": LanguageSwitcher
  },

  data: function() {
    return {
      show: false
    };
  },

  computed: {
    language() {
      return this.$store.state.app.lang ? this.$store.state.app.lang : "de";
    }
  },

  created() {
    this.$store.dispatch("app/setupApp", { name: "QPs Highscorelist" });
  },

  methods: {
    toggleDropdown() {
      this.show = !this.show;
    }
  }
};
</script>

<style lang="less">
.nav-item {
  &.dropdown:hover {
    cursor: pointer;
  }
}
</style>
