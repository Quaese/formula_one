<template>
  <div id="app" class="container">
    <div class="row">
      <div class="col-12">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
            @click="toggleNavbar($event)"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" :class="{'show': navbarShow}" ref="navbar">
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
      show: false,
      navbarShow: false
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
    },

    toggleNavbar(evt) {
      // get event emitter
      let node = evt.target;

      // bubble upwards until the navbar toggle button is reached
      while (
        !node.classList.contains("navbar-toggler") &&
        node.nodeName.toUpperCase() !== "body"
      ) {
        node = node.parentNode;
      }

      if (node.classList.contains("navbar-toggler")) {
        node.classList.toggle("collapsed");
        // set data property to add/remove "show" class name from navbar element
        this.navbarShow = node.classList.contains("collapsed");
      }
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
