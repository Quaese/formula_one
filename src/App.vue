<template>
  <div
    id="app"
    :class="{ 'container-fluid': containerFluid, container: !containerFluid }"
    v-resize-observer="observe"
  >
    <github-corner />
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
          <div
            class="collapse navbar-collapse"
            :class="{ show: navbarShow }"
            ref="navbar"
          >
            <ul id="nav" class="navbar-nav">
              <li class="nav-item">
                <router-link class="nav-link" to="/">
                  {{ $t("nav.home") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/highscorelist">
                  {{ $t("nav.highscorelist") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/admin">
                  {{ $t("nav.admin") }}
                </router-link>
              </li>
              <li
                class="nav-item dropdown"
                :class="{ show: show }"
                @click="toggleDropdown()"
              >
                <a
                  class="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {{ $t("language") }} ({{ $t($i18n.locale) }})
                </a>
                <language-switcher
                  v-bind:language="language"
                  v-bind:show="show"
                ></language-switcher>
              </li>
            </ul>
          </div>
          <div class="navbar-brand navbar-brand-width">
            <logo @click.native="navigate('/')" v-bind:handler="false"></logo>
          </div>
        </nav>
      </div>
    </div>
    <div
      class="row my-5"
      :class="{ 'qp-home-wrapper-row': $route.name === 'home' }"
    >
      <div class="col-12">
        <router-view />
      </div>
    </div>
  </div>
  <!-- end: #id -->
</template>

<script>
import LanguageSwitcher from "./components/app-languageswitch.component";
import AppLogo from "./components/app-logo.component";
import GithubCorner from "./components/github-corner.component";
import "./directives/resize-observer.directive";

const maxWidth = 1050;

export default {
  name: "app",

  components: {
    logo: AppLogo,
    "github-corner": GithubCorner,
    "language-switcher": LanguageSwitcher
  },

  data: function() {
    var _this = this;

    return {
      show: false,
      navbarShow: false,
      containerFluid: this.matchMedia(maxWidth),

      // observe object for the ResizeObserver
      observe: {
        handler: function() {
          _this.setContainerFluid();
        },
        delay: 200,
        // observe HTML node (window object cannot be observed in Safari)
        // observing the HTML node seems to be more performant
        elem: document.querySelector("html")
      }
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
    navigate(target) {
      // navigate to start page
      this.$router.push(target);
    },

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
    },

    setContainerFluid: function() {
      this.containerFluid = this.matchMedia(maxWidth);
    },

    matchMedia(width) {
      return window.matchMedia(`(max-width: ${width}px)`).matches;
    }
  }
};
</script>

<style lang="less" scoped>
.nav-item {
  &.dropdown:hover {
    cursor: pointer;
  }
}

.navbar-brand-width {
  width: 150px;
  cursor: pointer;
}
</style>
